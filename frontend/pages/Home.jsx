import React from "react";
import HeroSection from "../components/HeroSection";
import ProductContainer from "../components/ProductContainer";
import { Link, useLoaderData, useRouteLoaderData } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import CanonicalHome from "../components/CanonicalHome";

export default function Home(){

    const {isLoggedIn,setIsLoggedIn}=useAuth()
    console.log(isLoggedIn)

    React.useEffect(() => {
        window.scrollTo(0, 0); 
    }, []);

    const {products}=useRouteLoaderData("root");

    console.log(products)
    
    const promProds=products.filter((item)=>item.promotie==1)

    console.log(promProds)

    const promElems=promProds.map((item)=>{
        return <ProductContainer
            key={item.id} 
            id={item.id.toString()}
            name={item.name} 
            brand={item.brand}
            price={item.price}
            photo={item.photo}
            diameter={item.diameter}
            description={item.description}
            quantity={item.quantity}
            category={item.category}
            rating={item.rating}
            nrRevs={item.nrRevs}
        ></ProductContainer>
    })


    return(
        <>
        <CanonicalHome url="https://www.masco-baits.ro/home"></CanonicalHome>
        <div className="home-cont">
            <div className="bg-cnt"></div>
            <HeroSection></HeroSection>
            <div className="product-list-container">
                <h1 className="list-title">PRODUSELE NOASTRE (BOILIES ȘI ALTELE)</h1>
                <div className="list-items">
                    <Link to={"/boilies"} className="cnt">Boilies</Link>
                    <Link to={"/boilies_carlig"} className="cnt">Boilies Carlig</Link>
                    <Link to={"/boilies_critic_echilibrat"} className="cnt">Boilies Critic Echilibrat</Link>
                    <Link to={"/pasta_solubila_boilies"} className="cnt">Pasta Solubila Boilies</Link>
                    <Link to={"/popup_&_wafters"} className="cnt">Pop-up & Wafters</Link >
                    <Link to={"/lichide_nutritive_&_aditivi"} className="cnt">Lichide Nutritive & Aditivi</Link>
                    <Link to={"/pelete_&_grundbait"} className="cnt">Pelete & Grundbait </Link>
                </div>
            </div>
            <div className="others-container">
                <Link to={"/albume-foto-video"} className="foto-cont cont">Albume Foto & Video</Link>
                <Link to={"/recenzii"} className="rev-cont cont">Recenzii Clienți</Link>
            </div>
            <section className="products-cont">
                <div className="new-prod-cont">
                    <h2>Promotii</h2>
                    <div className="new-prod-list">
                        {promElems}
                    </div>
                </div>
            </section>
            
        </div>
        </>
    )
}