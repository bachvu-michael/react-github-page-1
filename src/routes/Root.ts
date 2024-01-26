import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Layout from "../layouts/Layout";
import Dashboard from "../pages/Dashboard";
import Advertisers from "../pages/advertisers/Advertisers";
import AdvertiserDetail from "../pages/advertisers/AdvertiserDetail";
import QR from "../pages/QR/QR";

export const router = createBrowserRouter([
    {
        path: "/react-github-page-1",
        Component: Layout,
        children: [
            {
                index: true,
                // loader: homeLoader,
                Component: Dashboard,
            },
            {
              path: "advertisers",
            //   action: todosAction,
            //   loader: todosLoader,
              Component: Advertisers,
            //   ErrorBoundary: TodosBoundary,
                children: [
                {
                  path: ":id",
                //   loader: todoLoader,
                  Component: AdvertiserDetail,
                },
              ],
            },
            {
              path: "QR",
              Component: QR,
            }
            // {
            //   path: "deferred",
            //   loader: deferredLoader,
            //   Component: DeferredPage,
            // },
        ],
    },
]);