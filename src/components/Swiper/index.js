import React from "react";
import { Pagination, Autoplay, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { connect } from "react-redux";
import store from "@/redux";

import "./index.scss";
import "swiper/css";
import "swiper/css/effect-fade";
// import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

function SwiperCon() {
  return (
    <div className="swiperWrap">
      <div className="swiperFixBox">
        <div>为客户发现有价值的空间</div>
      </div>
      <Swiper
        // className="swiper-no-swiping"
        modules={[Pagination, Autoplay, EffectFade]}
        slidesPerView={1}
        // effect="fade"
        navigation
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
        // pagination={{ clickable: true }}
        pagination={{
          bulletClass: "swiper-pagination-bullet pages",
          bulletActiveClass: "swiper-pagination-bullet-active curPages",
          clickable: true,
          // el: ".swiper-pagination",
          // type: "custom",
          //   renderCustom: function (swiper, current, total) {
          //     return current + " of " + total;
          //   },
        }}
        loop={true}
        autoplay={{
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <img
            src={require("@i/banner1.png")}
            onLoad={() => {
              store.dispatch({ type: "ImgLoad", data: true });
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img src={require("@i/banner1.png")} />
        </SwiperSlide>
        {/* <SwiperSlide>
          <img
            src={"http://www.aiyunxuan.com/static/media/banner1.36f3ac9b.png"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={"http://www.aiyunxuan.com/static/media/banner2.3e8a57a5.png"}
          />
        </SwiperSlide> */}
        {/* <SwiperSlide>
          <img
            src={"http://www.aiyunxuan.com/static/media/banner3.c56448eb.png"}
          />
        </SwiperSlide> */}
      </Swiper>
      {/* <div className="swiper-pagination">
        <div></div>
        <div></div>
        <div></div>
      </div> */}
    </div>
  );
}
export default connect()(SwiperCon);
