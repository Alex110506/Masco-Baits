import React from "react";
import RevCardBig from "../components/RevCardBig";

export default function ReviewPage(){

    const [currentPage,setCurrentPage]=React.useState(1)
    const [revList,setRevList]=React.useState([])
    const [loading,setLoading]=React.useState(false)
    const [nrStars,setNrStars]=React.useState(0)
    const [comment,setComment]=React.useState("")
    const [revMessage,setRevMessage]=React.useState("")
    const [revErr,setRevErr]=React.useState("")
    const [myRevs,setMyRevs]=React.useState([])
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
                    setRevList(data.slice().reverse())
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

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const res= await fetch("/api/products/postreview",{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({nrStars,comment,id:0})
        })
        const data=await res.json();
        if(res.ok){
            if(data.status===1){
                setMyRevs(prev => [...prev,
                    {
                        id: prev.length + 1,
                        productId:0,
                        username: data.username,
                        rating: nrStars,
                        comment: comment
                    }
                ]);
                setRevMessage(data.message)
                setRevErr("")
            }else{
                setRevErr(data.message)
                setRevMessage("")
            }
        }else{
            setRevMessage("")
            setRevErr(data.message)
        }
    }

    const myRevElems=myRevs.map((rev, index) => (
        <RevCardBig
            key={rev.id}
            id={rev.id}
            username={rev.username}
            rating={rev.rating}
            comment={rev.comment}
            productId={0}
        />
    ))
    return(
        <div className="rev-page-cont">
            <h1>Recenzii Clienți</h1>

            <div className="rev-cont-user-page">
                <h2>Lasă și tu o recenzie:</h2>
                <form className="rev-form" onSubmit={handleSubmit}>
                    <select required onChange={(e)=>setNrStars(e.target.value)}>
                        <option value="">
                            Acordă stele
                        </option>
                        <option value="1">&#9733;&#9734;&#9734;&#9734;&#9734;</option>
                        <option value="2">&#9733;&#9733;&#9734;&#9734;&#9734;</option>
                        <option value="3">&#9733;&#9733;&#9733;&#9734;&#9734;</option>
                        <option value="4">&#9733;&#9733;&#9733;&#9733;&#9734;</option>
                        <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
                    </select>
                    <input type="text" placeholder="Scrie-ți părerea (opțional)" onChange={(e)=>setComment(e.target.value)}></input>
                    <button><i class="bi bi-send" style={{color:"white",fontSize:"1.5rem"}}></i> Trimite</button>
                </form>
                {revMessage ? <h2 style={{color:"lime"}}>{revMessage}</h2> : null}
                {revErr ? <h3 style={{color:"red"}}>{revErr}</h3> : null}
            </div>

            {loading ? <h2>Se încarcă...</h2> : 
                <div className="rev-cont-list">
                    {myRevElems}
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