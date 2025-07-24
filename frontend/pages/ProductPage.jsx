import React from "react";
import { useLoaderData, useRouteLoaderData,Await,defer} from "react-router-dom";
import RevCard from "../components/RevCard";
import { useAuth } from "../components/AuthContext";
import Canonical from "../components/Canonical";

export function loader({request}){
    const url=new URL(request.url).pathname;
    const id=url.substring(url.lastIndexOf("/") + 1)
    const reviewsPromise = fetch(`/api/products/reviews`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id:id
        })
    })
    .then(res =>{
        if(!res.ok)
            throw new Error("failed to fetch reviews")
        return res.json()
         
    });

    return defer({
        id: id,
        reviews: reviewsPromise
    });
}

export default function ProductPage(){
    React.useEffect(() => {
        window.scrollTo(0, 0); 
    }, []);

    const [nrStars,setNrStars]=React.useState(0)
    const [comment,setComment]=React.useState("")
    const [revMessage,setRevMessage]=React.useState("")
    const [revErr,setRevErr]=React.useState("")
    const [myRevs,setMyRevs]=React.useState([])
    const [rating,setRating]=React.useState(0);
    const [pcs,setPcs]=React.useState(1);

    const {isLoggedIn,setIsLoggedIn}=useAuth()

    const data=useLoaderData()
    const id=data.id
    const {products}=useRouteLoaderData("root")
    const product=products.find((item)=>item.id==id)

    const prodDiam=product.diameter
    const prodQuant=product.quantity
    const quant=prodQuant.split(",")
    const description=product.description
    const price=product.price
    const ratingNew=Math.floor(2*rating);
    const ratingShow=rating===null ? 0 : rating
    let stars = [];

    for (let i = 0; i < Math.floor(ratingNew / 2); i++) {
    stars.push(<i className="bi bi-star-fill" style={{color:"gold"}} key={i}></i>);
    }

    if (ratingNew % 2 === 1) {
    stars.push(<i className="bi bi-star-half" style={{color:"gold"}} key={stars.length}></i>);
    }

    while (stars.length < 5) {
    stars.push(<i className="bi bi-star" style={{color:"gold"}} key={stars.length}></i>);
    }

    const nrRevs=product.nrRevs
    console.log(stars)
    let diameter=null
    let diamElem=null
    let quantElem=null
    if(prodDiam){
        diameter=prodDiam.split(",")

        if(diameter.length>1){
            diamElem=diameter.map((item,index)=>{
                return <option value={item} key={index}>{item} mm</option>
            })
        }
    }

    if(quant.length>1){
        quantElem=quant.map((item,index)=>{
            return <option value={item} key={index}>{item} g</option>
        })
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const res= await fetch("/api/products/postreview",{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({nrStars,comment,id})
        })
        const data=await res.json();
        console.log(data)
        if(res.ok){
            if(data.status===1){
                setMyRevs(prev => [...prev,
                    {
                        id: prev.length + 1,
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

    const handleCart= async (e)=>{
        e.preventDefault();
        if(isLoggedIn){
            console.log("adaugat",id,pcs)
            const res=await fetch("/api/addCart",{
                method:"POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({productId:id,quantity:pcs})
            })
            const data=await res.json();
            location.reload()
            return data
        }else{
            let cart=JSON.parse(localStorage.getItem("cartProducts") || "[]")
            let ok=0
            cart.forEach((item)=>{
                if(item.id===id){
                    item.q=Number(Number(item.q)+Number(pcs));
                    ok=1;
                }
            })
            if(ok==0){
                cart.push({id:id,q:Number(pcs)})
            }
            localStorage.setItem("cartProducts",JSON.stringify(cart))
            location.reload()
        }
        
    }

    console.log(myRevs)
    const myRevElems=myRevs.map((rev, index) => (
    <RevCard
        key={rev.id}
        id={rev.id}
        username={rev.username}
        rating={rev.rating}
        comment={rev.comment}
    />
    ))

    return(
        <>
        <Canonical url={`https://masco-baits-production.up.railway.app/${product.category.replace(/ /g, "_").toLowerCase()}/${id}`}></Canonical>
        <div className="product-page-cont">
            <h1 className="prod-name-cont-page">{product.name}</h1>
            <div className="prod-dets">
                <div className="primary-prod-dets-cont">
                    <div className="prod-img-cont-page">
                        <img src={`../assets/images/prod-imgs/${product.photo}`} alt={product.name + "image"}></img>
                    </div>
                    <div className="prod-dets-cont-page">
                        <div className="categ-cont">
                            <h2>Categorie</h2>
                            <p>{product.category}</p>
                        </div>
                        {product.diameter ? 
                            <div className="diam-cont">
                                <h2>Diametru</h2>
                                {diameter.length>1 ?
                                    <select className="diam-sel">
                                        {diamElem}
                                    </select>
                                : <p>{diameter[0]} mm</p>}
                            </div> 
                        : null}
                        <div className="quant-cont-page">
                            <h2>Cantitate</h2>
                            {quant.length>1 ?
                                <select className="quant-sel">
                                    {quantElem}
                                </select>
                            : <p>{quant[0]} g</p>
                            }
                        </div>
                        {description ?
                            <div className="desc-cont">
                                <h2>Descriere:</h2>
                                <p>{description}</p>
                            </div>
                        : null}
                        
                    </div>
                </div>
                
                <div className="add-cart-cont">
                    <form className="add-cart-card" onSubmit={handleCart}>
                        <h2>{price} Lei</h2>
                        <p className="stock-p"><span className="in-stock-color-circ">&#9679;</span> In Stoc {/*Sa punn in baza de date in stoc status*/}</p>
                        <div className="pcs-cont">
                            <input value={pcs} type="number" onChange={(e) => setPcs(e.target.value)}></input>
                            <span>Bucăți</span>
                        </div>
                        
                        <button>
                            <div>
                                <i className="bi bi-cart" style={{fontSize: "30px"}}></i>
                            </div>
                            <p>
                                Adaugă in Cos
                            </p>
                        </button>
                    </form>
                    
                </div>
            </div>
            <div className="revs-cont">
                <h1>Recenzii ({nrRevs===null ? 0 : nrRevs}): {stars} {ratingShow}</h1>
                <div className="rec-cont-user">
                    <h2>Lasă o recenzie:</h2>
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
                    <div className="other-revs">
                        <h3>Alte Păreri:</h3>
                        
                        {<React.Suspense fallback={<h3>Se încarcă...</h3>}>
                            <Await resolve={data.reviews}>
                                {(loadedReviews) => {
                                    let ratingSt=0
                                    loadedReviews.forEach(element => {
                                        ratingSt+=Number(element.rating)
                                    });
                                    const ratingNr=loadedReviews.length;
                                    if(ratingNr)
                                        setRating((ratingSt/ratingNr).toFixed(2))
                                    else
                                        setRating(0)

                                    //console.log(loadedReviews)
                                    return (<div className="user-revs-cont">
                                    {myRevElems}
                                    {loadedReviews.length>0 ? loadedReviews.map((review) => (
                                        <RevCard
                                            id={review.id}
                                            username={review.username}
                                            rating={review.rating}
                                            comment={review.comment}
                                        ></RevCard>
                                    )) : <h4>{myRevElems.length ? null: "Fii primul care lasă o recenzie!"}</h4>}
                                    </div>
                                )}}
                            </Await>
                        </React.Suspense>}
                        
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}