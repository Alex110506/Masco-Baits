import React from "react";

export default function ProductConfContainer(props){
    return(
        <div className="product-conf-cont">
            <img src={`../assets/images/prod-imgs/${props.photo}`} alt={props.name + "image"}></img>
            <div className="prod-dets-cont">
                <div className="prod-name-brand-cont-conf conf-sect-prod">
                    <h2>{props.name}</h2>
                    <h3>Brand: {props.brand}</h3>
                </div>
                <div className="prc-cont-conf conf-sect-prod">
                    <h2>Pret:&nbsp;</h2>
                    <p>{props.price} Lei</p>
                </div>
                <div className="quant-cont-conf conf-sect-prod">
                    <h2>Cantitate:&nbsp;</h2>
                    <p>{props.quantity}</p>
                </div>
                <div className="subtot-cont-conf conf-sect-prod">
                    <h2>Subtotal:&nbsp;</h2>
                    <p>{props.price*props.quantity} Lei</p>
                </div>
            </div>
        </div>
    )
}