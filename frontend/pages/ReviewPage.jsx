import React from "react";
import { useLoaderData } from "react-router-dom";
import RevCardBig from "../components/RevCardBig";

export function loader(){
    return [{id:33,name:"mena",productId:43,username:"meni",rating:4,comment:"asdasd"}]
}

export default function ReviewPage(){

    const [currentPage,ssetCurrentPage]=React.useState(1)
    const revList=useLoaderData()
    const totalPages=Math.ceil(revList.length/12)
    const startIndex=(currentPage-1)*12
    const currentRevs=revList.slice(startIndex,startIndex+12)

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return(
        <div className="rev-page-cont">
            <h1>Recenzii Clienți</h1>
            <div className="rev-cont-list">
                {currentRevs.map((rev,index)=>{
                    <RevCardBig
                        key={rev.id}
                        id={rev.id}
                        username={rev.username}
                        rating={rev.rating}
                        comment={rev.comment}
                        productId={rev.productId}
                    >
                    </RevCardBig>
                })}
            </div>
            <div className="pagination-controls">
                    <button onClick={handlePrev} disabled={currentPage === 1}>
                        Prev
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={handleNext} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
        </div>
    )
}