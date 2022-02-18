import React, { useState, useEffect } from "react";
import "./index.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import logoTxt from "@i/logoTxt.png";
import logoTxt from "@i/logoTxt.svg";
import littleTel from "@i/littleTel.svg";

function Menu() {
  const [scrollY, setScrollY] = useState(0);
  const [isShow, setShow] = useState("");
  const navigate = useNavigate();

  const handleScrollY = () => {
    if (window.scrollY > scrollY && scrollY > 150) {
      setShow("hide");
    }
    if (window.scrollY < scrollY && scrollY > 150) {
      setShow("show");
    }
    setScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScrollY);
    return () => window.removeEventListener("scroll", handleScrollY);
  });

  const { pathname } = useLocation();

  return (
    <div className={`menu ${isShow}`}>
      <div className="menuBox">
        <div className="left">
          <img src={logoTxt} onClick={() => navigate("/")} alt="" />
          <div className="telBox">
            <img src={littleTel} alt="" />
            <span>400-051-6152</span>
          </div>
        </div>
        <div className="right">
          <div className={(pathname === "/" && "menuActive") || ""}>
            <Link to="/">首页</Link>
          </div>
          <div className={(pathname === "/estate" && "menuActive") || ""}>
            <Link to="/estate">物业中心</Link>
          </div>
          <div className={(pathname === "/brand" && "menuActive") || ""}>
            <Link to="/brand">品牌专区</Link>
          </div>
          <div className={(pathname === "/news" && "menuActive") || ""}>
            <Link to="/news">行业资讯</Link>
          </div>
          <div className={(pathname === "/about" && "menuActive") || ""}>
            <Link to="/about">关于我们</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
