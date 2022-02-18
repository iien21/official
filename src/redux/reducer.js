import { CHANGE_INPUT, ADD_ITEM, DELET_ITEM, GET_LIST, GET_DIVISION_ESTATE_COUNT, GET_MAP_ESTATE_LIST, GET_MAP_SEARCH_RESULT } from "./actionTypes";

const defaultState = {
  inputValue: "world",
  list: [],
  imgLoad:false,
  showCooperate:false,
  mapDivisionCountList:[],
  mapEstateList:[],
  mapSearchList:[],
};
export default (state = defaultState, action) => {
  //   reducer只能接受state，不能改变state
  if (action.type === CHANGE_INPUT) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    return newState;
  }
  if (action.type === ADD_ITEM) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.list.push(newState.inputValue);
    newState.inputValue = "";
    return newState;
  }
  if (action.type === DELET_ITEM) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index, 1);
    return newState;
  }
  if (action.type === GET_LIST) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.list = action.data.data.list;
    return newState;
  }
  if (action.type === 'ImgLoad') {
    let newState = JSON.parse(JSON.stringify(state));
    newState.imgLoad = action.data;
    return newState;
  }
  if (action.type === 'openCooperate') {
    let newState = JSON.parse(JSON.stringify(state));
    newState.showCooperate = action.data;
    return newState;
  }
  if (action.type === GET_DIVISION_ESTATE_COUNT) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.mapDivisionCountList = action.data;
    return newState;
  }
  if (action.type === GET_MAP_ESTATE_LIST) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.mapEstateList = action.data;
    return newState;
  }
  if (action.type === GET_MAP_SEARCH_RESULT) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.mapSearchList = action.data;
    return newState;
  }

  return state;
};
