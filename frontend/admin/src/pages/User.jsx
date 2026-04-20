import Container from "../components/layout/Container";
import Card from "../components/ui/Card";
import { useState, useEffect } from "react";
import { User } from "../services/DashboardApi";

const statusStyles = {
    active: "text-green-600",
    blocked: "text-red-600",
};

const Users = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await User();
                setUsers(res.data.data);

            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <section className="py-8">
            <Container>
                <Card>

                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-text">Users</h2>
                        <button className="text-sm text-primary">Add User</button>
                    </div>

                    {/* 🔍 Optional Search (add later) */}
                    {/* <input placeholder="Search users..." className="mb-4 w-full border p-2 rounded-md" /> */}

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-[650px] w-full text-sm">

                            {/* Head */}
                            <thead className="text-left text-muted border-b">
                                <tr>
                                    <th className="py-3 px-2 whitespace-nowrap">Name</th>
                                    <th className="px-2 whitespace-nowrap">Phone</th>
                                    <th className="px-2 whitespace-nowrap">Bookings</th>
                                    <th className="px-2 whitespace-nowrap">Status</th>
                                    <th className="px-2 whitespace-nowrap">Action</th>
                                </tr>
                            </thead>

                            {/* Body */}
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((u) => (
                                        <tr key={u._id} className="border-b hover:bg-gray-50">

                                            {/* Name */}
                                            <td className="py-3 px-2 font-medium text-text">
                                                {u.name}
                                            </td>

                                            {/* Phone */}
                                            <td className="px-2">
                                                {u.phone}
                                            </td>

                                            {/* Bookings (not in your data yet) */}
                                            <td className="px-2">
                                              {u.bookingsCount || 0}
                                            </td>

                                            {/* Status */}
                                            <td className={`px-2 ${statusStyles[u.status]}`}>
                                                {u.status}
                                            </td>

                                            {/* Action */}
                                            <td className="px-2">
                                                {u.status === "active" ? (
                                                    <button className="text-red-500 text-sm hover:underline">
                                                        Block
                                                    </button>
                                                ) : (
                                                    <button className="text-green-600 text-sm hover:underline">
                                                        Activate
                                                    </button>
                                                )}
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-6 text-muted">
                                            No users found
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>

                </Card>
            </Container>
        </section>
    );
};

export default Users;