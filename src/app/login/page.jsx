   "use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {

        const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

     const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("api/users/login", user);
            console.log("login success", response.data);
            toast.success("Login successful");
            router.push("/profile");
            
        } catch (error) { 
        if (error instanceof Error) {
            console.log("login failed", error.message)
            toast.error(`Error: ${error.message || "An unexpected error occurred."}`);
        } else {
            console.error("An unexpected error occurred:", error);
        }
    } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
            if (user.email.length > 0 && user.password.length > 0) {
                setButtonDisabled(false);
            } else {
                setButtonDisabled(true);
            }
    }, [user]);


    return (
        <div className="flex items-center justify-center text-2xl h-screen">
            <div className="border border-gray-300 bg-gray-200 text-gray-900 p-8 rounded-xl shadow-2xl space-y-5">
                <h1 className="text-2xl text-center">{loading ? "Processing" : "Login"}</h1>
                <hr className="py-1"/>

                <div>
                    <label htmlFor="email" className="pb-2">email</label>
                    <input
                        className="border rounded-md px-3 w-full  py-1 placeholder:text-sm"
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
                        className="border rounded-md px-3 w-full  py-1 placeholder:text-sm"
                        type="password]"
                        id="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="password"
                    />
                </div>
                <div>
                    <button
                        onClick={onLogin}
                        className="w-full text-center py-1 bg-green-500 text-green-50 rounded-md">
                        {buttonDisabled ? "No Login" : "Login"}
                    </button>
                </div>
                <div className="text-gray-900 text-sm">
                    Dont have an Account? { ""}
                    <Link href="/signup" className="text-blue-500">Create one</Link>
                </div>
            </div>
            
        </div>
    )
}