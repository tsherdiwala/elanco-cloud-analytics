import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  Params,
  RouterProvider,
  useParams,
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ApplicationList from './features/application-list/presentation/pages';
import ApplicationDetail from './features/application-detail/presentation/pages';
import { RouterWrapper } from './core/utils/routeWrapper';



const router = createBrowserRouter([
  {
    path: "/",
    element: <ApplicationList />,
  },
  {
    path: "/application/:name",
    element: <RouterWrapper builder={(params : {name: string}) => < ApplicationDetail props={params} />} />
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

