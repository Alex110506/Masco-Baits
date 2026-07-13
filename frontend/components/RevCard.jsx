import React from "react";

export default function RevCard(props){
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
            <div className="user-rev-card">
                <h4>{props.username}: <span className="star-rating">{showStars(props.rating)}</span></h4>
                <p>{props.comment!=="" ? props.comment : <span className="no-comment">(Niciun comentariu.)</span>}</p>
            </div>
        </div>
    )
}