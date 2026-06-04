import Card from "../ui/Card";
import { useState, useEffect } from "react";
import { Bookings, UpdateBookingStatus } from "../../services/DashboardApi";
import Badge from "../ui/Badges";

const LiveBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await Bookings();
        setBookings(res.data.data);
        // console.log(res.data);

      } catch (error) {
        console.error(error.response);

      }
    }
    fetchBookings();
  }, [])


  // 🔥 status update handler
  const handleStatusChange = async (bookingId, status) => {
    try {
      // console.log("CLICKED:", bookingId, status);
      setLoadingId(bookingId);

      // await UpdateBookingStatus(bookingId, { status });

      const res = await UpdateBookingStatus(bookingId, { status });

      // console.log("SUCCESS:", res.data);


      // update UI instantly (no refresh needed)
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status } : b
        )
      );
    } catch (error) {
      console.error(error?.response?.data);
    } finally {
      setLoadingId(null);
    }
  };


  return (
    <section className="bg-surface py-8">
      <Card>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text">Live Bookings</h2>
          <button className="text-sm text-primary">View All</button>
        </div>

        {/* 🔥 Scroll Container */}
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full text-sm">

            {/* Head */}
            <thead className="text-left text-muted border-b">
              <tr>
                <th className="py-3 px-2 whitespace-nowrap">Id</th>
                <th className="py-3 px-2 whitespace-nowrap">User</th>
                <th className="px-2 whitespace-nowrap">Service</th>
                <th className="px-2 whitespace-nowrap">Location</th>
                <th className="px-2 whitespace-nowrap">Time</th>
                <th className="px-4 whitespace-nowrap">Price</th>
                <th className="px-2 whitespace-nowrap">Status</th>
                <th className="px-2 whitespace-nowrap">Action</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y">
              {bookings.length > 0 ? (
                bookings.map((b) => {

                  const serviceText = b.items
                    ?.map(item =>
                      `${item.service?.category?.name || "Category"} → ${item.service?.name}`
                    )
                    .join(", ");

                  return (
                    <tr key={b._id} className="hover:bg-gray-50 transition">

                      {/* ID */}
                      <td className="py-4 px-4 text-sm font-medium text-gray-900">
                        #{b._id.slice(-5)}
                      </td>

                      {/* User */}
                      <td className="px-4">
                        <p className="text-sm font-medium text-gray-900">
                          {b.user?.name || "Unknown"}
                        </p>
                      </td>

                      {/* Service */}
                      <td className="px-4 max-w-[220px]">
                        <p className="text-sm text-gray-600 truncate">
                          {serviceText || "No service"}
                        </p>
                      </td>

                      {/* Location */}
                      <td className="px-4">
                        <p className="text-sm text-gray-600 truncate max-w-[150px]">
                          {b.address?.street || "N/A"}
                        </p>
                      </td>

                      {/* Time */}
                      <td className="px-4 text-sm text-gray-500">
                        {new Date(b.createdAt).toLocaleTimeString()}
                      </td>

                      {/* Price */}
                      <td className="px-4">
                        <p className="text-sm font-semibold text-gray-900">
                          ₹{b.totalPrice?.toLocaleString() || 0}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-4">
                        <td className="px-4">
                          <Badge status={b.status}/>
                        </td>
                      </td>

                      {/* Action */}
                      <td className="px-4">
                        <div className="flex justify-end">

                          {b.status === "pending" && (
                            <button
                              className="bg-black text-white px-3 py-1.5 rounded-md text-xs font-medium"
                              onClick={() => handleStatusChange(b._id, "technician_assigned")}
                              disabled={loadingId === b._id}
                            >
                              Assign
                            </button>
                          )}

                          {b.status === "technician_assigned" && (
                            <button
                              className="bg-black text-white px-3 py-1.5 rounded-md text-xs font-medium"
                              onClick={() => handleStatusChange(b._id, "accepted")}
                              disabled={loadingId === b._id}
                            >
                              Accept
                            </button>
                          )}

                          {b.status === "accepted" && (
                            <button
                              className="bg-black text-white px-3 py-1.5 rounded-md text-xs font-medium"
                              onClick={() => handleStatusChange(b._id, "in_progress")}
                              disabled={loadingId === b._id}
                            >
                              Start
                            </button>
                          )}


                          {b.status === "in_progress" && (
                            <button
                              className="bg-black text-white px-3 py-1.5 rounded-md text-xs font-medium"
                              onClick={() => handleStatusChange(b._id, "completed")}
                              disabled={loadingId === b._id}
                            >
                              Complete
                            </button>
                          )}

                          {b.status === "completed" && (
                            <span className="text-green-600 text-xs font-semibold">
                              Done
                            </span>
                          )}

                        </div>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-gray-500">
                    No live bookings
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </Card>
    </section>
  );
};

export default LiveBookings;