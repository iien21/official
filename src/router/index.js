import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
  // useParams,
  // useSearchParams,
  // useNavigate,
  // useLocation,
  // Outlet,
  // useRoutes,
} from "react-router-dom";
import Home from "@p/home";
import Estate from "@p/estate";
import Brand from "@p/brand";
import News from "@p/news";
import About from "@p/about";
import Map from "@p/map";
import Empty from "@p/empty";
// const Estate = React.lazy(() => import("@p/estate"));
// const Brand = React.lazy(() => import("@p/brand"));
// const News = React.lazy(() => import("@p/news"));
// const About = React.lazy(() => import("@p/about"));

// function Detail() {
// const locate = useLocation();
//   const tranParam = useParams();
//   const [searchParam] = useSearchParams();
//   const { id } = tranParam;
//   const type = searchParam.getAll("type")[0];
//   const navigate = useNavigate();
//   const goHome = () => {
//     navigate("/");
//   };
//   const goList = () => {
//     navigate("/list", { state: { id: 321 } });
//   };
//   return (
//     <div>
//       {id}
//       {type}
//       <button onClick={goHome}>goHome</button>
//       <button onClick={goList}>goList</button>
//     </div>
//   );
// }
function AppRouter() {
  return (
    <Router>
      {/* <React.Suspense fallback={<div>Loading...</div>}> */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="estate" element={<Estate />}></Route>
        <Route path="brand" element={<Brand />}></Route>
        <Route path="news" element={<News />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="map" element={<Map />}></Route>
        <Route path="detail" element={<></>}>
          <Route path="/detail/:id" element={<></>}></Route>
        </Route>
        <Route path="*" element={<Empty />}></Route>
      </Routes>
      {/* </React.Suspense> */}
    </Router>
  );
}
export default AppRouter;
