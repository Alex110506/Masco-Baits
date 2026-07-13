import React from "react";
import HeroSection from "../components/HeroSection";
import ProductContainer from "../components/ProductContainer";
import { Link, useLoaderData, useRouteLoaderData } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import CanonicalHome from "../components/CanonicalHome";

export default function Home(){

    const {isLoggedIn,setIsLoggedIn}=useAuth()

    React.useEffect(() => {
        window.scrollTo(0, 0); 
    }, []);

    const {products}=useRouteLoaderData("root");

    
    const promProds=products.filter((item)=>item.promotie==1)


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
            
            <div className="welcome-banner">
                <span className="welcome-tag">Premium Bait Solutions</span>
                <h1 className="welcome-title">Secretul Unei Partide de Pescuit Reușite</h1>
                <p className="welcome-subtitle">
                    Producem nadă de calitate superioară, testată riguros în condiții reale pentru a asigura capturi memorabile.
                </p>
            </div>

            <HeroSection></HeroSection>

            <div className="product-list-container">
                <h1 className="list-title">PRODUSELE NOASTRE (BOILIES ȘI ALTELE)</h1>
                <div className="list-items">
                    <Link to={"/boilies"} className="cnt">
                        <i className="bi bi-circle-fill" style={{ marginRight: '8px', color: 'var(--accent-color)' }}></i>
                        Boilies
                    </Link>
                    <Link to={"/boilies_carlig"} className="cnt">
                        <i className="bi bi-record-circle" style={{ marginRight: '8px', color: 'var(--accent-color)' }}></i>
                        Boilies Carlig
                    </Link>
                    <Link to={"/boilies_critic_echilibrat"} className="cnt">
                        <i className="bi bi-arrow-down-up" style={{ marginRight: '8px', color: 'var(--accent-color)' }}></i>
                        Boilies Critic Echilibrat
                    </Link>
                    <Link to={"/pasta_solubila_boilies"} className="cnt">
                        <i className="bi bi-droplet-half" style={{ marginRight: '8px', color: 'var(--accent-color)' }}></i>
                        Pasta Solubila
                    </Link>
                    <Link to={"/popup_&_wafters"} className="cnt">
                        <i className="bi bi-arrow-up-circle-fill" style={{ marginRight: '8px', color: 'var(--accent-color)' }}></i>
                        Pop-up & Wafters
                    </Link >
                    <Link to={"/lichide_nutritive_&_aditivi"} className="cnt">
                        <i className="bi bi-funnel-fill" style={{ marginRight: '8px', color: 'var(--accent-color)' }}></i>
                        Lichide & Aditivi
                    </Link>
                    <Link to={"/pelete_&_grundbait"} className="cnt">
                        <i className="bi bi-grid-3x3-gap-fill" style={{ marginRight: '8px', color: 'var(--accent-color)' }}></i>
                        Pelete & Grundbait
                    </Link>
                </div>
            </div>

            <section className="products-cont">
                <div className="new-prod-cont">
                    <h2>Produse pentru Tine</h2>
                    <div className="new-prod-list">
                        {promElems}
                    </div>
                </div>
            </section>

            {/* Unique features highlights section */}
            <div className="features-highlight-section">
                <h2 className="section-gradient-title">De Ce Să Alegi Masco Baits?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <i className="bi bi-award-fill"></i>
                        </div>
                        <h3>Ingrediente Premium</h3>
                        <p>Folosim doar făinuri, aditivi și arome de cea mai înaltă calitate pentru a stimula hrănirea peștilor.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <i className="bi bi-shield-check"></i>
                        </div>
                        <h3>Testat pe Apă</h3>
                        <p>Rețetele noastre sunt perfecționate în urma a sute de ore de teste pe diverse lacuri din țară.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <i className="bi bi-truck"></i>
                        </div>
                        <h3>Livrare Rapidă</h3>
                        <p>Livrăm rapid produsele preferate direct la ușa ta, ambalate corespunzător pentru prospețime maximă.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <i className="bi bi-chat-heart-fill"></i>
                        </div>
                        <h3>Suport Clienți</h3>
                        <p>Suntem pescari la fel ca tine și îți oferim recomandări personalizate pentru partidele tale.</p>
                    </div>
                </div>
            </div>

            <div className="others-container">
                <Link to={"/albume-foto-video"} className="foto-cont cont">
                    <i className="bi bi-images" style={{ marginRight: '10px' }}></i>
                    Albume Foto & Video
                </Link>
                <Link to={"/recenzii"} className="rev-cont cont">
                    <i className="bi bi-star-fill" style={{ marginRight: '10px', color: '#ffb300' }}></i>
                    Recenzii Clienți
                </Link>
            </div>
            
        </div>
        </>
    )
}