"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Axios } from "axios";

export default function signupPage() {
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })

    const onSignup = async () => {
    }



    return (
        <div className="flex items-center justify-center text-2xl h-screen">
            <div className="border border-gray-300 bg-gray-200 text-gray-900 p-8 rounded-xl shadow-2xl space-y-5">
                <h1>signup</h1>
                <hr className="py-1"/>

                <div className="">
                    <label htmlFor="username" className="">username</label>
                    <input
                        className="border rounded-md px-3 w-full"
                        type="text"
                        id="username"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        placeholder="username"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="mr-2">email</label>
                    <input
                        className="border rounded-md px-3 w-full"
                        type="email"
                        id="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="email"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="mr-2">password</label>
                    <input
                        className="border rounded-md px-3 w-full"
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
                        Register
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