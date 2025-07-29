import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Analytics from "./Analytics";
import CookieConsent from "./CookieConsent";

export default function Layout(){

    const data=useLoaderData();
    const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie_consent");
        if (consent === "true") {
        setAnalyticsAllowed(true);
        }
    }, []);

    

    return(
        <div className="whole-page">
            {analyticsAllowed ? <Analytics></Analytics> : null}
            <Header></Header>
            <main>
                <CookieConsent></CookieConsent>
                <React.Suspense fallback={<h1>Loading...</h1>}>
                    <Outlet></Outlet>
                </React.Suspense> 
            </main>
            <Footer></Footer>
        </div>
    )
}