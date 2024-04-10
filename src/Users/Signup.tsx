import React, { useState } from "react";
import { useNavigate } from "react-router";
import * as client from "./client";

export default function Signup() {
    const [user, setUser] = useState({ username: "", password: ""});
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const signup = async () => {
        try {
            await client.signup(user);
            navigate("/Kanbas/Account");
        } catch (err: any) {
            setError(err.response.data.message);
        }
    };

    return (
        <div className="m-3">
            <h1>Signup</h1>
            { error && <div>{error}</div> }
            <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} placeholder="Username" />
            <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="Password" />
            <button onClick={signup}>Signup</button>
        </div>
    )
};