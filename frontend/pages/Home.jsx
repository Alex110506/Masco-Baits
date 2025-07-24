import React from "react";
import HeroSection from "../components/HeroSection";
import ProductContainer from "../components/ProductContainer";
import { Link, useLoaderData, useRouteLoaderData } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

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
        <div className="home-cont">
            <div className="bg-cnt"></div>
            <HeroSection></HeroSection>
            <div className="product-list-container">
                <h1 className="list-title">PRODUSELE NOASTRE (BOILIES ȘI ALTELE)</h1>
                <div className="list-items">
                    <Link to={"/Boilies"} className="cnt">Boilies</Link>
                    <Link to={"/Boilies_Carlig"} className="cnt">Boilies Carlig</Link>
                    <Link to={"/Boilies_Critic_Echilibrat"} className="cnt">Boilies Critic Echilibrat</Link>
                    <Link to={"/Pasta_Solubila_Boilies"} className="cnt">Pasta Solubila Boilies</Link>
                    <Link to={"/Popup_&_Wafters"} className="cnt">Pop-up & Wafters</Link >
                    <Link to={"/Lichide_Nutritive_&_Aditivi"} className="cnt">Lichide Nutritive & Aditivi</Link>
                    <Link to={"/Pelete_&_Grundbait"} className="cnt">Pelete & Grundbait </Link>
                </div>
            </div>
            <div className="others-container">
                <Link to={"/"} className="foto-cont cont">Albume Foto & Video</Link>
                <Link to={"/"} className="rev-cont cont">Recenzii Clienți</Link>
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
    )
}