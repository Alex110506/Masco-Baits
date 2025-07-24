import React from "react";
import { Await,useLoaderData,defer } from "react-router-dom";
import OrderContAdmin from "../components/OrderContAdmin";
import Canonical from "../components/Canonical";

export function loader() {
    const dataPromise = fetch("/api/admin/recentOrders", {
        method: "POST", // Make sure your backend expects POST
        headers: {
        "Content-Type": "application/json",
        },
    })
    .then((res) => {
        if (!res.ok) throw new Error("failed to fetch data");
        return res.json();
    });

    return defer({ data: dataPromise });
}

export default function AdminPage(){

    const {data}=useLoaderData()

    function handleOrderView(id){
        return 0
    }


    const [search,setSearch]=React.useState("")
    const [orders,setOrders]=React.useState([])

    return (
        <>
        <Canonical url="https://masco-baits-production.up.railway.app/admin"></Canonical>
        <div className="admin-page-cont">
            <h1>Pagina de Admin</h1>
            <div className="admin-sect">
                <div className="order-sect-admin">
                    <div className="search-bar-cont-admin">
                        <p>Caută după ID sau Nume</p>
                        <input value={search ? search : null} placeholder="Caută" onChange={(e)=>setSearch(e.target.value)}></input>
                    </div>
                    <div className="orders-cont-admin">
                        <React.Suspense fallback={<h2>Se încarcă comenzile...</h2>}>
                            <Await resolve={data}>
                                {
                                    (loadedData)=>{ 
                                        console.log(loadedData)
                                        
                                        if(loadedData.status==0){
                                            return (<h1>{loadedData.message}</h1>)
                                        }else{
                                            setOrders(loadedData.result.sort((a,b)=>{
                                                if(a.id<b.id) 
                                                    return 1;
                                                if(a.id>b.id)
                                                    return -1
                                                return 0
                                            }));
                                            const OrderElems=orders.map((order,index)=>{
                                                if(order.id==search || order.username.toLowerCase()==search.toLowerCase() || order.username.toLowerCase().includes(search.toLowerCase()) || search==""){
                                                    return (
                                                        <OrderContAdmin
                                                            key={index}
                                                            id={order.id}
                                                            username={order.username}
                                                            email={order.email}
                                                            telefon={order.telefon}
                                                            date={order.date}
                                                            status={order.status}
                                                        >
                                                        </OrderContAdmin>
                                                    )
                                                }
                                                else{
                                                    return null
                                                }
                                                
                                            })
                                            return OrderElems
                                        } 
                                    } 
                                }
                            </Await>
                        </React.Suspense>
                    </div>
                    
                </div>
                <div className="">

                </div>
            </div>
        </div>
        </>
    )
}