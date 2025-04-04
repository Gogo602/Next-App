"use client"
import axios from "axios"
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function ProfilePage() {
    
    const router = useRouter()
    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            toast.success('Logout successfull')
            router.push("/login")

        } catch (error: any) {
            console.log(error.message)
            toast.error(`Error: ${error.message || "An unexpected error occurred."}`);
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div>
                <h1>Profile</h1>
                <hr />
                <p className="py-5">Profile Page</p>
                <hr/>

                <button
                    onClick={logout}
                 className="px-3 py-1 bg-blue-500 rounded-md my-4"
                >Logout</button>
            </div>
        </div>
    )
}