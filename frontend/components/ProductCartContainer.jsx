import React from "react";
import { NavLink, useRouteLoaderData } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProductCartContainer(props){
    const {cartProd}=useRouteLoaderData("root")
    const {isLoggedIn,setIsLoggedIn} = useAuth()
    const [loading,setLoading]=React.useState(false)
    const [action,setAction]=React.useState("")

    const handleDel= async (e)=>{

        e.preventDefault()
        setLoading(true)
        if(isLoggedIn){
            const res=await fetch("/api/delCart",{
                method:"POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({productId:props.id})
            })
            const data=await res.json()
            setLoading(false)
            location.reload();
            return data
        }else{
            let cart=[]
            let ind=-1
            cartProd.forEach((item,index)=>{
                cart.push({id:item.product.id,q:item.quantity})
                if(props.id==item.product.id)
                    ind=index
            })
            if(ind>-1) cart.splice(ind,1);
            localStorage.setItem("cartProducts",JSON.stringify(cart))
            location.reload()
        }
         
    }

    const handleQuant = async (e) => {
        e.preventDefault();

        if (!isLoggedIn){
            let ind=-1
            let cart=[]
            cartProd.forEach((item,index)=>{
                cart.push({id:item.product.id,q:item.quantity})
                if(props.id==item.product.id)
                    ind=index
            })
            if(action==="remove"){
                if(props.pcs===1){
                    if(ind>-1) cart.splice(ind,1);
                }else{
                    cart[ind].q-=1;
                }
            }else{
                cart[ind].q+=1;
            } 
            localStorage.setItem("cartProducts",JSON.stringify(cart))
            location.reload()
        }else{
            setLoading(true)
            try {
                let url = "";
                if (action === "remove") {
                if (props.pcs === 1) {
                    url = "/api/delCart";
                } else {
                    url = "/api/cart/subtract";
                }
                } else {
                url = "/api/cart/add";
                }

                const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ productId: props.id }),
                });

                const data = await res.json();

                if (!res.ok) {
                console.error("Server error:", data.message);
                return;
                }

            } catch (err) {
                console.error("Request failed:", err);
            } finally{
                setLoading(false)
                location.reload()
            }
        }

        
    };

    return(
        <div className="prod-cont-cart">
            <div className="prod-cart-img-cont">
                <img src={`../assets/images/prod-imgs/${props.photo}`} alt={props.name + "image"}></img>
            </div>
            <div className="prod-info-cart">
                <div className="prod-cart-name-cont">
                    <NavLink to={`/${props.category.replace(/ /g, "_").toLowerCase()}/${props.id}`} className="cart-prod-tit">
                        {props.name}
                    </NavLink>
                </div>
                <div className="prod-cart-brand-cont">
                    <span>Brand: {props.brand}</span>
                </div>
                <div className="prod-cart-prc-cont">
                    <span>{Number(props.price).toFixed(2)} Lei</span>
                </div>
                <div className="quant-cont">
                    <form className="buc-cont" onSubmit={handleQuant}>
                        <button onClick={()=>setAction("remove")} disabled={loading}>-</button>
                        <span>{props.pcs}</span>
                        <button onClick={()=>setAction("add")} disabled={loading}>+</button>
                    </form>
                    <form className="del-it-cont" onSubmit={handleDel}>
                        <button>Șterge</button>
                    </form>
                </div>
            </div>
        </div>
    )
}