"use client"
import axios from "axios"
import Link from "next/link"
import React, {useEffect, useState} from 'react'


export  default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false)


    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token })
            setVerified(true);

        } catch (error: any) {
            setError(true);
            console.log(error.response.data)
        }
    }
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex items-center justify-center h-screen">
            <div>
                <h1 className="text-3xl">
                    Verify your Email
                </h1>
                <p className="p-5 bg-orange-500 text-black text-center mt-3">{token ? `${token}`: "no token"}</p>

                {verified && (
                    <div>
                        <h2 className="text-2xl"> Email verified</h2>

                        <Link href="/login">
                            login
                        </Link>
                    </div>
                )}
                {error && (
                    <div>
                        <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                    </div>
                )}
            </div>
        </div>
    )

}