import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Analytics from "./Analytics";


export default function Layout(){

    const data=useLoaderData();

    return(
        <div className="whole-page">
            <Analytics></Analytics>
            <Header></Header>
            <main>
                <React.Suspense fallback={<h1>Loading...</h1>}>
                    <Outlet></Outlet>
                </React.Suspense> 
            </main>
            <Footer></Footer>
        </div>
    )
}