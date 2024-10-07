import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateUserModal = ({ isOpen, onClose, onUserUpdated, initialUser, nextUserId }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [company, setCompany] = useState("");

    useEffect(() => {
        if (initialUser) {
            setName(initialUser.name);
            setEmail(initialUser.email);
            setPhone(initialUser.phone);
            setStreet(initialUser.address?.street || "");
            setCity(initialUser.address?.city || "");
            setCompany(initialUser.company?.name || "");
        }
    }, [initialUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || name.length < 3) {
            alert("Name is required and should be at least 3 characters");
            return;
        }

        if (!email.includes("@")) {
            alert("Invalid email format");
            return;
        }

        if (!phone || phone.length < 10) {
            alert("Phone number is required and should be at least 10 digits");
            return;
        }

        if (!street || !city) {
            alert("Both street and city are required");
            return;
        }

        const userData = {
            id: nextUserId,  // Use a temporary id
            name,
            email,
            phone,
            address: {
                street,
                city,
            },
            company: {
                name: company,
            },
        };

        try {
            if (initialUser) {
                // Update user via PUT request
                const response = await axios.put(
                    `https://jsonplaceholder.typicode.com/users/${initialUser.id}`,
                    userData
                );
                onUserUpdated(response.data);
            } else {
                // Simulate POST request and add to the local state
                const response = await axios.post(
                    "https://jsonplaceholder.typicode.com/users",
                    userData
                );
                // Update the local state with the new user (using the nextUserId to avoid conflicts)
                onUserUpdated(userData);
            }

            // Close the modal after the operation
            onClose();
        } catch (error) {
            alert("Error creating or updating user");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full ">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    {initialUser ? "Edit User" : "Create New User"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            minLength="3"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            minLength="10"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Street</label>
                        <input
                            type="text"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">City</label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Company</label>
                        <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition"
                        >
                            {initialUser ? "Update User" : "Create User"}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-800 rounded-md px-4 py-2 hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUserModal;
