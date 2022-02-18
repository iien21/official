import "./index.scss";
import Menu from "@c/Menu";
import Foot from "@c/Foot";

function News() {
  return (
    <div className="news">
      <Menu />
      <div className="body">
        <div className="con">
          <h3>2021</h3>
          <div>
            <div className="box">
              <img src={require("@i/scztc.png")} />
              <p>
                蔬菜直通车难进小区？爱云选专业选址服务，为运营商开启绿色通道
              </p>
              <span>2021-01-15</span>
            </div>
            <div className="box">
              <img src={require("@i/xls.png")} />
              <p>爱云选架起关键桥梁，让新零售实现人货场最优匹配 </p>
              <span>2021-01-08</span>
            </div>
          </div>
        </div>
        <div className="con">
          <h3>2020</h3>
          <div>
            <div className="box">
              <img src={require("@i/zdshg.png")} />
              <p>
                自动售货机行业竞争加剧，运营商如何快速get选址技能，锁定胜局？{" "}
              </p>
              <span>2020-12-31</span>
            </div>
            <div className="box">
              <img src={require("@i/gxhdg.png")} />
              <p>共享换电柜迎来千亿蓝海，爱云选助力运营商乘势而上 </p>
              <span>2020-12-25</span>
            </div>
            <div className="box">
              <img src={require("@i/ayx.png")} />
              <p>新基建加速布局，“爱云选”点燃运营商发展新引擎 </p>
              <span>2020-12-18</span>
            </div>
          </div>
        </div>
      </div>
      <Foot />
    </div>
  );
}
export default News;
