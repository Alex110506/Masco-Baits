import React from "react";
import { useAuth } from "./AuthContext";

export default function SignupForm(){

    const [username,setUsername]=React.useState("")
    const [email,setEmail]=React.useState("")
    const [password,setPassword]=React.useState("")
    const [tel,setTel]=React.useState("")
    const [judet,setJudet]=React.useState("")
    const [oras,setOras]=React.useState("")
    const [adress,setAdress]=React.useState("")
    const [postalcode,setPostalcode]=React.useState("")
    const [message,setMessage]=React.useState("")
    const [success,setSuccess]=React.useState("")

    const {isLoggedIn,setIsLoggedIn}=useAuth()

    function toLogin(){
        document.querySelector(".login").style.display="flex"
        document.querySelector(".signup").style.display="none"
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const res=await fetch("/register",{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({username,email,password,tel,judet,oras,adress,postalcode})
        })

        const data=await res.json()
        if(res.ok){
            if(data.status===0){
                setMessage(data.message)
                setSuccess("")
            }else{
                setMessage("")
                setSuccess(data.message)
                setIsLoggedIn(true)
                location.reload()
            }
        }else{
            setSuccess("")
            setMessage(data.message)
        }
    }
    return(
        <form className="signup" onSubmit={handleSubmit}>
            <h1 className="form-title" id="signup">Creează Cont</h1>
            {message ? <h2 style={{ color: "red" ,margin:"0"}}>{message}</h2> : null}
            {success ? <h2 style={{color:"lime",margin:"0"}}>{success}</h2> : null}
            <div className="form-holder">
                <input type="text" required className="input" placeholder="Nume" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="email" required className="input" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" required className="input" placeholder="Parola" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="text" required className="input" placeholder="Număr telefon" value={tel} onChange={(e) => setTel(e.target.value)}/>
                <h2>Adresă livrare:</h2>
                <p>(Poate fi modificată ulterior)</p>
                <select name="judete" required onChange={(e)=>setJudet(e.target.value)}>
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
                <input type="text" required className="input" placeholder="Oraș" value={oras} onChange={(e) => setOras(e.target.value)}/>
                <input type="text" required className="input" placeholder="Adresă" value={adress} onChange={(e) => setAdress(e.target.value)}/>
                <input type="text" required className="input" placeholder="Cod Poștal" value={postalcode} onChange={(e) => setPostalcode(e.target.value)}/>

            </div>
            {/* {<div className="form-buttons">
                <h2>Alte metode:</h2>
                <div className="sgn-btn-cont">
                    <button>
                        Google&nbsp;
                        <i className="bi bi-google" style={{color:"black", fontSize:"1.3rem"}}></i>
                    </button>
                    <button>
                        Facebook&nbsp;
                        <i className="bi bi-facebook" style={{color:"black", fontSize:"1.3rem"}}></i>
                    </button>
                </div>
            </div>} */}
            <button className="submit-btn">Sign up</button>
            <div className="login-register-cont">
                <span>Ai deja cont?</span> <button onClick={toLogin} type="button">Loghează-te!</button>
            </div>
            
        </form>
    )
}