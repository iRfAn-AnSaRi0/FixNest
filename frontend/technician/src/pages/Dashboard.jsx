import Navbar from "../components/layout/Navbar";
import { techAuth } from "../context/AuthContext";
import Badge from "../components/ui/Badge";
import JobDetails from "../components/sections/JobDetails";
import Container from "../components/layout/Container";
import JobHistory from "../components/sections/JobHistory";

const Dashboard = () => {
    const { user } = techAuth();

    // 🟡 Pending User UI
    if (user?.status === "pending") {
        return (
            <>
                <Navbar />

                <div className="min-h-[80vh] flex items-center justify-center px-4">
                    <div className="w-full max-w-md bg-surface shadow-lg rounded-2xl p-6">

                        {/* HEADER */}
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-heading font-semibold text-text">
                                Account Under Review
                            </h2>

                            <p className="text-sm text-muted font-sans mt-2">
                                Your profile is being reviewed by admin. You’ll be notified once approved.
                            </p>
                        </div>

                        {/* STATUS BADGE */}
                        <div className="flex justify-center mb-6">
                            <Badge status="pending">
                                {user.status}
                            </Badge>
                        </div>

                        {/* USER INFO */}
                        <div className="space-y-3 text-sm">

                            <div className="flex justify-between border-b pb-2">
                                <span className="text-muted">Name</span>
                                <span className="font-medium text-text">{user.name}</span>
                            </div>

                            <div className="flex justify-between border-b pb-2">
                                <span className="text-muted">Phone</span>
                                <span className="font-medium text-text">{user.phone}</span>
                            </div>

                            <div className="flex justify-between border-b pb-2">
                                <span className="text-muted">Role</span>
                                <span className="font-medium text-text capitalize">
                                    {user.role}
                                </span>
                            </div>

                            <div className="flex justify-between border-b pb-2">
                                <span className="text-muted">Technician Type</span>
                                <span className="font-medium text-text">
                                    {user.technicianType}
                                </span>
                            </div>

                        </div>

                        {/* FOOTER NOTE */}
                        <div className="mt-6 text-xs text-center text-muted">
                            This usually takes a few hours. Please wait patiently.
                        </div>

                    </div>
                </div>
            </>
        );
    }

    // 🟢 Approved User UI
    return (
        <>
            <Navbar />
            <Container>


                <JobDetails />

                <JobHistory />

            </Container>




        </>
    );
};

export default Dashboard;