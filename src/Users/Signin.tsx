import { useState } from "react";
import { useNavigate } from "react-router";
import { User } from "./client";
import * as client from "./client";

export default function Signin() { 
    const [credentials, setCredentials] = useState<User>(
        { 
            _id: "",
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            role: "USER"
        }
    );

    const navigate = useNavigate();
    
    const signin = async () => {
        try {
            await client.signin(credentials);
            navigate("/Kanbas/Account/Profile");
        } catch (err: any) {
            console.log(err.response.data.message);
        }
        
    }



    return (
        <div className="m-3">
            <h1>Signin</h1>
            <input value={credentials.username} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}/>
            <input value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}/>
            <button onClick={signin}>Signin</button>
            <button onClick={() => navigate("/Kanbas/Account/Signup")}>Signup</button>
        </div>
    )



}




