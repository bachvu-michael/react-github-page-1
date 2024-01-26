import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { router } from "./routes/Root";
import ErrorPage from "./pages/ErrorPage";

// const router = createBrowserRouter([
//   {
//     path: "/react-github-page-1",
//     Component: <Root />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "react-github-page-1/dashboard",
//     element: <Dashboard />,
//   },
// ]);



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}  fallbackElement={<ErrorPage />}/>
    </QueryClientProvider>,
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
