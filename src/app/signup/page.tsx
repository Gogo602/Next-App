"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function SignupPage() {

    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
             toast.success("Account Registered successfully");
            router.push("/login");

        } catch (error: any) {
            toast.error(`Error: ${error.message || "An unexpected error occurred."}`);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="flex items-center justify-center text-2xl h-screen">
            <div className="border border-gray-300 bg-gray-200 text-gray-900 p-8 rounded-xl shadow-2xl space-y-5 text-xl">
                <h1 className="text-2xl text-center">{loading ? "Processing" : "Signup"}</h1>
                <hr className="py-1"/>

                <div className="">
                    <label htmlFor="username" className="pb-2">username</label>
                    <input
                        className="border rounded-md px-3 w-full py-1 placeholder:text-sm"
                        type="text"
                        id="username"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        placeholder="username"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="pb-2">email</label>
                    <input
                        className="border rounded-md px-3 w-full py-1 placeholder:text-sm"
                        type="email"
                        id="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="email"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="pb-2">password</label>
                    <input
                        className="border rounded-md px-3 w-full py-1 placeholder:text-sm"
                        type="password]"
                        id="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="password"
                    />
                </div>
                <div>
                    <button
                        onClick={onSignup}
                        className="w-full text-center py-1 bg-green-500 text-green-50 rounded-md">
                       {buttonDisabled ? "No Register" : "Register"}
                    </button>
                </div>
                <div className="text-gray-900 text-sm">
                    Already registered? {" "}
                    <Link href="/login" className="text-blue-500">Login</Link>
                </div>
            </div>
            
        </div>
    )
}