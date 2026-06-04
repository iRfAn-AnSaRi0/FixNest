import Card from "../ui/Card";
import { useEffect, useState } from "react";
import { History } from "../../services/DashboardApi";
import Badge from "../ui/Badges";

const RecentCompleted = () => {

  const [completedBookings, setCompletedBookings] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await History();
        // console.log(res.data);
        setCompletedBookings(res.data.data);

      } catch (error) {
        console.error(error.response);
      }
    }
    fetchHistory();
  }, []);

  return (
    <section className="bg-surface py-8">
      <Card>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text">
            Recent Completed
          </h2>
          <button className="text-sm text-primary">View All</button>
        </div>

        {/* 🔥 Scroll Container */}
        <div className="overflow-x-auto">
          <table className="min-w-[600px] w-full text-sm">

            {/* Head */}
            <thead className="text-left text-muted border-b">
              <tr>
                <th className="px-2 whitespace-nowrap">Id</th>
                <th className="py-3 px-2 whitespace-nowrap">User</th>
                <th className="px-2 whitespace-nowrap">Service</th>
                <th className="px-2 whitespace-nowrap">Location</th>
                <th className="px-2 whitespace-nowrap">Technician</th>
                <th className="px-2 whitespace-nowrap">Status</th>
                <th className="px-2 whitespace-nowrap">Time</th>
                <th className="px-2 whitespace-nowrap">Amount</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {completedBookings.length > 0 ? (
                completedBookings.map((b) => {

                  const serviceText = b.items
                    .map(item => `${item.service.category?.name} → ${item.service?.name}`)
                    .join(", ");

                  return (
                    <tr key={b._id} className="border-b hover:bg-gray-50">

                      <td className="px-2">
                        #{b._id.slice(-5)}
                      </td>

                      <td className="py-3 px-2 font-medium text-text whitespace-nowrap">
                        {b.user?.name || "User"}
                      </td>

                      <td className="px-2 whitespace-nowrap">
                        {serviceText}
                      </td>

                      {/* Location */}
                      <td className="px-4">
                        {b.address?.street || "N/A"}
                      </td>

                      <td className="px-2 whitespace-nowrap">
                        {b.technician?.name || "—"}
                      </td>

                      <td className="px-2">
                        <td className="px-2">
                          <Badge status={b.status} />
                        </td>
                      </td>

                      <td className="px-2 whitespace-nowrap">
                       {new Date(b.completedAt).toLocaleString()}
                      </td>



                      <td className="px-2 whitespace-nowrap text-success font-medium">
                        ₹{b.totalPrice}
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-muted">
                    No completed bookings
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

export default RecentCompleted;