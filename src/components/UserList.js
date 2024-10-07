import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CreateUserModal from "./CreateUserModal";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); // Store the user being edited

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/users");
                setUsers(response.data);
            } catch (error) {
                alert("Error fetching users");
            }
            setLoading(false);
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
            setUsers(users.filter((user) => user.id !== id));
        } catch (error) {
            alert("Error deleting user");
        }
    };

    const handleUserUpdated = (updatedUser) => {
        if (selectedUser) {
            // Updating existing user
            setUsers(
                users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
            );
        } else {
            // Adding a new user
            setUsers([...users, updatedUser]);
        }
        setSelectedUser(null); // Reset selected user after operation
    };

    const handleEdit = (user) => {
        setSelectedUser(user); // Set user for editing
        setModalOpen(true); // Open the modal
    };

    // Generate the next user ID (since the API won't store users)
    const getNextUserId = () => {
        return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="text-black m-5 pt-20 pb-10">

            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Email</th>
                        <th className="py-3 px-6 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-100">
                            <td className="py-3 px-6">{user.name}</td>
                            <td className="py-3 px-6">{user.email}</td>
                            <td className="py-3 px-6">
                                <Link to={`/user/${user.id}`} className="text-blue-500 hover:underline">View</Link>
                                <button
                                    onClick={() => handleEdit(user)}
                                    className="ml-4 text-yellow-500 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="ml-4 text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="bg-transparent text-white px-5 py-3 flex justify-end m-5 border border-white rounded-lg" onClick={() => {
                setSelectedUser(null);
                setModalOpen(true);
            }}>
                Add New User
            </button>

            {/* Modal for creating/updating a user */}
            <CreateUserModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onUserUpdated={handleUserUpdated}
                initialUser={selectedUser}
                nextUserId={getNextUserId()}
            />
        </div>
    );
};

export default UserList;
