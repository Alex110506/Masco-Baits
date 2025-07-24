import React from "react";
import { useNavigate , useRouteLoaderData} from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import Canonical from "../components/Canonical";

export default function Checkout(){
    const {userData,isLoggedIn}=useAuth()
    console.log(userData)
    console.log(isLoggedIn,"menacaca")

    const {products,cartProd}=useRouteLoaderData("root");

    const [modalitate,setModalitate]=React.useState("transfer");
    const [judet,setJudet]=React.useState("")
    const [localitate,setLocalitate]=React.useState("")
    const [adresa,setAdresa]=React.useState("")
    const [codPostal,setCodPostal]=React.useState("")
    const [nume,setNume]=React.useState("")
    const [email,setEmail]=React.useState("")
    const [telefon,setTelefon]=React.useState("")

    const [costProd,setCostProd]=React.useState(0)
    const [costLivr,setCostLivr]=React.useState(0)
    
    const [error,setError]=React.useState("")

    const orderId=123

    //daca utilizatorul nu e logat sa se afiseze campuri cu numele, email si telefon

    React.useEffect(() => {
        window.scrollTo(0, 0);
        const transf = document.querySelector(".det-transf-cont");
        const ramb = document.querySelector(".det-ramb-cont");

        if (!transf || !ramb) return;

        if (modalitate === "ramburs") {
            transf.style.display = "none";
            ramb.style.display = "block";
        } else {
            transf.style.display = "block";
            ramb.style.display = "none";
        }

    }, [modalitate]);

    React.useEffect(()=>{
        if(isLoggedIn){
            setNume(userData.username)
            setEmail(userData.email)
            setTelefon(userData.telefon)
            setJudet(userData.judet)
            setLocalitate(userData.oras)
            setAdresa(userData.adresa)
            setCodPostal(userData.cod_postal)
        }
    },[]) 

    function handleChange(e){
        setModalitate(e.target.value)
    }

    const navigate=useNavigate() 


    //trimit comanda la baza de date cu detaliile si trimit in url doar id u la comanda
    //in pagina de confirmare preiau comanda din baza de date si afisez datele
    const finalizeCheck=async (e)=>{
        e.preventDefault()
        const res=await fetch("/order/send",{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({cartProd,costProd,costLivr,nume,email,telefon,judet,localitate,adresa,codPostal,modalitate})
        })
        const data=await res.json();
        if(res.ok){
            const orderId=data.orderId
            navigate(`/cart/checkout/confirmation/${orderId}`)
        }else{
            setError(data.message)
        }
    }

    

    return(
        <>
        <Canonical url="https://masco-baits-production.up.railway.app/cart/checkout"></Canonical>
        <div className="checkout-pg-cont">
            <div className="prod-side-head check-head">
                <img src="..\assets\images\logo\maco-baits-logo.png.jpg" alt="company logo"></img>
                <span>Finalizare Comandă</span>
            </div>
            <form className="comanda-info-cont" onSubmit={finalizeCheck}>
                {error ? <h1 style={{color:"red"}}>Eroare: {error}</h1> : null}
                <div className="total-cont-chk">
                    <h1>Sumar Comandă</h1>
                    <div className="check-price-cont">
                        <div className="cst-cont-chk">
                            <span>Cost Produse:</span>
                            <span>{costProd} Lei</span>
                        </div>
                        <div className="lvr-cont-chk">
                            <span>Cost Livrare:</span>
                            <span>{costLivr} Lei</span>
                        </div>
                    </div>
                    <h2>Total: {costProd+costLivr} Lei</h2>
                </div>
                <div className="det-liv-cont">
                    <h1>Detalii Contact:</h1>
                    <div className="lvr-sect">
                        <h3>Nume:</h3>
                        <input type="text" required placeholder="Introd numele întreg" onChange={(e)=>setNume(e.target.value)} value={nume}/>
                    </div>
                    <div className="lvr-sect">
                        <h3>E-mail:</h3>
                        <input type="email" required placeholder="Introd un e-mail" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                    </div>
                    <div className="lvr-sect">
                        <h3>Telefon:</h3>
                        <input type="text" required placeholder="Introd un număr de telefon" onChange={(e)=>setTelefon(e.target.value)} value={telefon}/>
                    </div>
                </div>
                <div className="det-liv-cont">
                    <h1>Detalii Livrare</h1>
                    <div className="lvr-sect">
                        <h3>Județ:</h3>
                        <select name="judete" required onChange={(e)=>setJudet(e.target.value)} value={judet}>
                            <option value="">Alege Judet</option>
                            <option value="Alba">Alba</option>
                            <option value="Arad">Arad</option>
                            <option value="Arges">Arges</option>
                            <option value="Bacau">Bacau</option>
                            <option value="Bihor">Bihor</option>
                            <option value="Bistrita Nasaud">Bistrita Nasaud</option>
                            <option value="Botosani">Botosani</option>
                            <option value="Brasov">Brasov</option>
                            <option value="Braila">Braila</option>
                            <option value="Bucuresti">Bucuresti</option>
                            <option value="Buzau">Buzau</option>
                            <option value="Caras Severin">Caras Severin</option>
                            <option value="Calarasi">Calarasi</option>
                            <option value="Cluj">Cluj</option>
                            <option value="Constanta">Constanta</option>
                            <option value="Covasna">Covasna</option>
                            <option value="Dambovita">Dambovita</option>
                            <option value="Dolj">Dolj</option>
                            <option value="Galati">Galati</option>
                            <option value="Giurgiu">Giurgiu</option>
                            <option value="Gorj">Gorj</option>
                            <option value="Harghita">Harghita</option>
                            <option value="Hunedoara">Hunedoara</option>
                            <option value="Ialomita">Ialomita</option>
                            <option value="Iasi">Iasi</option>
                            <option value="Ilfov">Ilfov</option>
                            <option value="Maramures">Maramures</option>
                            <option value="Mehedinti">Mehedinti</option>
                            <option value="Mures">Mures</option>
                            <option value="Neamt">Neamt</option>
                            <option value="Olt">Olt</option>
                            <option value="Prahova">Prahova</option>
                            <option value="Satu Mare">Satu Mare</option>
                            <option value="Salaj">Salaj</option>
                            <option value="Sibiu">Sibiu</option>
                            <option value="Suceava">Suceava</option>
                            <option value="Teleorman">Teleorman</option>
                            <option value="Timis">Timis</option>
                            <option value="Tulcea">Tulcea</option>
                            <option value="Vaslui">Vaslui</option>
                            <option value="Valcea">Valcea</option>
                            <option value="Vrancea">Vrancea</option>
                        </select>
                    </div>
                    <div className="lvr-sect">
                        <h3>Localitate:</h3>
                        {/*sa adaug localitati in bazele de date*/}
                        <input onChange={(e)=>setLocalitate(e.target.value)} value={localitate} type="text" name="localitate" placeholder="Scrie Localitate" required></input>
                    </div>
                    <div className="lvr-sect">
                        <h3>Adresă:</h3>
                        {/*sa adaug localitati in bazele de date*/}
                        <input onChange={(e)=>setAdresa(e.target.value)} value={adresa} type="text" name="adresa" placeholder="Scrie Adresa" required></input>
                    </div>
                    <div className="lvr-sect">
                        <h3>Cod Poștal:</h3>
                        {/*sa adaug localitati in bazele de date*/}
                        <input onChange={(e)=>setCodPostal(e.target.value)} value={codPostal} type="text" name="cod-post" pattern="\d{6}" maxlength="6" placeholder="Scrie Codul Poștal (6 cifre)" required></input>
                    </div>
                </div>
                <div className="mod-plata-cont">
                    <h1>Modalitate de plată</h1>
                    <div className="mod-plata-sel">
                        <div>
                            <input type="radio" name="mod_plata" defaultChecked value="tansfer" onChange={handleChange}></input>
                            <span>Transfer Bancar</span>
                        </div>
                        <div>
                            <input type="radio" name="mod_plata" value="ramburs" onChange={handleChange}></input>
                            <span>Ramburs</span>
                        </div>
                    </div>
                    <div className="additional-info-cont">
                        <div className="det-transf-cont">
                            <h4>
                                Pentru a continua procesarea comenzii, vă rugăm să efectuați manual transferul bancar utilizând informațiile furnizate. Nu uitați să menționați numărul comenzii în detaliile plății pentru o identificare rapidă.
                                Procesarea comenzii va începe în termen de 2 zile lucrătoare din momentul confirmării plății.
                                Dacă aveți orice întrebări sau nevoie de asistență, echipa noastră este aici să vă ajute. Vă mulțumim pentru încredere! <br></br>
                                Cu stimă,  Masco Baits
                            </h4>
                            <div className="det-tansf">
                                <div className="det-transf-sect">
                                    <span>IBAN:&nbsp;</span>
                                    <span>RO49BTRLRONCRT0546327801</span>
                                </div>
                                <div className="det-transf-sect">
                                    <span>Nume titular:&nbsp;</span>
                                    <span>MASCO-BAITS SRL</span>
                                </div>
                                <div className="det-transf-sect">
                                    <span>Banca:&nbsp;</span>
                                    <span>Banca Transilvania</span>
                                </div>
                                <div className="det-transf-sect">
                                    <span>Cod SWIFT:&nbsp;</span>
                                    <span>BTRLRO22</span>
                                </div>
                                
                            </div>
                        </div>
                        <div className="det-ramb-cont">
                            <p>Plata se va realiza la momentul livrării la curier.</p>
                        </div>
                    </div>
                    
                    <div className="fin-btn-cont">
                        <button disabled={false} className="fin-btn-check" type="submit">Finalizați Comanda</button>
                    </div>
                </div>
            </form>
        </div>
        </>
    )
}