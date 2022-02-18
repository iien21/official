import React from 'react';

import {
    // BrowserRouter as Router,
    BrowserRouter,
    Routes,
    Route,
    Link,
    useParams,
    useSearchParams,
    useNavigate,
    useLocation,
    Outlet,
    useRoutes,
  } from "react-router-dom";
  import Menu from "@c/Menu";

export default function Router() {

function Home() {
    return "a";
  }
  function List() {
    const locate = useLocation();
    // return <div>{locate?.state?.id || "no"}</div>;
    return 'hhhhhhh'
  }
  function Login() {
    return "login";
  }
  function Detail() {
    const tranParam = useParams();
    const [searchParam] = useSearchParams();
    const { id } = tranParam;
    const type = searchParam.getAll("type")[0];
    const navigate = useNavigate();
    const goHome = () => {
      navigate("/");
    };
    const goList = () => {
      navigate("/list", { state: { id: 321 } });
    };
    return (
      <div>
        {id}
        {type}
        <button onClick={goHome}>goHome</button>
        <button onClick={goList}>goList</button>
      </div>
    );
  }
  function NotFound() {
    return "404";
  }


  return useRoutes([
    {
        path: '/',
        element: <Menu />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: 'list',
            element: <List />,
          },
          {
            path: 'detail/:id',
            element: <Detail />,
          },
        ],
      },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '*',
      element: <NotFound />,
    },


   
  ]);
}
// 集中式路由
// const router: RouteObject[] = [
//   {
//     path: '/',
//     element: <Father />,
//     children: [
//       {
//         index: true,
//         element: <Default />,
//       },
//       {
//         path: 'home',
//         element: <Home />,
//         children: [
//           {
//             path: 'HomeSpan',
//             element: <HomeSpan />,
//           },
//           {
//             path: 'HomeDiv',
//             element: <HomeDiv />,
//           },
//         ],
//       },
//       {
//         path: 'user',
//         element: <User />,
//       },
//       {
//         path: 'uset/detail/:id',
//         element: <Detail />,
//       },
//     ],
//   },
//   {
//     path: '/login',
//     element: <Login />,
//   },
//   {
//     path: '*',
//     element: <NotFound />,
//   },
// ];
