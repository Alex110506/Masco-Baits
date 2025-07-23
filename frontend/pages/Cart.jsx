import React from "react";
import ProductCartContainer from "../components/ProductCartContainer";
import { NavLink, useNavigate,useRouteLoaderData } from "react-router-dom";

export default function Cart(){
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const {cartProd,products}=useRouteLoaderData("root");

    let cartSum=0
    cartProd.forEach((item)=>cartSum+=item.product.price*item.quantity) 

    const cartProdElem=cartProd.map((item)=>{
        return(
            <ProductCartContainer
                key={item.product.id} 
                id={item.product.id.toString()}
                name={item.product.name} 
                brand={item.product.brand}
                price={item.product.price}
                photo={item.product.photo}
                diameter={item.product.diameter}
                quantity={item.quantity}
                category={item.product.category}
                pcs={item.quantity}
            >
            </ProductCartContainer>
        )
    })

    const navigate=useNavigate();

    function toCheckout(){
        navigate("/checkout")
    }

    const costLivrare=25

    return(
        <>
            <div className="cart-page-cont">
                <div className="products-side-cont">
                    <div className="prod-side-head">
                        <img src="..\assets\images\logo\maco-baits-logo.png.jpg"></img>
                        <span>Coșul Meu</span>
                    </div>
                    <div className="prod-side-list">
                        {cartProdElem.length>0 ? cartProdElem : <h1>Coșul este momentan gol! 🎣</h1>}
                    </div>
                </div>
                <div className="checkout-side-cont">
                    <h1>Sumar&nbsp;Comandă:</h1>
                    <div className="detalii">
                        <div className="cost-cont">
                            <span>Cost Produse:</span>
                            <span>{cartSum}</span>
                        </div>
                        <div className="livr-cont">
                            <span>Cost Livrare:</span>
                            <span>{costLivrare} Lei</span>
                        </div>
                    </div>
                    <h1>Total: {cartSum+costLivrare}</h1>
                    <div className="check-btn-cont">
                        <button>
                            <NavLink to="checkout">Spre&nbsp;Comandă</NavLink>
                        </button>
                    </div>
                    
                </div>
            </div>
        </>
    )
}