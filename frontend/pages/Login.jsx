import React from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { useAuth } from "../components/AuthContext";
import UserPage from "../components/UserPage";
import { useNavigate } from "react-router-dom";



export default function Login(){
    const navigate=useNavigate()
    const {isLoggedIn,setIsLoggedIn,admin}=useAuth()
    
    React.useEffect(() => {
        window.scrollTo(0, 0); 
    }, []);

    return(
        <>
            {isLoggedIn===false ? 
            <div className="form-structor">
                
                <LoginForm></LoginForm>
                <SignupForm></SignupForm> 
            </div>
            : 
            <div>
                <UserPage></UserPage>
            </div>
            }
            
            
        </>
    )
}