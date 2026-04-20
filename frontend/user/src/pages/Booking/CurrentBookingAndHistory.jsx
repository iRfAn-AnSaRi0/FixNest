import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../../components/layout/Container";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { useBooking } from "../../context/BookingContext";
import Model from "../../components/ui/Model"
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const CurrentBookingAndHistory = () => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const tab = searchParams.get("tab") || "current";

  const {
    currentBooking,
    history,
    loading,
    fetchCurrentBooking,
    fetchHistory,
    cancelBookingApi,
  } = useBooking();

  const handleTabChange = (value) => {
    setSearchParams({ tab: value });
  };

  // ✅ Call API based on tab (only once because of caching)
  useEffect(() => {
    if (tab === "current") {
      fetchCurrentBooking();
    } else {
      fetchHistory();
    }
  }, [tab]);

  // const confirmCancelBooking = async (id) => {
  //   if (!selectedId) return;

  //   await cancelBookingApi(selectedId);

  //   setShowCancelModal(false);
  //   setSelectedId(null);

  // };

  const confirmCancelBooking = async () => {
  if (!selectedId) return;

  try {
    await cancelBookingApi(selectedId);

    toast.success("Booking cancelled successfully ✅");

    setShowCancelModal(false);
    setSelectedId(null);

  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to cancel booking ❌"
    );
  }
};

  // ✅ Select correct data
  const bookings = tab === "current" ? currentBooking : history;

  return (
    <section className="bg-surface min-h-screen pt-8 pb-16">
      <Container>
        <div className="text-sm text-muted font-sans mb-6 flex items-center gap-2 flex-wrap">

          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>

          <span>/</span>

          <span className="text-text font-medium">
            {tab === "current" ? "My Booking" : "History"}
          </span>

        </div>
        {/* 🔥 HEADER */}
        <h1 className="font-heading text-2xl font-semibold text-text mb-6">
          My Bookings
        </h1>

        {/* 🔘 TABS */}
        <div className="flex gap-3 mb-8">
          <Button
            variant={tab === "current" ? "accent" : "outline"}
            onClick={() => handleTabChange("current")}
          >
            Current
          </Button>

          <Button
            variant={tab === "history" ? "accent" : "outline"}
            onClick={() => handleTabChange("history")}
          >
            History
          </Button>
        </div>

        {/* ⏳ LOADING */}
        {loading && <p className="text-muted">Loading...</p>}

        {/* 📦 LIST */}
        <div className="space-y-8">

          {bookings?.length === 0 && !loading && (
            <p className="text-muted">No bookings found</p>
          )}

          {bookings?.map((item) => (
            <div
              key={item._id || item.id}
              className="border border-border rounded-lg p-5 bg-background"
            >

              {/* 🧰 SERVICE INFO */}
              <div className="space-y-1">
                <h4 className="font-heading font-semibold text-text">
                  {item?.items?.length > 0
                    ? item.items.map(i => i.service?.name).join(", ")
                    : "Service"}
                </h4>

                <p className="text-sm text-muted">
                  {item.problemDescription || "Service booked"}
                </p>

                <p className="text-sm text-muted">
                  ⏱ {item?.items?.length > 0
                    ? item.items.map(i => i.estimateTime).join(", ")
                    : "—"}
                </p>

                <p className="text-sm font-medium text-text">
                  ₹{item.totalPrice}
                </p>

                <Badge status={item.status} className="mt-1" >
                  {item.status}
                </Badge>
              </div>
              {/* 🔹 RIGHT SIDE (date & time) */}
              <div className="mt-5">

                <p className="text-xs text-muted pb-[2px]">
                  Date: {new Date(item.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                <p className="text-xs text-muted">
                  Time: {new Date(item.createdAt).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

              </div>

              {/* 👨‍🔧 TECHNICIAN */}
              <div className="mt-2 border-t border-border pt-4">

                <h4 className="font-heading text-sm font-semibold text-text mb-2">
                  Technician Info
                </h4>

                {item.technician ? (
                  <div className="space-y-1 text-sm">
                    <p className="text-text">
                      {item.technician.name}
                    </p>

                    <p className="text-muted">
                      {item.technician.phone}
                    </p>

                    {/* ✅ Show only if NOT completed */}
                    {item.status !== "completed" && (
                      <Button size="sm" variant="outline" className="mt-2">
                        Call Now
                      </Button>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted">
                    Technician will be assigned soon
                  </p>
                )}

              </div>

              {/* 🔘 ACTIONS */}
              <div className="flex gap-3 mt-5">

                {/* ❌ hide cancel in history */}
                {tab === "current" &&
                  !["completed", "cancelled"].includes(item.status) && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedId(item._id);
                        setShowCancelModal(true);
                      }}

                    >
                      Cancel
                    </Button>
                  )}

                <Button size="sm"
                  variant="accent"
                  onClick={() => {
                    setSelectedBooking(item);
                    setShowDetailsModal(true);
                  }}>
                  View Details
                </Button>

              </div>

            </div>
          ))}

        </div>

        <Model open={showCancelModal} onClose={() => setShowCancelModal(false)}>

          <h3 className="font-heading text-lg font-semibold text-text mb-2">
            Cancel Booking?
          </h3>

          <p className="text-sm text-muted mb-4">
            Are you sure you want to cancel this booking?
          </p>

          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => setShowCancelModal(false)}
            >
              No
            </Button>

            <Button
              variant="accent"
              onClick={confirmCancelBooking}
            >
              Yes, Cancel
            </Button>
          </div>

        </Model>



        <Model open={showDetailsModal} onClose={() => setShowDetailsModal(false)}>
          {selectedBooking && (

            <div className="flex flex-col max-h-[80vh]">

              {/* 🔥 HEADER */}
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <h2 className="font-heading text-lg font-semibold">
                  Booking Details
                </h2>

                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-muted hover:text-text text-xl"
                >
                  ✕
                </button>
              </div>

              {/* 🔥 BODY */}
              <div className="mt-4 space-y-5 text-sm overflow-y-auto pr-1 custom-scroll">

                {/* 🔹 SERVICE */}
                <div>
                  <p className="text-muted">Service</p>
                  <p className="text-text font-medium">
                    {selectedBooking?.items?.map(i => i.service?.name).join(", ")}
                  </p>
                </div>

                {/* 🔹 STATUS */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted">Status</p>
                    <Badge status={selectedBooking.status}>
                      {selectedBooking.status.replace("_", " ")}
                    </Badge>
                  </div>

                  <div className="text-right">
                    <p className="text-muted text-xs">Booking ID</p>
                    <p className="text-xs">{selectedBooking._id}</p>
                  </div>
                </div>

                {/* 🔹 DATE & TIME */}
                <div className="flex gap-6">
                  <div>
                    <p className="text-muted">Date</p>
                    <p>
                      {new Date(selectedBooking.createdAt).toLocaleDateString("en-IN")}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted">Time</p>
                    <p>
                      {new Date(selectedBooking.createdAt).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                {/* 🔹 ADDRESS */}
                <div>
                  <p className="text-muted">Address</p>
                  <p>
                    {selectedBooking.address?.street}, {selectedBooking.address?.city},{" "}
                    {selectedBooking.address?.state} - {selectedBooking.address?.pincode}
                  </p>
                </div>

                {/* 🔹 PROBLEM */}
                <div>
                  <p className="text-muted">Problem Description</p>
                  <p>{selectedBooking.problemDescription}</p>
                </div>

                {/* 🔹 TECHNICIAN */}
                <div className="border-t border-border pt-4">
                  <p className="text-muted mb-2">Technician Details</p>

                  {selectedBooking.technician ? (
                    <div className="space-y-1">
                      <p className="font-medium">
                        {selectedBooking.technician.name}
                      </p>
                      <p className="text-muted text-sm">
                        {selectedBooking.technician.phone}
                      </p>
                    </div>
                  ) : (
                    <p className="text-muted">(Not assigned yet)</p>
                  )}
                </div>

                {/* 🔹 PRICE */}
                <div className="border-t border-border pt-4">
                  <p className="text-muted">Price Details</p>

                  <div className="flex justify-between mt-1">
                    <span>Service Total</span>
                    <span>₹{selectedBooking.totalPrice}</span>
                  </div>

                  <div className="flex justify-between font-semibold mt-2">
                    <span>Total</span>
                    <span>₹{selectedBooking.totalPrice}</span>
                  </div>
                </div>

              </div>

            </div>

          )}
        </Model>

      </Container>
    </section>
  );
};

export default CurrentBookingAndHistory;



