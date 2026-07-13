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
                    <h3><span className="product-label">Produs:</span> {product.name}</h3>
                }
                <h4>{props.username}: <span className="star-rating">{showStars(props.rating)}</span></h4>
                <p>{props.comment!=="" ? props.comment : <span className="no-comment">(Niciun comentariu.)</span>}</p>
            </div>
        </div>
    )
}