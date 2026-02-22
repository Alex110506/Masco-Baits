import React from "react";
import ProductCartContainer from "../components/ProductCartContainer";
import { NavLink, useNavigate,useRouteLoaderData } from "react-router-dom";
import Canonical from "../components/Canonical";

export default function Cart(){
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const {cartProd,products}=useRouteLoaderData("root");
    const [error,setError]=React.useState("")

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
    let costLivrare=0
    let cartQuant=0
    cartProd.forEach((item)=>{
        cartQuant=cartQuant+Number(Number(item.quantity)*Number(item.product.quantity))
    })
    const pachete=Math.ceil(cartQuant / 20000);;
    costLivrare=pachete*25;

    return(
        <>
            <Canonical url="https://www.masco-baits.ro/cart"></Canonical>
            <div className="cart-page-cont">
                <div className="products-side-cont">
                    <div className="prod-side-head">
                        <img src="..\assets\images\logo\maco-baits-logo.png.jpg" alt="company logo"></img>
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
                            <span>{Number(cartSum).toFixed(2)}</span>
                        </div>
                        <div className="livr-cont">
                            <span>Cost Livrare:</span>
                            <span>{Number(costLivrare).toFixed(2)} Lei</span>
                        </div>
                    </div>
                    <h1>Total: {Number(cartSum+costLivrare).toFixed(2)}</h1>
                    {error ? <h2>{error}</h2> : null}
                    <div className="check-btn-cont">
                        
                            {cartProd.length>0 ? 
                                <button>
                                    <NavLink to="checkout">Spre&nbsp;Comandă</NavLink>
                                </button>:
                                <h3 style={{color:"red"}}>Trebuie să aveți cel putin un produs în coș pentru a comanda.</h3>
                            }
                        
                    </div>
                    
                </div>
            </div>
        </>
    )
}