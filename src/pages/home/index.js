import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "@c/Menu";
import Foot from "@c/Foot";
import Talk from "@c/Talk";
import SwiperCon from "@c/Swiper";
import { connect } from "react-redux";
import store from "@/redux";

import "./index.scss";
import { numdynamic } from "numdynamic";
// import Image from "react-animate-lazy-load-image";
import Image from "react-lazy-load-content";
// import message from "@c/Message";
import { message } from "top-msg";

import {
  changeInputAction,
  addItemAction,
  deleteItemAction,
  getTodoList,
} from "@/redux/actionCreators";
import { list } from "postcss";
import Cooperate from "@c/Cooperate";

function Home(props) {
  const [cityNum, setCityNum] = useState(0);
  const [estateNum, setEstateNum] = useState(0);
  const [agentnum, setAgentNum] = useState(0);
  const [stationNum, setStationNum] = useState(0);
  const [brandNum, setBrandNum] = useState(0);
  const [tabInd, setTabInd] = useState(0);
  const [flag, setFlag] = useState(false);
  const wrapRef = useRef(null);
  const stickyRef = useRef();
  const timer = useRef();
  const tabLeft = { 0: 17, 1: 109, 2: 199 };
  let navigate = useNavigate();
  const { showCooperate } = props;

  useEffect(() => {
    store.getState().imgLoad && isDynimic();
  }, [store.getState().imgLoad]);

  useEffect(() => {
    if (flag) {
      let a = numdynamic({ time: 3500, num: 8 }, function (num) {
        setCityNum(num);
      });
      let b = numdynamic({ time: 3500, num: 3000 }, function (num) {
        setEstateNum(num);
      });
      let c = numdynamic({ time: 3500, num: 3000 }, function (num) {
        setAgentNum(num);
      });
      let d = numdynamic({ time: 3500, num: 3000 }, function (num) {
        setStationNum(num);
      });
      let e = numdynamic({ time: 3500, num: 9000 }, function (num) {
        setBrandNum(num);
      });
      // console.log(a);
      return () => {
        clearInterval(a);
        clearInterval(b);
        clearInterval(c);
        clearInterval(d);
        clearInterval(e);
      };
    }
    // return () => clearInterval(a);
  }, [flag]);

  useEffect(() => {
    window.addEventListener("scroll", isDynimic);
    return () => window.removeEventListener("scroll", isDynimic);
  }, []);

  const isDynimic = () => {
    const { top } = stickyRef.current?.getBoundingClientRect();
    const { innerHeight } = window;
    if (top < innerHeight - 115) {
      setFlag(true);
    }
  };

  useEffect(() => {
    rotation();
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  const rotation = () => {
    let num = tabInd;
    timer.current = setInterval(() => {
      num = num + 1;
      if (num >= 3) {
        num = 0;
        setTabInd(0);
      } else {
        setTabInd(num);
      }
    }, 3500);
  };

  return (
    <div ref={wrapRef} className="home">
      <Menu />
      <SwiperCon />
      <div className="dynNum">
        <div className="dynNumBox" ref={stickyRef}>
          <div>
            <div>{cityNum}</div>
            <div>???????????????</div>
          </div>
          <div>
            <div>{estateNum}</div>
            <div>???????????????</div>
          </div>
          <div>
            <div>{agentnum}</div>
            <div>???????????????</div>
          </div>
          <div>
            <div>{stationNum}</div>
            <div>???????????????</div>
          </div>
          <div>
            <div>{brandNum}</div>
            <div>???????????????</div>
          </div>
        </div>
      </div>
      <div className="choice">
        <div>
          <div>
            <div>
              <div>????????????</div>
              <div></div>
              <div>Cooperation consultation</div>
            </div>
            <div
              onClick={() =>
                store.dispatch({ type: "openCooperate", data: true })
              }
            >
              ????????????
            </div>
          </div>
          <div>
            <Image
              enter="show"
              src={require("@i/cooperate.png")}
              placeholde=""
            />
          </div>
        </div>
        <div>
          <div>
            <div>
              <div>????????????</div>
              <div></div>
              <div>Map location</div>
            </div>
            <div
              onClick={() => {
                // navigate("/map");
                window.open("/map", "_target");
              }}
            >
              ????????????
            </div>
          </div>
          <div>
            <Image enter="show" src={require("@i/selAdr.png")} placeholde="" />
          </div>
        </div>
      </div>
      <div className="coBrands">
        <div className="head">
          <h2>????????????</h2>
        </div>
        <div className="body">
          <div className="imgShadow"></div>
          <div className="imgBoxWrap">
            <div>
              <img src={require("@i/zgtt.png")} />
              <img src={require("@i/hlcxact.png")} />
              <img src={require("@i/elm.png")} />
              <img src={require("@i/snact.png")} />
              <img src={require("@i/mt.png")} />
              <img src={require("@i/zgtt.png")} />
              <img src={require("@i/hlcxact.png")} />
              <img src={require("@i/elm.png")} />
              <img src={require("@i/snact.png")} />
              <img src={require("@i/mt.png")} />
              <img src={require("@i/zgtt.png")} />
              <img src={require("@i/hlcxact.png")} />
              <img src={require("@i/elm.png")} />
              <img src={require("@i/snact.png")} />
              <img src={require("@i/mt.png")} />
            </div>
            <div>
              <img src={require("@i/hlcx.png")} />
              <img src={require("@i/elmact.png")} />
              <img src={require("@i/zgttact.png")} />
              <img src={require("@i/sn.png")} />
              <img src={require("@i/hlcx.png")} />
              <img src={require("@i/elmact.png")} />
              <img src={require("@i/zgttact.png")} />
              <img src={require("@i/sn.png")} />
              <img src={require("@i/hlcx.png")} />
              <img src={require("@i/elmact.png")} />
              <img src={require("@i/zgttact.png")} />
              <img src={require("@i/sn.png")} />
            </div>
            <div>
              <img src={require("@i/zgtt.png")} />
              <img src={require("@i/mtact.png")} />
              <img src={require("@i/hlcx.png")} />
              <img src={require("@i/sn.png")} />
              <img src={require("@i/elm.png")} />
              <img src={require("@i/zgtt.png")} />
              <img src={require("@i/mtact.png")} />
              <img src={require("@i/hlcx.png")} />
              <img src={require("@i/sn.png")} />
              <img src={require("@i/elm.png")} />
              <img src={require("@i/zgtt.png")} />
              <img src={require("@i/mtact.png")} />
              <img src={require("@i/hlcx.png")} />
              <img src={require("@i/sn.png")} />
              <img src={require("@i/elm.png")} />
            </div>
          </div>
        </div>
      </div>
      <div className="scheme">
        <div className="head">
          <h2>????????????</h2>
        </div>
        <div className="body">
          <div>
            <div>
              <div className="imgBox">
                <Image enter="show" src={require("@i/hdgimg.png")} />
              </div>
              {/* <img src={require("@i/hdgimg.png")} /> */}
              <div className="explain">
                <div>
                  <div>?????????</div>
                  <div></div>
                  <div>power exchange cabinet</div>
                </div>
                <img src={require("@i/arrowWhiteRight.png")} />
              </div>
            </div>
            <div>
              <div className="imgBox">
                <Image enter="show" src={require("@i/zxccdzimg.png")} />
              </div>
              {/* <img src={require("@i/zxccdzimg.png")} /> */}
              <div className="explain">
                <div>
                  <div>
                    ???????????????
                    <br />
                    ?????????
                  </div>
                  <div></div>
                  <div>Electric bicycle charging pile</div>
                </div>
                <img src={require("@i/arrowWhiteRight.png")} />
              </div>
            </div>
            <div className="schemeSpecial">
              <div className="imgBox">
                <Image enter="show" src={require("@i/qccdzimg.png")} />
              </div>
              {/* <img src={require("@i/qccdzimg.png")} /> */}
              <div className="explain explainLeft">
                <div>
                  <div>
                    ????????????
                    <br />
                    ?????????
                  </div>
                  <div></div>
                  <div>electric car charger Electric pile</div>
                </div>
                <img src={require("@i/arrowWhiteRight.png")} />
              </div>
            </div>
            <div className="schemeSpecial">
              <div className="imgBox">
                <Image enter="show" src={require("@i/jzxzimg.png")} />
              </div>
              {/* <img src={require("@i/jzxzimg.png")} /> */}
              <div className="explain explainLeft">
                <div>
                  <div>5G????????????</div>
                  <div></div>
                  <div>5G Base station site selection</div>
                </div>
                <img src={require("@i/arrowWhiteRight.png")} />
              </div>
            </div>
            <div>
              <div className="imgBox">
                <Image enter="show" src={require("@i/hdzimg.png")} />
              </div>
              {/* <img src={require("@i/hdzimg.png")} /> */}
              <div className="explain">
                <div>
                  <div>?????????</div>
                  <div></div>
                  <div>swap station</div>
                </div>
                <img src={require("@i/arrowWhiteRight.png")} />
              </div>
            </div>
            <div>
              <div className="imgBox">
                <Image enter="show" src={require("@i/lsbimg.png")} />
              </div>
              {/* <img src={require("@i/lsbimg.png")} /> */}
              <div className="explain">
                <div>
                  <div>?????????</div>
                  <div></div>
                  <div>retail bar</div>
                </div>
                <img src={require("@i/arrowWhiteRight.png")} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="siteRes">
        <div className="head">
          <h2>??????????????????</h2>
          <div>???????????????????????? - ???????????? - ????????????</div>
        </div>
        <div className="body">
          <div className="tabHead">
            <div>
              <div
                className={`${tabInd === 0 ? "tabAct" : ""}`}
                onMouseEnter={() => {
                  setTabInd(0);
                  clearInterval(timer.current);
                }}
                onMouseOut={() => rotation()}
              >
                ?????????
              </div>
              <div
                className={`${tabInd === 1 ? "tabAct" : ""}`}
                onMouseEnter={() => {
                  setTabInd(1);
                  clearInterval(timer.current);
                }}
                onMouseOut={() => rotation()}
              >
                ????????????
              </div>
              <div
                className={`${tabInd === 2 ? "tabAct" : ""}`}
                onMouseEnter={() => {
                  setTabInd(2);
                  clearInterval(timer.current);
                }}
                onMouseOut={() => rotation()}
              >
                ?????????
              </div>
            </div>
            <div style={{ left: tabLeft[tabInd] + "px" }}></div>
          </div>
          <div className="content">
            <div className={`${tabInd === 0 ? "conAct" : "conHide"}`}>
              <div>
                <img src={require("@i/hdgimg.png")} />
                {/* <Image enter="show" src={require("@i/hdgimg.png")} /> */}
                <div>
                  <div>
                    <div>??????????????????</div>
                    <div></div>
                  </div>
                  <div>
                    <div>
                      <label>??????</label>
                      <span>1???</span>
                    </div>
                    <div>
                      <label>??????</label>
                      <span>1???</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img src={require("@i/hdgimg.png")} />
                {/* <Image enter="show" src={require("@i/hdgimg.png")} /> */}
                <div>
                  <div>
                    <div>??????????????????????????????????????????????????????</div>
                    <div></div>
                  </div>
                  <div>
                    <div>
                      <label>??????</label>
                      <span>1???</span>
                    </div>
                    <div>
                      <label>??????</label>
                      <span>1???</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${tabInd === 1 ? "conAct" : "conHide"}`}>
              <div>
                <img src={require("@i/qccdzimg.png")} />
                <div>
                  <div>
                    <div>??????????????????</div>
                    <div></div>
                  </div>
                  <div>
                    <div>
                      <label>??????</label>
                      <span>1???</span>
                    </div>
                    <div>
                      <label>??????</label>
                      <span>1???</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img src={require("@i/hdgimg.png")} />
                <div>
                  <div>
                    <div>??????????????????????????????????????????????????????</div>
                    <div></div>
                  </div>
                  <div>
                    <div>
                      <label>??????</label>
                      <span>1???</span>
                    </div>
                    <div>
                      <label>??????</label>
                      <span>1???</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${tabInd === 2 ? "conAct" : "conHide"}`}>
              <div>
                <img src={require("@i/lsbimg.png")} />
                <div>
                  <div>
                    <div>??????????????????</div>
                    <div></div>
                  </div>
                  <div>
                    <div>
                      <label>??????</label>
                      <span>1???</span>
                    </div>
                    <div>
                      <label>??????</label>
                      <span>1???</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img src={require("@i/qccdzimg.png")} />
                <div>
                  <div>
                    <div>??????????????????????????????????????????????????????</div>
                    <div></div>
                  </div>
                  <div>
                    <div>
                      <label>??????</label>
                      <span>1???</span>
                    </div>
                    <div>
                      <label>??????</label>
                      <span>1???</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="coopCase">
        <div className="head">
          <h2>????????????</h2>
        </div>
        <div className="body"></div>
      </div>
      <div className="serPro">
        <div className="head">
          <h2>???????????????????????????</h2>
          <div>?????????????????? - ?????? - ???????????????</div>
        </div>
        <div className="body"></div>
      </div>
      <Foot />
      {process.env.REACT_APP_PRO && <Talk />}
      <div className="cooperateWrap">{showCooperate && <Cooperate />}</div>
    </div>
  );
}

const stateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list,
    showCooperate: state.showCooperate,
  };
};

export default connect(stateToProps, null)(Home);
