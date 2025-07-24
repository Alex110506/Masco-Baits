import React from "react";
import { useLoaderData,useRouteLoaderData } from "react-router-dom";
import ProductContainerCateg from "../components/ProductContainerCateg";
import Canonical from "../components/Canonical";

export function loader({request}){
    const url=new URL(request.url).pathname;
    return url
}

export default function CategoryPage(){
    

    const {products}=useRouteLoaderData("root");

    const [weight,setWeight]=React.useState(0);
    const [diameter,setDiameter]=React.useState(0);
    const [page,setPage]=React.useState(1)

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);
    
    const data=useLoaderData();
    let categoryName=data.replace(/_/g," ").slice(1).toUpperCase();

    const categProds=products.filter((item)=>item.category.toUpperCase()==categoryName)
    const filteredProds = categProds.filter(item =>
        (weight == 0 || item.quantity == weight) &&
        (diameter == 0 || item.diameter == diameter)
    );

    const categElems = filteredProds.map(item => (
    <ProductContainerCateg
        key={item.id}
        id={item.id.toString()}
        name={item.name}
        brand={item.brand}
        price={item.price}
        photo={item.photo}
        diameter={item.diameter}
        description={item.description}
        quantity={item.quantity}
        category={item.category}
        rating={item.rating}
        nrRevs={item.nrRevs}
    />
    ));

    const nrPages = Math.ceil(categElems.length / 12);

    const pageBtns = Array.from({ length: nrPages }, (_, i) => (
        <button key={i} className="page-btn" onClick={() => setPage(i + 1)}>
            {i + 1}
        </button>
    ));

    const startIdx = (page - 1) * 12;
    const categPageElems = categElems.slice(startIdx, startIdx + 12);

    console.log(categProds)

    return (
        <>
        <Canonical url={data}></Canonical>
        <div className="categ-page-cont">
            <div className="categ-banner-cont">
                <img src="..\assets\images\logo\maco-baits-logo.png.jpg" alt="header-banner"></img>
                <span>{categoryName}</span>
            </div>
            {
                (
                    categoryName.toLocaleLowerCase() == "Boilies".toLocaleLowerCase() ||
                    categoryName.toLocaleLowerCase() == "Boilies Carlig".toLocaleLowerCase() ||
                    categoryName.toLocaleLowerCase()=="Boilies Critic Echilibrat".toLocaleLowerCase() ||
                    categoryName.toLocaleLowerCase()=="Popup & Wafters".toLocaleLowerCase()
                )&&
                <div className="filter-prod-cont">
                    <h2>Filtrează produsele:</h2>
                    <div className="filter-prod-cont-low">
                        <div className="filt-cont">
                            <span>Diametru:</span>
                            <select onChange={(e)=>setDiameter(e.target.value)}>
                                <option value={0}>Alege un Diametru:</option>
                                {categoryName.toLocaleLowerCase()=="Popup & Wafters".toLocaleLowerCase() ?
                                    <>
                                        <option value={8}>8mm</option>
                                        <option value={9}>9mm</option>
                                        <option value={10}>10mm</option>
                                    </>
                                    :
                                    <>
                                        {categoryName.toLocaleLowerCase()=="Boilies Critic Echilibrat".toLocaleLowerCase() ? <option value={10}>10mm</option> : null}
                                        <option value={14}>14mm</option>
                                        <option value={18}>18mm</option>
                                        <option value={22}>22mm</option>
                                    </>
                                }
                            </select>
                        </div>

                        {categoryName.toLocaleLowerCase()=="Boilies".toLocaleLowerCase() ?
                            <div className="filt-cont">
                                <span>Cantitate:</span>
                                <select onChange={(e)=>setWeight(e.target.value)}>
                                    <option value={0}>Alege o Cantitate:</option>
                                    <option value={1000}>1kg</option>
                                    <option value={10000}>10kg</option>
                                </select>
                            </div>
                            :
                            null
                        }

                    </div>

                </div>
            }

            <div className="categ-list-cont">
                {categPageElems}
            </div>
            {pageBtns.length > 1 ? 
                <div className="page-btn-cont">
                    <span>Pagina:</span>
                    {pageBtns} 
                </div>
            : null}
        </div>
        </>
    )
}