import { useEffect, useState } from "react";
import { getBookingHistory } from "../../services/BookingDetailsApi";
import Container from "../layout/Container";
import Badge from "../ui/Badge";

const JobHistory = () => {
    const [jobs, setJobs] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await getBookingHistory();

                console.log("HISTORY DATA:", res.data); // ✅ debug

                setJobs(res.data.data); // ✅ NO FILTER
            } catch (error) {
                console.error(error);
            }
        };

        fetchJobs();
    }, []);

    const groupedJobs = jobs.reduce((acc, job) => {
        const date = new Date(job.booking?.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        if (!acc[date]) acc[date] = [];
        acc[date].push(job);

        return acc;
    }, {});

    const dates = Object.keys(groupedJobs);

    return (
       <section className="bg-surface pt-8 pb-16">
                <h1 className="text-2xl font-heading font-semibold mb-6">
                    Job History
                </h1>

                {/* 🔥 JOB LIST */}
                <div className="space-y-8 relative">

                    {dates.length === 0 && (
                        <p className="text-muted">No history found</p>
                    )}

                    {dates.map((date, index) => {
                        const jobsForDay = groupedJobs[date];

                        return (
                            <div key={date}>
                                {/* 📅 DATE */}
                                <h2 className="text-sm text-muted mb-3">{date}</h2>

                                <div className="space-y-4">
                                    {jobsForDay
                                        .slice(0, showAll ? jobsForDay.length : 3)
                                        .map((job) => (
                                            <div
                                                key={job._id}
                                                className="border border-border rounded-xl p-4 bg-background"
                                            >

                                                <p className="text-sm text-muted">
                                                    {job.booking?.problemDescription}
                                                </p>

                                                <div className="mt-2">
                                                    <Badge status={job.booking?.status}>
                                                        {job.booking?.status?.replaceAll("_", " ")}
                                                    </Badge>
                                                </div>

                                                <div className="mt-3 flex justify-between items-center text-sm">
                                                    <div>
                                                        <p className="text-muted text-xs">Total Price</p>
                                                        <p className="font-semibold text-text">
                                                            ₹{job.booking?.totalPrice}
                                                        </p>
                                                    </div>

                                                    <div className="text-right">
                                                        <p className="text-muted text-xs">Your Earning</p>
                                                        <p className="font-semibold text-success">
                                                            ₹{job.technicianEarning}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* 🔹 VIEW DETAILS */}
                                                <p
                                                    className="text-accent text-sm mt-3 cursor-pointer hover:underline"
                                                    onClick={() => {
                                                        console.log("view details", job._id);
                                                    }}
                                                >
                                                    View details
                                                </p>

                                            </div>
                                        ))}
                                </div>
                            </div>
                        );
                    })}

                    {/* 🔥 FADE EFFECT */}
                    {!showAll && jobs.length > 3 && (
                        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
                    )}
                </div>

                {/* 🔘 VIEW MORE */}
                {!showAll && jobs.length > 3 && (
                    <div className="text-center mt-6">
                        <button
                            onClick={() => setShowAll(true)}
                            className="text-accent hover:underline text-sm"
                        >
                            View More
                        </button>
                    </div>
                )}
          </section>
    );
};

export default JobHistory;