import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProductContainerCateg(props){

    const {isLoggedIn,setIsLoggedIn}=useAuth()

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
                <img src={`../assets/images/prod-imgs/${props.photo}`} alt={props.name + "image"}></img>
            </div>
            <div className="prod-name-cont">
                <NavLink className="prod-name-cont-tit" to={`${props.id}`}>{props.name}</NavLink>
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