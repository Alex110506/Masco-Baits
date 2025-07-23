import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProductContainerCateg(props){

    const {isLoggedIn,setIsLoggedIn}=useAuth()

    //sa fac stelele in functie de review

    const rating = Math.floor(2 * props.rating);
    let stars = [];

    for (let i = 0; i < Math.floor(rating / 2); i++) {
    stars.push(<i className="bi bi-star-fill" style={{color:"gold"}} key={i}></i>);
    }

    if (rating % 2 === 1) {
    stars.push(<i className="bi bi-star-half" style={{color:"gold"}} key={stars.length}></i>);
    }

    while (stars.length < 5) {
    stars.push(<i className="bi bi-star" style={{color:"gold"}} key={stars.length}></i>);
    }

    const nrRevs=props.nrRevs

    const handleCart= async (e)=>{
        e.preventDefault();
        if(isLoggedIn){
            console.log("adaugat",props.id)
            const res=await fetch("/api/addCart",{
                method:"POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({productId:Number(props.id),quantity:1})
            })
            const data=await res.json();
            location.reload()
            return data
        }else{
            let cart=JSON.parse(localStorage.getItem("cartProducts") || "[]")
            let ok=0
            cart.forEach((item)=>{
                if(item.id===props.id){
                    item.q=Number(item.q)+Number(1);
                    ok=1;
                }
            })
            if(ok==0){
                cart.push({id:props.id,q:1})
            }
            localStorage.setItem("cartProducts",JSON.stringify(cart))
            location.reload()
        }
        
    }

    return(
        <div className="product-cont">

            <div className="prod-img-cont">
                <img src={`../assets/images/prod-imgs/${props.photo}`}></img>
            </div>
            <div className="prod-name-cont">
                <NavLink className="prod-name-cont-tit" to={`${props.id}`}>{props.name}</NavLink>
            </div>
            <div className="prod-rev-cont">
                {stars}
            </div>
            <form className="price-add-cont" onSubmit={handleCart}>
                <div className="price-cont">
                    <span>{props.price} Lei</span>
                </div>
                <div className="add-btn-cont">
                    <button>
                        <i class="bi bi-cart" style={{fontSize:"min(6vw,36px)"}}></i>
                    </button>
                </div>
            </form>
        </div>
    )
}