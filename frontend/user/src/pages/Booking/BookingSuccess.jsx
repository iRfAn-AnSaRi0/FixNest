import Model from "../../components/ui/Model";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../../context/BookingContext";

const BookingSuccess = ({ open, onClose, booking }) => {
  const navigate = useNavigate();
  
  const {fetchCurrentBooking} = useBooking();

  return (
    <Model open={open} onClose={onClose}>

      <div className="text-center">

        {/* ✅ SUCCESS ICON */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl animate-bounce">
            ✅
          </div>
        </div>

        {/* 🎉 TITLE */}
        <h2 className="font-heading text-2xl font-bold text-text mt-4">
          Booking Confirmed 🎉
        </h2>

        <p className="text-sm text-muted mt-1">
          Your service has been successfully booked
        </p>

        {/* 📦 SERVICE CARD */}
        <div className="mt-6 border border-border rounded-2xl p-5 bg-gradient-to-br from-white to-gray-50 shadow-sm">

          {/* SERVICE NAME */}
          <h3 className="font-heading font-semibold text-lg text-text">
            {booking?.serviceName}
          </h3>

          {/* DATE + TIME */}
          <div className="mt-3 flex justify-between text-sm text-muted">
            <span>📅 {booking?.date}</span>
            <span>🕒 {booking?.time}</span>
          </div>

          {/* DIVIDER */}
          <div className="border-t border-border my-3" />

          {/* PRICE */}
          <div className="flex justify-between items-center">

            <span className="text-sm text-muted">
              Total Paid
            </span>

            <div className="flex items-center gap-2">
              {booking?.originalPrice && (
                <span className="text-sm text-muted line-through">
                  ₹{booking?.originalPrice}
                </span>
              )}

              <span className="text-xl font-bold text-text">
                ₹{booking?.price || 199}
              </span>
            </div>

          </div>

        </div>

        {/* INFO */}
        <div className="mt-5 text-sm text-muted space-y-1">
          <p>👨‍🔧 Technician will contact you shortly</p>
          <p className="text-xs">* Visiting charges may apply</p>
        </div>

        {/* 🔘 ACTIONS */}
        <div className="mt-6 space-y-3">

          <Button
            variant="accent"
            className="w-full py-3 text-base font-semibold"
            onClick={() => {
              navigate("/my-bookings?tab=current");
              onClose();
              fetchCurrentBooking(true);
            }}
          >
            View My Bookings
          </Button>

          <Button
            variant="ghost"
            className="w-full py-3"
            onClick={onClose}
          >
            Close
          </Button>

        </div>

      </div>

    </Model>
  );
};

export default BookingSuccess;