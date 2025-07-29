import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Analytics from "./Analytics";
import CookieConsent from "react-cookie-consent";

export default function Layout(){

    const data=useLoaderData();

    return(
        <div className="whole-page">
            <Analytics></Analytics>
            <Header></Header>
            <main>
                <CookieConsent
                    location="bottom"
                    buttonText="Accept"
                    cookieName="cookie_consent"
                    style={{ background: "#2B373B" }}
                    buttonStyle={{ background: "rgba(33, 47, 62, 1)", color: "white", fontSize: "13px" }}
                    expires={150}
                ></CookieConsent>
                <React.Suspense fallback={<h1>Loading...</h1>}>
                    <Outlet></Outlet>
                </React.Suspense> 
            </main>
            <Footer></Footer>
        </div>
    )
}