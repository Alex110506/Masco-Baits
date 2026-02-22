import React from "react";
import { useRouteLoaderData } from "react-router-dom";

export default function RevCard(props){

    const {products}=useRouteLoaderData("root")

    const product=products.find((item)=>item.id==props.productId)

    function showStars(stars){
        let shown=""
        for(let i=1 ; i<=5 ; i++){
            if(i<=stars)
                shown+="★"
            else
                shown+="☆"
        }
        return shown
    }

    return(
        <div key={props.id} className="user-rev-cont">
            <div className="user-rev-card-big">
                {props.productId==0?
                    <h3>Părere Site</h3>:
                    <h3><span style={{fontWeight:"500",}}>Produs:</span> {product.name}</h3>
                }
                <h4>{props.username}: <span style={{color:"gold"}}>{showStars(props.rating)}</span></h4>
                <p>{props.comment!=="" ? props.comment : <span style={{color:"rgba(255, 255, 255, 0.7)"}}>(Niciun comentariu.)</span>}</p>
            </div>
        </div>
    )
}