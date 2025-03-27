import { createBrowserRouter } from "react-router-dom";
import { Home } from "./Home";
// import { Login } from "@/components";
import { StyleProducts } from './style-products/index';
import { Page404 } from "./404";
import { Brand } from "./brand";
import { Staff } from "./staff";
import { Login } from "@/components";
import ProtectedRoute from "./protectedRoute";
import { Patent } from "./Patent";
import { BarcodeNumber } from "./BarcodeNumber";
import { Copyright } from "./Copyright";
import { LeadProvider } from "./lead-provider";
import { Partner } from "./partner";
import { Cusstomer } from "./customer";


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/",
        element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                )
    },
    {
        path: "/trainning",
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        )
    },
    {
        path:"/style-products",
        element: (
            <ProtectedRoute>
                <StyleProducts />
            </ProtectedRoute>
        )
    },
    {
        path: "/brand",
        element: (
            <ProtectedRoute>
                <Brand />
            </ProtectedRoute>
        )
    },
    {
        path: "/patent",
        element: (
            <ProtectedRoute>
                <Patent />
            </ProtectedRoute>
        )
    },
    {
        path: "/barcode",
        element: (
            <ProtectedRoute>
                <BarcodeNumber/>
            </ProtectedRoute>
        )
    },
    {
        path: "/copyright",
        element: (
            <ProtectedRoute>
                <Copyright />
            </ProtectedRoute>
        )
    },
    {
        path: "/staff",
        element: (
            <ProtectedRoute>
                <Staff/>
            </ProtectedRoute>
        )
    },
    {
        path: "/lead-provider",
        element: (
            <ProtectedRoute>
                <LeadProvider/>
            </ProtectedRoute>
        )
    },
    {
        path: "/partner",
        element: (
            <ProtectedRoute>
                <Partner/>
            </ProtectedRoute>
        )
    },
    {
        path: "/customer",
        element: (
            <ProtectedRoute>
                <Cusstomer/>
            </ProtectedRoute>
        )
    },
    {
        path: "/*",
        element: <Page404 />
    }
]);
