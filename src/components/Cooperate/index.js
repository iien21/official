import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import store from "@/redux";
import "./index.scss";

function Cooperate() {
  const [isPro, setPro] = useState(true);
  const submit = (p) => {
    setPro(!isPro);
    if (p === 1) {
      setPro(!isPro);
    } else if (p === 2) {
      close();
    }
  };
  const close = () => {
    store.dispatch({ type: "openCooperate", data: false });
  };
  return (
    <div className="cooperate">
      <div className={`box`}>
        <div className={`progress ${isPro ? "show" : "hide"}`}>
          <div className="bhead">
            <span>合作咨询</span>
            <img src={require("@i/close.png")} onClick={() => close()} />
          </div>
          <div className="name">
            <div>
              <label>姓名</label>
              <input placeholder="请输入您的姓名" maxLength={20} />
            </div>
            <div></div>
          </div>
          <div className="phone">
            <div>
              <label>手机</label>
              <input placeholder="请输入您的手机" maxLength={20} />
            </div>
            <div>请输入正确的联系方式</div>
            {/* <div>请您输入联系方式</div> */}
          </div>
          <div className="require">
            <div>
              <label>需求</label>
              <textarea placeholder="请输入您的委托需求" maxLength={500} />
            </div>
            <div></div>
          </div>
          <button className="upCon" onClick={() => submit(1)}>
            提交
          </button>
        </div>
        <div className={`done ${isPro ? "hide" : "show"}`}>
          <div className="bhead">
            <span>合作咨询</span>
            <img src={require("@i/close.png")} onClick={() => close()} />
          </div>
          <img src={require("@i/done.png")} />
          <p>
            您的需求已经提交成功，客服人员将在30分钟内与您联系，请您留意接听电话
          </p>
          <button className="upFin" onClick={() => submit(2)}>
            好的
          </button>
        </div>
      </div>
    </div>
  );
}

export default connect()(Cooperate);
