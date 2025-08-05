import React from "react";
import { useRouteLoaderData } from "react-router-dom";

export default function OrderContAdmin(props){

    const [status,setStatus]=React.useState(props.status)
    const id=props.id
    const [error,setError]=React.useState("")
    const [productsOrder,setProductsOrder]=React.useState([])

    const handleStatusChange=async (e)=>{
        e.preventDefault()
        const res=await fetch("/orders/changeStatus",{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({id,status})
        })
        const data=await res.json()
        if(res.ok){
            if(data.status==0)
                setError(data.message)
            else{
                return
            }
        }else{
            setError(data.message)
            console.log("Error",data.message)
            return
        }
    }

    const handleDetails=async (e)=>{
        e.preventDefault()
        const res=await fetch("/api/admin/getProducts",{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({id})
        })
        const data=await res.json()
        if(res.ok){
            if(data.status==0){
                setError(data.message)
            }else{
                console.log(data.result)
                setProductsOrder(data.result)
            }
        }else{
            setError(data.message)
        }
    }

    const prodElems=productsOrder.map((product)=>{
        return(
            <tr>
                <td>{product.name}</td>
                <td>{Number(product.price).toFixed(2)} Lei</td>
                <td>{product.quantity}</td>
            </tr> 
        )
    })
    const costLivrare=props.price>=700 ? 0 : 25

    // const formattedDate = 
	// 		String(props.date.getDate()).padStart(2, "0") + "/" +
	// 		String(props.date.getMonth() + 1).padStart(2, "0") + "/" +
	// 		props.date.getFullYear();

    return(
        <div className="order-admin-all-cont">
            <div className="order-admin-cont">
                <div className="order-dets-admin">
                    <h2>ID comandă: {props.id}</h2>
                    <h3>Nume: {props.username}</h3>
                    <p>Email: {props.email}</p>
                    <p>Telefon: {props.telefon}</p>
                    <p>Data comenzii: {props.date}</p>
                    <button onClick={handleDetails} disabled={productsOrder.length>0 ? true : false}>Vezi detalii comandă</button>
                </div>
                <form onSubmit={handleStatusChange} className="order-adm-form">
                    <h2>Setează Status</h2>
                    {error ? <h3>{error}</h3> : null}
                    <select value={status} onChange={(e)=>setStatus(e.target.value)}>
                        <option value="Plasată">Plasată</option>
                        <option value="procesat">Procesată</option>
                        <option value="livrare">Livrare</option>
                        <option value="fianlizt">Finalizată</option>
                    </select>
                    <button>Salvează</button>
                </form>
            </div>
            {productsOrder.length>0 ? 
                <div className="prod-dets-admin-cont">
                    <div className="adress-cont-admin">
                        <p>Județ: {props.judet}</p>
                        <p>Oraș: {props.oras}</p>
                        <p>Adresă: {props.adresa}</p>
                        <p>Cod Poștal: {props.cod_postal}</p>
                        <h3>Metodă de plată: {props.modalitate}</h3>
                        <button onClick={()=>setProductsOrder([])}>Vezi mai puțin</button>
                    </div>
                    <div className="prods-cont-admin">
                        <div className="prod-admin-cont">
                        <table className="modern-table">
                        <thead>
                            <tr>
                                <th>Produs</th>
                                <th>Preț</th>
                                <th>Bucăți</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prodElems}
                        </tbody>
                        </table>
                    </div>
                        
                        <p>Cost produse: {Number(props.price).toFixed(2)} Lei</p>
                        <p>Cost Livrare: {Number(costLivrare).toFixed(2)} Lei</p>
                        <h2>Total: {(Number(props.price) + Number(costLivrare)).toFixed(2)} Lei </h2>
                    </div>
                    
                </div>

                : null
            }
        </div>
    )
}