import React from "react";
import { useAuth } from "./AuthContext";

export default function LoginForm(){

    const [email,setEmail]=React.useState("")
    const [password,setPassword]=React.useState("")
    const [message,setMessage]=React.useState("")
    const [success,setSuccess]=React.useState("")

    const {isLoggedIn,setIsLoggedIn}=useAuth()

    function toSignup(){
        document.querySelector(".login").style.display="none"
        document.querySelector(".signup").style.display="flex"
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const res=await fetch("/login",{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({email,password})
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
        
        <form className="login" onSubmit={handleSubmit}>
            <h1 className="form-title" id="login">Log in</h1>
            {message ? <h2 style={{ color: "red" ,margin:"0"}}>{message}</h2> : null}
            {success ? <h2 style={{color:"lime",margin:"0"}}>{success}</h2> : null}
            <div className="form-holder">
                <input type="email" required className="input" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" required className="input" placeholder="Parola" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            {/* {<div className="form-buttons">
                <h2>Alte metode:</h2>
                <div className="sgn-btn-cont">
                    <button>
                        Google&nbsp;
                        <i class="bi bi-google" style={{color:"black", fontSize:"1.3rem"}}></i>
                    </button>
                    <button>
                        Facebook&nbsp;
                        <i class="bi bi-facebook" style={{color:"black", fontSize:"1.3rem"}}></i>
                    </button>
                </div>
            </div>} */}
            <button className="submit-btn">Log in</button>
            <div className="login-register-cont">
                <span>Nu ai cont?</span> <button onClick={toSignup} type="button">Înregistrează-te!</button>
            </div>
        </form>
    )
}