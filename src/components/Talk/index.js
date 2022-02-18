import React, { useEffect, useState } from "react";
import "./index.scss";
import { connect } from "react-redux";
import store from "@/redux";
import { ADD_ITEM, CHANGE_INPUT } from "@/redux/actionTypes";

import {
  changeInputAction,
  addItemAction,
  deleteItemAction,
  getTodoList,
} from "@/redux/actionCreators";

function Talk(props) {
  let { inputValue, inputChange, clickBtn, list, deleteItem } = props;
  const [bigBox, setBigBox] = useState(false);

  useEffect(() => {
    const action = getTodoList();
    store.dispatch(action);
  }, []);

  return (
    <div className="leaveMsg">
      <div className={`box ${bigBox ? "littleBox" : "bigBox"}`}>
        <div className="litWrap">
          <img
            src={require("@i/doubleArrow.png")}
            onClick={() => {
              setBigBox(!bigBox);
            }}
          />
          <span>合作留言</span>
        </div>
        <div className="bigWrap">
          <img
            src={require("@i/custormerService.png")}
            onClick={() => {
              setBigBox(!bigBox);
            }}
            className="custormerImg"
          />
          <div>
            <div>热线电话</div>
            <div>400-051-6152</div>
          </div>
          <div>
            <div>
              <span>姓名</span>
              <input placeholder="请输入您的姓名" />
            </div>
            <div>
              <span>电话</span>
              <input placeholder="请输入您的电话" />
            </div>
          </div>
          <div>
            <span>需求</span>
            <textarea placeholder="请输入您的委托需求" maxLength={100}/>
            <button>提交</button>
          </div>
          <img
            src={require("@i/doubleArrow.png")}
            onClick={() => {
              setBigBox(!bigBox);
            }}
          />
        </div>
      </div>
    </div>
  );
}

// export default LeaveMsg;

const stateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list,
  };
};
const dispatchToProps = (dispatch) => {
  return {
    inputChange(e) {
      let action = {
        type: CHANGE_INPUT,
        value: e.target.value,
      };
      dispatch(action);
    },
    clickBtn() {
      let action = { type: ADD_ITEM };
      dispatch(action);
    },
    deleteItem(index) {
      const action = deleteItemAction(index);
      store.dispatch(action);
    },
  };
};

export default connect(stateToProps, dispatchToProps)(Talk);
