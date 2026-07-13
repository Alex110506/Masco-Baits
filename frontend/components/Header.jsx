import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, NavLink, useNavigate, useRouteLoaderData } from "react-router-dom";
import { useAuth } from "./AuthContext";



export default function Header(){

    const {isLoggedIn,setIsLoggedIn,admin}=useAuth()
    const navigate=useNavigate()
    const [scrolled, setScrolled] = React.useState(false)

    const {cartProd,products}=useRouteLoaderData("root")

    const [search,setSearch]=React.useState("")   

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleKeyDown = (event) =>{
        if (event.key === "Enter") {
            navigate(`/home/${search}`)
        }
    };

    return (
        <header className={scrolled ? 'scrolled' : ''}>
            <div className="dropdown">
                <button className="dropbtn">
                    <i className="bi bi-list menu-btn header-icon"></i>
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
            <NavLink to="/" className="header-nav-link">
                <i className="bi bi-house header-icon"></i>
            </NavLink>
            <div className="search-bar-cont">
                <input type="text" placeholder="Caută produse..." onChange={(e)=>setSearch(e.target.value)} onKeyDown={handleKeyDown}></input>
                <button className="search-cont" onClick={() => { if(search) navigate(`/home/${search}`) }}>
                    <i className="bi bi-search search-icon"></i>
                </button>
                
            </div>
            <div className="right">
                <div className="cart-cont">
                    <NavLink to="cart">
                        <i className="bi bi-cart header-icon"></i>
                    </NavLink>                    
                </div>
                <div className="acc-cont">
                    {admin ? <NavLink to="admin"><i className="bi bi-shield-lock header-icon"></i></NavLink> : null}
                    <NavLink to="login">
                        {isLoggedIn ? 
                            <i className="bi bi-person-circle header-icon"></i> 
                            : <h3>Logare</h3>}
                        
                    </NavLink>
                </div>
            </div>
            
        </header>
    )
}