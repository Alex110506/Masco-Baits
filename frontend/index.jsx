import React from "react";
import ReactDOM from "react-dom/client"

import {useLocation, createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider, json,Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./components/Layout";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import CategoryPage , {loader as categoryLoader} from "./pages/CategoryPage"
import Checkout from "./pages/Checkout";
import Confirmation , {loader as confirmationLoader} from "./pages/Confirmation";
import ProductPage , {loader as productPageLoader} from "./pages/ProductPage";
import { AuthProvider, useAuth } from "./components/AuthContext";
import TermsConds from "./pages/TermsConds";
import AdminPage ,{loader as adminLoader} from "./pages/AdminPage";
import Analytics from "./components/Analytics";
import { HelmetProvider } from "react-helmet-async";
import NotFound , {loader as notFoundLoader} from "./pages/NotFound";
import CanonicalRedirect from "./components/CanonicalRedirect";
import PhotoGallery from "./pages/PhotoAlbum";
import ReviewPage from "./pages/ReviewPage";
import SearchResultPage , {loader as searchLoader} from "./pages/SearchResultPage";

async function productsLoader() {
    let products=[]
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error('Failed to load products');
    products = await res.json();
    localStorage.setItem("products",JSON.stringify(products))
    

    try {
        const res1 = await fetch("/api/cart");
        if (!res1.ok) throw new Error("Failed to load cart");
        const data = await res1.json();
        const cart=data.cartProducts
        console.log(products,"produse")
        const productMap = new Map(products.map(p => [p.id, p]));

        const cartProd = cart.map(cartItem => ({
            product: productMap.get(cartItem.productid),
            quantity: cartItem.quantity
        })).filter(item => item.product);

        console.log(cartProd)
        return { cartProd, products };
    } catch (error) {
        // Assume not logged in or error fetching cart
        const cart=JSON.parse(localStorage.getItem("cartProducts") || "[]")
        console.log(cart)
        let cartProd=[]

        products.forEach((product)=>{
            cart.forEach((cartProduct)=>{
                if(product.id==cartProduct.id)
                    cartProd.push({product:product,quantity:cartProduct.q})
            })
        })

        console.log(cartProd)

        return {cartProd,products}
    }
    
}

const router=createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout></Layout>} loader={productsLoader} id="root">
        <Route index element={<Navigate to="/home" replace/>}></Route>
        <Route path="home" element={<Outlet></Outlet>}>
            <Route index element={<Home></Home>}></Route>
            <Route path=":search" loader={searchLoader} element={<SearchResultPage></SearchResultPage>}></Route>
        </Route>
        <Route path="admin" loader={adminLoader} element={<AdminPage></AdminPage>}></Route>
        <Route path="cart" element={<Outlet/>}>
            <Route index element={<Cart></Cart>}></Route>
            <Route path="checkout" element={<Outlet/>}>
                <Route index element={<Checkout></Checkout>}></Route>
                <Route path="confirmation/:orderId" element={<Confirmation></Confirmation>} loader={confirmationLoader}></Route>
            </Route>
        </Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="boilies" element={<Outlet></Outlet>}>
            <Route index element={<CategoryPage></CategoryPage>} loader={categoryLoader}></Route>
            <Route path=":productId" element={<ProductPage></ProductPage>} loader={productPageLoader}></Route>
        </Route>
        <Route path="boilies_carlig" element={<Outlet></Outlet>}>
            <Route index element={<CategoryPage></CategoryPage>} loader={categoryLoader}></Route>
            <Route path=":productId" element={<ProductPage></ProductPage>} loader={productPageLoader}></Route>
        </Route>
        <Route path="boilies_critic_echilibrat" element={<Outlet></Outlet>}>
            <Route index element={<CategoryPage></CategoryPage>} loader={categoryLoader}></Route>
            <Route path=":productId" element={<ProductPage></ProductPage>} loader={productPageLoader}></Route>
        </Route>
        <Route path="pasta_solubila_boilies" element={<Outlet></Outlet>}>
            <Route index element={<CategoryPage></CategoryPage>} loader={categoryLoader}></Route>
            <Route path=":productId" element={<ProductPage></ProductPage>} loader={productPageLoader}></Route>
        </Route>
        <Route path="popup_&_wafters" element={<Outlet></Outlet>}>
            <Route index element={<CategoryPage></CategoryPage>} loader={categoryLoader}></Route>
            <Route path=":productId" element={<ProductPage></ProductPage>} loader={productPageLoader}></Route>
        </Route>
        <Route path="lichide_nutritive_&_aditivi" element={<Outlet></Outlet>}>
            <Route index element={<CategoryPage></CategoryPage>} loader={categoryLoader}></Route>
            <Route path=":productId" element={<ProductPage></ProductPage>} loader={productPageLoader}></Route>
        </Route>
        <Route path="pelete_&_grundbait" element={<Outlet></Outlet>}>
            <Route index element={<CategoryPage></CategoryPage>} loader={categoryLoader}></Route>
            <Route path=":productId" element={<ProductPage></ProductPage>} loader={productPageLoader}></Route>
        </Route>
        <Route path="termeni&conditii" element={<TermsConds></TermsConds>}></Route>
        <Route path="albume-foto-video" element={<PhotoGallery/>}></Route>
        <Route path="recenzii" element={<ReviewPage></ReviewPage>}></Route>
        <Route path="*" loader={notFoundLoader} errorElement={<NotFound></NotFound>} element={<div></div>} />
    </Route>
))

function App(){
    return(
        <HelmetProvider>
            <AuthProvider>
                <CanonicalRedirect></CanonicalRedirect>
                <RouterProvider router={router}></RouterProvider>
            </AuthProvider>
        </HelmetProvider>
        
    )
}

ReactDOM
    .createRoot(document.getElementById("root"))
    .render(<App></App>)