import React from "react";
import RevCardBig from "../components/RevCardBig";

export default function ReviewPage(){

    const [currentPage,setCurrentPage]=React.useState(1)
    const [revList,setRevList]=React.useState([])
    const [loading,setLoading]=React.useState(false)
    const totalPages=Math.ceil(revList.length/12)
    const startIndex=(currentPage-1)*12
    const currentRevs=revList.slice(startIndex,startIndex+12)


    React.useEffect(()=>{
        setLoading(true)
        const fetchRevs=async ()=>{
            try{
                const res=await fetch("/api/getrevpage")
                if(res.ok){
                    const data=await res.json()
                    setRevList(data)
                }else{
                    throw new Error("databse error")
                }
                
            }
            catch(err){
                console.error(err)
            }
            finally{
                setLoading(false)
            }
        }
        fetchRevs()
    },[])

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return(
        <div className="rev-page-cont">
            <h1>Recenzii Clienți</h1>
            {loading ? <h2>Se încarcă...</h2> : 
                <div className="rev-cont-list">
                    {currentRevs.map((rev,index)=>{
                        return (<RevCardBig
                            key={rev.id}
                            id={rev.id}
                            username={rev.username}
                            rating={rev.rating}
                            comment={rev.comment}
                            productId={rev.productId}
                        >
                        </RevCardBig>)
                    })}
                </div>
            }
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