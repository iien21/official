import "./index.scss";
import React from "react";
import store from "@/redux";
import {connect} from "react-redux";
import { getDivisionEstateCount,getEstateMap,mapSearch } from "../../redux/actionCreators";
import estateSelect from "@i/estate_select.png";
import estateUnselect from "@i/estate_unselect.png";
import blueTri from "@i/blue_down_tri.png";
import redTri from "@i/red_down_tri.png";
import greySearch from "@i/grey_search.png";
import blueSearch from "@i/blue_search.png";
import greyClose from "@i/grey_close.png";
import loadErr from "@i/load_err_icon.png";
import location from "@i/grey_address_icon.png";
import { message } from "top-msg";
import { hdPolygon,cpPolygon,sjsPolygon,ftPolygon,xcPolygon,dcPolygon,cyPolygon,dxPolygon,fsPolygon,tzPolygon,syPolygon,mtgPolygon,pgPolygon,myPolygon,hrPolygon,yqPolygon } from "./polygons";


const BMap = window.BMap;
let estateListRenderFlag = false;
let map = null;
const normalStyle = {
  width: "88px",
  height: "88px",
  background: "linear-gradient(180deg,#81AFFF 0%, #1E70FF 100%)",
  borderRadius: "44px",
  boxShadow: "0 0 16px 1px rgba(30,112,255,.4)",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: 500,
  border: "none",
  padding: 0,
};
const clickStyle = {
  width: "88px",
  height: "88px",
  background: "linear-gradient(180deg, #FFAAA5 0%, #EE574E 100%)",
  borderRadius: "44px",
  boxShadow: "0 0 16px 1px rgba(238,87,78,.4)",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: 500,
  border: "none",
  padding: 0,
};
const normalContent =
  "<div class='estate-map-item-root'><div class='item-div' style='background:#1e70ff'><div class='icon-root'><img class='icon' src='" +
  estateUnselect +
  "'/></div><span class='item-name'>名字</span></div><img class='down-tri' src='" + 
  blueTri + "'/></div>";
const clickContent =
  "<div class='estate-map-item-root'><div class='item-div' style='background:#ee574e'><div class='icon-root'><img class='icon' src='" +
  estateSelect +
  "'/></div><span class='item-name'>名字</span></div><img class='down-tri' src='" +
  redTri + "'/></div>";

const stateToProps = (state) => {
  return {
    mapDivisionCountList: state.mapDivisionCountList,
    mapEstateList: state.mapEstateList,
    mapSearchList: state.mapSearchList
  };
};
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boundaryArr:[],
      clickEstateLabel: null,
      clickEstate: null,
      showEstateModal: false,
      searchList:[],
      searchKey:"",
      inputValue:"",
    }
  }

  componentDidMount() {
    map = new BMap.Map("map-container",{
      enableMapClick: false,
      minZoom:9,
      maxZoom: 19,
    })
    let centerP = new BMap.Point("116.403963", "39.915119");
    map.centerAndZoom(centerP, 12);
    let scaleCtrl = new BMap.ScaleControl({
      anchor:window.BMAP_ANCHOR_BOTTOM_RIGHT,
      offset:{width:32,height:32}
    });
    map.addControl(scaleCtrl);
    map.setCurrentCity("北京");
    map.enableScrollWheelZoom(true);
    map.addEventListener("zoomend", () => {
      let zoom = map.getZoom();
      if (zoom >= 15) {
        estateListRenderFlag = true;
        this.queryInRect();
      } else {
        this.setState({clickEstate:null,clickEstateLabel:null,showEstateModal:false})
        this.addDivisionEstateData(this.props.mapDivisionCountList);
      }
    });
    map.addEventListener("moveend", () => {
      let zoom = map.getZoom();
      if (zoom >= 15) {
        estateListRenderFlag = true;
        this.queryInRect();
      }
    });

    let action = getDivisionEstateCount();
    store.dispatch(action);
  }

  componentDidUpdate() {
    let {mapDivisionCountList,mapEstateList} = this.props;
    if (map) {
      let zoom = map.getZoom();
      if (zoom >= 15) {
        if (estateListRenderFlag) {
          this.addEstateData(mapEstateList);
        }
      } else {
        this.addDivisionEstateData(mapDivisionCountList);
      }
    }
  }
  
  getLaAndLn = (name) => {
    let lat = "";
    let lng = "";
    let res = {};
    if (name === "海淀") {
      lng = "116.304782";
      lat = "39.966128";
    } else if (name === "昌平") {
      lng = "116.23786";
      lat = "40.226799";
    } else if (name === "石景山") {
      lng = "116.229603";
      lat = "39.912008";
    } else if (name === "丰台") {
      lng = "116.293111";
      lat = "39.865036";
    } else if (name === "西城") {
      lng = "116.3724";
      lat = "39.918562";
    } else if (name === "东城") {
      lng = "116.422731";
      lat = "39.934568";
    } else if (name === "朝阳") {
      lng = "116.449767";
      lat = "39.927254";
    } else if (name === "大兴") {
      lng = "116.348097";
      lat = "39.732805";
    } else if (name === "房山") {
      lng = "116.149892";
      lat = "39.755039";
    } else if (name === "通州") {
      lng = "116.735549";
      lat = "39.922355";
    } else if (name === "顺义") {
      lng = "116.667284";
      lat = "40.156062";
    } else if (name === "门头沟") {
      lng = "116.108265";
      lat = "39.946491";
    } else if (name === "平谷") {
      lng = "117.12805";
      lat = "40.147034";
    } else if (name === "密云") {
      lng = "116.849427";
      lat = "40.382955";
    } else if (name === "怀柔") {
      lng = "116.638526";
      lat = "40.322545";
    } else if (name === "延庆") {
      lng = "115.981186";
      lat = "40.462693";
    }
    res.lat = lat;
    res.lng = lng;
    return res;
  }
  addDivisionEstateData = (data) => {
    map.clearOverlays();
    this.revertClickState()
    if (data && data.length > 0) {
      for (let item of data) {
        let name = item.name.replace("区","");
        let coord = this.getLaAndLn(name);
        let num = item.estateCount;
        if (num > 1000) {
          num = "1000+";
        }
        let label = this.getMapLable(coord.lng,coord.lat,name,num);
        map.addOverlay(label);
      }
    }
  }
  getPolygon = (name) => {
    if (name === "海淀") {
      return hdPolygon;
    } else if (name === "昌平") {
      return cpPolygon;
    } else if (name === "石景山") {
      return sjsPolygon;
    } else if (name === "丰台") {
      return ftPolygon;
    } else if (name === "西城") {
      return xcPolygon;
    } else if (name === "东城") {
      return dcPolygon;
    } else if (name === "朝阳") {
      return cyPolygon;
    } else if (name === "大兴") {
      return dxPolygon;
    } else if (name === "房山") {
      return fsPolygon;
    } else if (name === "通州") {
      return tzPolygon;
    } else if (name === "顺义") {
      return syPolygon;
    } else if (name === "门头沟") {
      return mtgPolygon;
    } else if (name === "平谷") {
      return pgPolygon;
    } else if (name === "密云") {
      return myPolygon;
    } else if (name === "怀柔") {
      return hrPolygon;
    } else if (name === "延庆") {
      return yqPolygon;
    }
  }
  getMapLable = (lng,lat,name,num) => {
    let p = new BMap.Point(lng, lat);
    let opts = { position: p };
    let area =
      "<div class='map-label-content-div'>" +
      name +
      "<br/>" +
      num +
      "</div>";
    let ply = this.getPolygon(name);
    let label = new BMap.Label(area, opts);
    label.setStyle(normalStyle);
    label.addEventListener("mouseover", () => {
      map.addOverlay(ply);
      label.setStyle(clickStyle);
    });
    label.addEventListener("mouseout", () => {
      label.setStyle(normalStyle);
      map.removeOverlay(ply);
    })
    label.addEventListener("click", () => {
      let coord = this.getLaAndLn(name);
      let p = new BMap.Point(coord.lng,coord.lat);
      map.setViewport({center:p,zoom:15});
    })
    return label;
  }
  queryInRect = () => {
    let rect = map.getBounds();
    let sw = rect.getSouthWest();
    let ne = rect.getNorthEast();
    let action = getEstateMap(sw.lng, sw.lat, ne.lng, ne.lat, "baidu");
    store.dispatch(action);
  }
  addEstateData = (data) => {
    map.clearOverlays();
    if (data && data.length > 0) {
      for (let item of data) {
        let name = item.name;
        let lng = this.getBaiduCoor(item.coordinate, 1);
        let lat = this.getBaiduCoor(item.coordinate, 2);
        let label = this.getEstateLabel(lng, lat, name, item);
        map.addOverlay(label);
      }
    }
  }
  getBaiduCoor = (coor, type) => {
    if (coor && coor.length > 0) {
      for (let i of coor) {
        if (i.name === "baidu") {
          if (type === 1) {
            return i.longitude;
          } else {
            return i.latitude;
          }
        }
      }
    } else {
      return "";
    }
  };
  getEstateLabel = (lng, lat, name, estate) => {
    let p = new BMap.Point(lng, lat);
    let opts = { position: p };
    let label = new BMap.Label(normalContent.replace("名字", name), opts);
    let {clickEstate} = this.state;
    if (clickEstate && (clickEstate.estateId === estate.estateId)) {
      label.setContent(clickContent.replace("名字", name));
    }
    label.setStyle({ border: "none", borderRadius: "16px", backgroundColor: "transparent" });
    label.addEventListener("click", () => {
      estateListRenderFlag = false;
      this.revertClickState(estate);
      label.setContent(clickContent.replace("名字", name));
      this.setState({
        clickEstateLabel: label,
        clickEstate: estate,
        showEstateModal: true,
      });
    });
    return label;
  };
  revertClickState = (e) => {
    let estate = this.state.clickEstate;
    let eLabel = this.state.clickEstateLabel;
    if (e && eLabel) {
      if (e.estateId !== estate.estateId) {
        eLabel.setContent(normalContent.replace("名字", estate.name));
      }
    }
  };
  getEstateTypeStr = (type) => {
    if (type === 1) {
      return "住宅";
    } else if (type === 2) {
      return "商业";
    } else if (type === 4) {
      return "产业园";
    } else if (type === 5) {
      return "公众(学校/医院/公园)";
    } else {
      return "其他";
    }
  };
  compare = (obj1, obj2) => {
    let val1 = obj1.order;
    let val2 = obj2.order;
    if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    } else {
      return 0;
    }
  };
  renderModalImg = (pics) => {
    let src = "error";
    if (pics && pics.length > 0) {
      pics = pics.sort(this.compare);
      src = pics[0].image;
    }
    return (
      <img
        className="img"
        alt=""
        src={src}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = loadErr;
          e.target.style = "object-fit:none";
        }}
      />
    );
  };
  renderEstateModal = () => {
    let self = this;
    let show = self.state.showEstateModal;
    if (show) {
      let e = self.state.clickEstate;
      let type = self.getEstateTypeStr(e.type);
      return (
        <div className="modal-root">
          <div className="img-root">
            {self.renderModalImg(e.pics)}
            <span className="estate-type">{type}</span>
          </div>
          <span className="estate-name">{e.name}</span>
          <div className="address-root">
            <img className="address-icon" src={location} />
            <span className="address-span">{e.address}</span>
          </div>
          <div className="data-num-div">
            <div className="data-item">
              <span className="item-num">8</span>
              <span className="item-name">楼宇数量</span>
            </div>
            <div className="data-item">
              <span className="item-num">2000</span>
              <span className="item-name">住户数量</span>
            </div>
            <div className="data-item">
              <span className="item-num">400</span>
              <span className="item-name">车位数量</span>
            </div>
            <div className="data-item">
              <span className="item-num">12</span>
              <span className="item-name">电梯数量</span>
            </div>
          </div>
          <div className="btn-div">
            <span className="btn">查看详情</span>
          </div>
        </div>
      )
    }
  }
  searchEstate = (e) => {
    let key = e.target.value;
    if (key) {
      this.setState({searchKey:key,searchList:[],clickEstate:null,clickEstateLabel:null,showEstateModal:false,inputValue:key},(() => {
        let action = mapSearch(key);
        store.dispatch(action);
      }))
    } else {
      this.setState({searchKey:"",searchList:[],inputValue:""});
    }
  }
  renderSearchResult = (list) => {
    let {searchKey} = this.state;
    if (searchKey && list.length > 0) {
      return (
        <div className="search-result-root">
          {this.getResultArr(list,searchKey)}
        </div>
      )
    } else if (searchKey && list.length == 0) {
      return (
        <div className="search-result-root">
          <img src={require("@i/search_no_result.png")} />
          <span>暂无匹配的结果</span>
        </div>
      )
    }
  }
  getResultArr = (arr,key) => {
    let res = [];
    for (let i=0;i<arr.length;i++) {
      let name = this.keySingleRender(arr[i].name,key);
      res.push(
        <div className="item-div" key={i} onClick={() => {this.onItemClick(arr[i])}}>
          <span>{name}</span>
        </div>
      )
    }
    return res;
  }
  onItemClick = (item) => {
    if (item.coordinate) {
      let coor;
      for (let i of item.coordinate) {
        if (i.name === "baidu") {
          coor = i;
        }
      }
      let p = new BMap.Point(coor.longitude, coor.latitude);
      let arr = [];
      arr.push(p);
      map.setViewport(arr);
      this.setState({ searchResult: [], searchKey: "", inputValue: item.name });
    } else {
      message.error("未获取到该地点经纬度");
    }
  };
  keySingleRender(text, key) {
    if (key && text && typeof text === "string" && typeof key === "string") {
      const newTextArr = text.split("").map((t) => {
        return key.toLowerCase().indexOf(t.toLowerCase()) > -1
          ? `<span style="color:#1e70ff">${t}</span>`
          : t;
      });
      const newText = newTextArr.join("");
      return <span dangerouslySetInnerHTML={{ __html: newText }} />;
    } else {
      return text;
    }
  }
  clearSearchKey = () => {
    this.setState({searchKey:"",searchList:[],inputValue:""});
  }

  render() {
    let self = this;
    let {mapSearchList} = self.props;
    let {searchKey,inputValue} = self.state;
    return (
      <div className="map-root">
        <div className="map-container" id="map-container"></div>
        <div className="show-data-root">
          <div className="search-root">
            <img className="logo" src={require("@i/logoTxt.png")} />
            <div className="ver-line"></div>
            <img className="search-icon" src={searchKey?blueSearch:greySearch} />
            <input className="search-input" value={inputValue} placeholder="请输入物业名称进行搜索..." onChange={(e) => {self.searchEstate(e)}} />
            {searchKey?<img className="clear-icon" src={greyClose} onClick={() => {self.clearSearchKey()}} />:null}
          </div>
          {self.renderEstateModal()}
          {self.renderSearchResult(mapSearchList)}
        </div>
        <div className="zoom-root">
          <div className="zoom-item" onClick={() => {map.zoomIn()}}>
            <span>+</span>
          </div>
          <div className="zoom-item" onClick={() => {map.zoomOut()}}>
            <span>-</span>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(stateToProps)(Map);
