

export default function UserProfile({ params }: { params: { id: string } }) {
    return (
        <div className="flex items-center justify-center h-screen">
            <div>
                <h1>Profile</h1>
                <hr />
                <p className='text-2xl'>Profile Page {params.id}</p>
            </div>
        </div>
    )
}