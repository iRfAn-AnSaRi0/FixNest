import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { getAllBooking } from "../../services/BookingDetailsApi";
import { updateStatus } from "../../services/StatusApi";
import { useState, useEffect } from "react";

const JobDetails = () => {

  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await getAllBooking();
        console.log(res.data.data);

        // ✅ Only show current (NOT completed)
        const activeJobs = res.data.data.filter(
          (job) => job.status !== "completed"
        );

        setDetails(activeJobs);

      } catch (error) {
        console.error(error.response);
      }
    };

    fetchDetails();
  }, []);

  const updateStatushandle = async (bookingId, status) => {
    try {
      const res = await updateStatus(bookingId, { status });
      console.log(res.data);

      setDetails((prev) =>
        prev
          .map((job) =>
            job._id === bookingId
              ? { ...job, status }
              : job
          )
          // ✅ REMOVE when completed
          .filter((job) => job.status !== "completed")
      );

    } catch (error) {
      console.error(error);
    }
  };

  return (
   <section className="bg-surface pt-8 pb-16">

      {/* 🔥 HEADING */}
      <h1 className="text-xl md:text-2xl font-heading font-semibold text-text mb-6">
        Current Jobs
      </h1>

      {details.length === 0 ? (
        <p className="text-center text-muted">No active jobs</p>
      ) : (
        <div className="space-y-5">

          {details.map((detail) => (
            <div
              key={detail._id}
              className="bg-surface border border-border rounded-2xl shadow-card p-5"
            >

              {/* 🔹 HEADER */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-text">
                    {detail.items?.[0]?.service?.name || "Service"}
                  </h2>

                  <p className="text-sm text-muted mt-1">
                    {detail.problemDescription}
                  </p>
                </div>
              </div>

              {/* 🔹 PRICE + STATUS */}
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted">Total Price</p>
                  <p className="text-lg font-bold text-primary">
                    ₹{detail.totalPrice}
                  </p>
                </div>

                <Badge status={detail.status}>
                  {detail.status.replace("_", " ")}
                </Badge>
              </div>

              {/* 🔹 USER DETAILS */}
              <div className="border-t border-border pt-4 mt-4">
                <h3 className="text-sm font-semibold mb-2 text-text">
                  Customer Details
                </h3>

                <div className="text-sm space-y-1">
                  <p><b>Name:</b> {detail.user?.name}</p>
                  <p><b>Phone:</b> {detail.user?.phone}</p>
                  <p>
                    <b>Address:</b>{" "}
                    {detail.address?.street}, {detail.address?.city},{" "}
                    {detail.address?.state} - {detail.address?.pincode}
                  </p>
                </div>
              </div>

              {/* 🔹 ACTION BUTTONS */}
              <div className="flex gap-3 mt-5 flex-wrap">

                <a href={`tel:${detail.user?.phone}`}>
                  <Button variant="outline">Call</Button>
                </a>

                {detail.status === "technician_assigned" && (
                  <Button
                    variant="accent"
                    onClick={() => updateStatushandle(detail._id, "accepted")}
                  >
                    Accept
                  </Button>
                )}

                {detail.status === "accepted" && (
                  <Button
                    variant="info"
                    onClick={() => updateStatushandle(detail._id, "in_progress")}
                  >
                    Start
                  </Button>
                )}

                {detail.status === "in_progress" && (
                  <Button
                    variant="success"
                    onClick={() => updateStatushandle(detail._id, "completed")}
                  >
                    Complete
                  </Button>
                )}

              </div>

            </div>
          ))}

        </div>
      )}
  </section>
  );
};

export default JobDetails;