"use client"
import axios from "axios"
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function ProfilePage() {
    
    const router = useRouter()
    const [data, setData] = useState("")

    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            toast.success('Logout successfull')
            router.push("/login")

        } catch (error: unknown) {
            console.log(error.message)
            toast.error(`Error: ${error.message || "An unexpected error occurred."}`);
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div>
                <h1>Profile</h1>
                <hr />
                <p className="py-5">Profile Page</p>
                <h2 className='bg-green-500 text-sm p-4'>{data === 'nothing' ? "Nothing" : 
                    <Link href={`/profile/${data}`}>{data}</Link>
                } </h2>
                <hr/>

                 <button
                    onClick={getUserDetails}
                    className="px-3 py-1 bg-blue-500 rounded-md my-4"
                >Details</button>
                {" "}
                <button
                    onClick={logout}
                 className="px-3 py-1 bg-red-500 rounded-md my-4"
                >Logout</button>
            </div>
        </div>
    )
}