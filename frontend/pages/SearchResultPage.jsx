import React from "react";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import ProductContainerCateg from "../components/ProductContainerCateg";

export function loader({request}){
    const url=new URL(request.url).pathname;
    const id=url.substring(url.lastIndexOf("/") + 1)
    return id
}

export default function SearchResultPage(){

    const data=useLoaderData()
    let searchInput=decodeURIComponent(data.toLowerCase())
    
    const {products}=useRouteLoaderData("root")
    let foundPords=products

    const searchWordsArr=searchInput.split(" ")
    searchWordsArr.forEach((word)=>{
        foundPords=foundPords.filter((product)=>product.name.toLowerCase().includes(word))
    })

    const foundProdElems=foundPords.map((item)=>{
        return (
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
        )
    })

    return(
        <div className="search-res-page-cont">
            <h1>Rezultatele căutării pentru: {searchInput}</h1>
            <div className="categ-list-cont">
                {foundProdElems}
            </div>
        </div>
    )
}