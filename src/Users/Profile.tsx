import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";


export default function Profile() {
    const [profile, setProfile] = useState({   
            username: "", 
            password: "",
            firstName: "",
            lastName: "",
            dob: "",
            email: "", 
            role: "USER"
        });

    const navigate = useNavigate();

    const fetchProfile = async () => {
        const account = await client.profile();
        setProfile(account);
    };
    const save = async() => {
        const response = await client.updateUser(profile);
    }

    const signout = async () => {
        await client.signout();
        navigate("/Kanbas/Account/Signin");
    }

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            <Link className="btn btn-warning w-100" to="/Kanbas/Account/Admin/Users">Users</Link>
            {profile && (
                <div>
                    <input value={profile.username} onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
                    <input value={profile.password} onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
                    <input value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
                    <input value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
                    <input value={profile.dob} onChange={(e) => setProfile({ ...profile, dob: e.target.value })} type="date" />
                    <input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} type="email" />
                    <select value={profile.role} onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </select>
                    <button onClick={save}>Save</button>
                    <button onClick={signout}>Signout</button>
                </div>
            )}
        </div>
    );
};