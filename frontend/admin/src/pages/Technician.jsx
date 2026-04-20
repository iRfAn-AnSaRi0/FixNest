import Container from "../components/layout/Container";
import Card from "../components/ui/Card";
import { useState, useEffect } from "react";
import { Technician } from "../services/DashboardApi";

const statusStyles = {
    active: "text-green-600",
    blocked: "text-red-600",
};

const Technicians = () => {
    const [technicians, setTechnicians] = useState([]);

    useEffect(() => {
        const fetchTechnicians = async () => {
            try {
                const res = await Technician();
                console.log(res.data);
                setTechnicians(res.data.data);
            } catch (error) {
                console.error("Error fetching technicians:", error);
            }
        };
        fetchTechnicians();
    }, []);
    return (
        <section className="py-8">
            <Container>
                <Card>

                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-text">
                            Technicians
                        </h2>
                        <button className="text-sm text-primary">
                            Add Technician
                        </button>
                    </div>


                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-[750px] w-full text-sm">

                            {/* Head */}
                            <thead className="text-left text-muted border-b">
                                <tr>
                                    <th className="py-3 px-2 whitespace-nowrap">Name</th>
                                    <th className="px-2 whitespace-nowrap">Phone</th>
                                    <th className="px-2 whitespace-nowrap">Type</th>
                                    <th className="px-2 whitespace-nowrap">Jobs Done</th>
                                    <th className="px-2 whitespace-nowrap">Status</th>
                                    <th className="px-2 whitespace-nowrap">Action</th>
                                </tr>
                            </thead>

                            {/* Body */}
                            <tbody>
                                {technicians.length > 0 ? (
                                    technicians.map((t) => (
                                        <tr key={t._id} className="border-b hover:bg-gray-50">

                                            {/* Name */}
                                            <td className="py-3 px-2 font-medium">
                                                {t.name}
                                            </td>

                                            {/* Phone */}
                                            <td className="px-2">
                                                {t.phone}
                                            </td>

                                            {/* Type */}
                                            <td className="px-2">
                                                {t.technicianType}
                                            </td>

                                            {/* Jobs Done */}
                                            <td className="px-2">
                                                <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">
                                                    {t.completedJobs} / {t.totalJobs}
                                                </span>
                                            </td>

                                            {/* Status */}
                                            <td className={`px-2 ${statusStyles[t.status]}`}>
                                                {t.status}
                                            </td>

                                            {/* Action */}
                                            <td className="px-2">
                                                {t.status === "active" ? (
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
                                        <td colSpan="6" className="text-center py-6 text-muted">
                                            No technicians found
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

export default Technicians;