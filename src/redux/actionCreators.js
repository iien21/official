import axios from "axios";
import { CHANGE_INPUT, ADD_ITEM, DELET_ITEM, GET_LIST, GET_DIVISION_ESTATE_COUNT, GET_MAP_ESTATE_LIST, GET_MAP_SEARCH_RESULT } from "./actionTypes";
import { get } from "@/axios";

export const changeInputAction = (value) => ({
  type: CHANGE_INPUT,
  value,
});

export const addItemAction = () => ({
  type: ADD_ITEM,
});

export const deleteItemAction = (index) => ({
  type: DELET_ITEM,
  index,
});

export const getListAction = (data) => ({
  type: GET_LIST,
  data,
});

export const getEstateCountAction = (data) => ({
  type: GET_DIVISION_ESTATE_COUNT,
  data
})

export const getEstateMapAction = (data) => ({
  type: GET_MAP_ESTATE_LIST,
  data
})

export const getMapSearchAction = (data) => ({
  type: GET_MAP_SEARCH_RESULT,
  data
})

export const getTodoList = () => {
  return (dispatch) => {
    get(
      "https://mock.mengxuegu.com/mock/61a9c941c140524f189210d8/getList/getList"
    ).then((res) => {
      const data = res.data;
      const action = getListAction(data);
      dispatch(action);
    });
  };
};

export const getDivisionEstateCount = () => {
  return (dispatch) => {
    get(process.env.REACT_APP_URL+"offical/division/estate/count")
      .then((res) => {
        let data = res.data.data;
        const action = getEstateCountAction(data);
        dispatch(action);
      })
  };
}

export const getEstateMap = (lLng,lLat,rLng,rLat,name) => {
  return (dispatch) => {
    let url = process.env.REACT_APP_URL+"offical/estate/map?lb.longitude="+lLng+"&lb.latitude="+lLat+"&rt.longitude="+rLng+"&rt.latitude="+rLat+"&coordName="+name;
    get(url)
      .then((res) => {
        let data = res.data.data;
        const action = getEstateMapAction(data);
        dispatch(action);
      })
  }
}

export const mapSearch = (key) => {
  return (dispatch) => {
    get(process.env.REACT_APP_URL+"offical/estate/search?keyWord="+key)
      .then((res) => {
        let data = res.data.data;
        const action = getMapSearchAction(data);
        dispatch(action);
      })
  }
}
