import { Route, Routes, Navigate } from "react-router-dom";

import Signin from "../../Users/Signin";
import Profile from "../../Users/Profile";
import UserTable from "../../Users/Table";
import Signup from "../../Users/Signup";



export default function Account() {
    return (
        <div className="container-fluid">
            <Routes>
                <Route path="/" element={<Navigate to="/Kanbas/Account/Signin" />} />
                <Route path="/Signin" element={<Signin />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/Admin/Users" element={<UserTable />} />
                <Route path="/Signup" element={<Signup />} />
            </Routes>
        </div>
    );
}