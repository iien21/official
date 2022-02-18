import React from "react";
import "./index.scss";

function Foot() {
  return (
    <div className="foot">
      <div>
        <div>
          <img src={require("@i/logoTxt.png")} />
          <div>
            公用空间运营服务平台
            <br />
            优质选址服务 - 就找爱云选
          </div>
        </div>
        <div>
          <div>
            <img src={require("@i/officialAccount.png")} />
            <div>关注我们</div>
          </div>
          <div>ICP备案号：BHA298372389号</div>
        </div>
        <div>
          <div>
            <label>市场合作</label>
            <span>aiyx-biz@xinrunt.com</span>
          </div>
          <div>
            <label>客服热线</label>
            <span>400-051-6152（09:00-18:00）</span>
          </div>
          <div>
            <label>人才招聘</label>
            <span>hrxz@xinrunt.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Foot;
