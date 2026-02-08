import React from "react";
import { Await, defer, useLoaderData, useRouteLoaderData } from "react-router-dom";
import ProductConfContainer from "../components/ProductConfContainer";

export function loader({request}){
    const url=new URL(request.url).pathname;
    const id=url.substring(url.lastIndexOf("/") + 1)
    const dataPromise=fetch("/order/getConf",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id
        })
    })
    .then(res=>{
        if(!res.ok)
            throw new Error("failed to get order data")
        return res.json()
    })
    return defer({
        id,
        dataPromise
    })
}

export default function Confirmation(){

    const [orderId,setOrderId]=React.useState("")
    const [costLivr,setCostLivr]=React.useState(0)
    const {products}=useRouteLoaderData("root")

    const data=useLoaderData();
    
    //fain frumos afisez datele
    React.useEffect(() => {
        window.scrollTo(0, 0); 
        setOrderId(`#${data.id}`)
    }, []);

    return(
        <div className="confirmation-page-cont">
            <div className="prod-side-head conf-head">
                <img src="\assets\images\logo\maco-baits-logo.png.jpg"></img>
                <span>Comanda cu codul <span className="order-id-conf-span">{orderId}</span>&nbsp;a fost plasată cu <span style={{color:"rgba(238, 16, 77, 1)"}}>SUCCES</span> ! 🎉</span>
            </div>
            <React.Suspense fallback={<h1>Se încarcă...</h1>}>
                <Await resolve={data.dataPromise}>
                    {
                        (loadedData)=>{
                            console.log(loadedData)
                            const prodsArrDb = loadedData.products;
                            console.log(loadedData)
                            const productMap = new Map(products.map(item => [item.id, item]));

                            const prodsArr = prodsArrDb.map(product => {
                                const item = productMap.get(product.productId);
                                if (item) {
                                    return {
                                        dets: item,
                                        quantity: product.quantity,
                                        price: product.price
                                    };
                                }
                                return null;
                            })
                            .filter(Boolean);

                            console.log(prodsArr) 

                            const prodElems=prodsArr.map((item)=>{
                                return <ProductConfContainer
                                    key={item.dets.id}
                                    name={item.dets.name}
                                    photo={item.dets.photo}
                                    brand={item.dets.brand}
                                    price={item.price}
                                    quantity={item.quantity}
                                ></ProductConfContainer>
                            }) 

                            return(
                                <><div className="detail-cont-conf">
                                    <h1>Îți mulțumim că ai ales Masco Baits! </h1>
                                    <p>Comanda ta este acum în curs de procesare. Vei primi un e-mail de confirmare cu detaliile comenzii tale.</p>
                                    <h2>📦 Ce urmează?</h2>
                                    <ul>
                                        <li>Vom verifica și pregăti comanda ta.</li>
                                        <li>Vei primi un e-mail când comanda este acceptată și pregătită pentru livrare.</li>
                                    </ul>
                                    <h3>💳 Metoda de plată aleasă: {loadedData.details.modalitate}</h3>
                                    <h3>📍 Adresă de livrare: </h3>
                                    <ul>
                                        <li>Județ: {loadedData.details.judet}</li>
                                        <li>Localitate: {loadedData.details.oras}</li>
                                        <li>Adresa: {loadedData.details.adresa}</li>
                                        <li>Cod Poștal: {loadedData.details.cod_postal}</li>
                                    </ul>
                                    <h3>📲 Contact:</h3>
                                    <ul>
                                        <li>Telefon: {loadedData.details.telefon}</li>
                                        <li>E-mail: {loadedData.details.email}</li>
                                    </ul>
                                    <h3>📅 Estimare livrare: 4.04.2025</h3>
                                    <h3>Dacă ai întrebări, nu ezita să ne contactezi la [email sau telefon].</h3>
                                    <h2>Mulțumim pentru încredere și îți dorim fir întins! 🎣</h2>
                                </div>
                                <div className="products-conf-cont">
                                    {prodElems}
                                </div>
                                <div className="total-cont-chk conf-total">
                                    <div className="check-price-cont conf-price-cont">
                                        <div className="cst-cont-chk cst-conf">
                                            <span>Cost Produse:</span>
                                            <span>{loadedData.details.price} Lei</span>
                                        </div>
                                        <div className="lvr-cont-chk lvr-conf">
                                            <span>Cost Livrare:</span>
                                            <span>{costLivr} Lei</span>
                                        </div>
                                    </div>
                                    <h2>Total: {loadedData.details.price+costLivr} Lei</h2>
                                </div></>
                            ) 
                           
                        }
                    }
                </Await>
            </React.Suspense>
            
        </div> 
    )
}