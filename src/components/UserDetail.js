import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
                setUser(response.data);
            } catch (error) {
                alert("Error fetching user details");
            }
        };
        fetchUser();
    }, [id]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-xl bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-2 text-gray-800">{user.name}'s Details</h1>
                <p className="text-gray-700">
                    <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p className="text-gray-700">
                    <span className="font-semibold">Phone:</span> {user.phone}
                </p>
                <p className="text-gray-700">
                    <span className="font-semibold">Website:</span>
                    <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {user.website}
                    </a>
                </p>
                <p className="text-gray-700">
                    <span className="font-semibold">Company:</span> {user.company?.name}
                </p>
            </div>
        </div>
    );
};

export default UserDetail;
