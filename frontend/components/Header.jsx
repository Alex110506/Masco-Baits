import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, NavLink, useRouteLoaderData } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Header(){

    const {isLoggedIn,setIsLoggedIn,admin}=useAuth()

    const {cartProd,products}=useRouteLoaderData("root")

    let cartSum=0
    cartProd.forEach((item)=>cartSum+=item.product.price*item.quantity)    

    return (
        <header>
            <div className="dropdown">
                <button className="dropbtn">
                    <i className="bi bi-list menu-btn" style={{fontSize: "36px"}}></i>
                </button>
                <div className="dropdown-content">
                    <p>Categorii</p>
                        <Link to={"/boilies"} className="cnt-head">Boilies</Link>
                        <Link to={"/boilies_carlig"} className="cnt-head">Boilies Carlig</Link>
                        <Link to={"/boilies_critic_echilibrat"} className="cnt-head">Boilies Critic Echilibrat</Link>
                        <Link to={"/pasta_solubila_boilies"} className="cnt-head">Pasta Solubila Boilies</Link>
                        <Link to={"/popup_&_wafters"} className="cnt-head">Pop-up & Wafters</Link >
                        <Link to={"/lichide_nutritive_&_aditivi"} className="cnt-head">Lichide Nutritive & Aditivi</Link>
                        <Link to={"/pelete_&_grundbait"} className="cnt-head">Pelete & Grundbait </Link>
                    <br/>
                    <p>Despre Noi</p>
                    <Link to={"/albume-foto-video"}>Albume Foto & Video</Link>
                    <Link to={"/recenzii"}>Recenzii Clienți</Link>
                </div>
            </div>
            <NavLink to="/">
                <i className="bi bi-house" style={{fontSize:"36px"}}></i>
            </NavLink>
            <div className="search-bar-cont">
                <input type="text" placeholder="Caută"></input>
                <div className="search-cont">
                    <i className="bi bi-search" style={{fontSize:"18px"}}></i>
                </div>
                
            </div>
            <div className="right">
                <div className="cart-cont">
                    <NavLink to="cart">
                        <i className="bi bi-cart" style={{fontSize: "36px"}}></i>
                    </NavLink>
                    
                    <div className="cart-sum">{cartSum}&nbsp;ron</div>
                </div>
                <div className="acc-cont">
                    {admin ? <NavLink to="admin"><i class="bi bi-shield-lock" style={{fontSize:"36px"}}></i></NavLink> : null}
                    <NavLink to="login">
                        {isLoggedIn ? 
                            <i className="bi bi-person-circle" style={{fontSize:"36px"}}></i> 
                            : <h3>Logare</h3>}
                        
                    </NavLink>
                </div>
            </div>
            
        </header>
    )
}