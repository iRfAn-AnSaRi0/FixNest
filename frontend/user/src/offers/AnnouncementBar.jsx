import * as MarqueeModule from "react-fast-marquee";

const Marquee = MarqueeModule.default.default;

import { Phone, MessageCircle, Sparkles, MapPin } from "lucide-react";

const AnnouncementBar = () => {
  return (
    <div className="bg-accent border-b border-accent text-white text-xs md:text-sm font-medium">
      <Marquee
        speed={40}
        gradient={false}
        pauseOnHover
        pauseOnClick
        autoFill
      >
        <div className="flex items-center gap-10 py-1.5 pr-10">

          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-yellow-300" />
            <span>
              <strong>🎉 New Customer Offer:</strong> Get{" "}
              <strong>10% OFF</strong> on Your First Service
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>Serving Gangtok</span>
          </div>

          <a
            href="tel:+918392092388"
            className="flex items-center gap-2 hover:text-yellow-300 transition-colors duration-200"
          >
            <Phone size={14} />
            <span>Call: +91 83920 92388</span>
          </a>

          <a
            href="https://wa.me/918001652981?text=Hi%20FixNest!%20I%20would%20like%20to%20book%20a%20home%20service.%20Please%20help%20me."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-green-300 transition-colors duration-200"
          >
            <MessageCircle size={14} />
            <span>WhatsApp Booking</span>
          </a>

          <div className="flex items-center gap-2">
            <span>✔ Verified Professionals</span>
          </div>

          <div className="flex items-center gap-2">
            <span>⚡ Fast Response</span>
          </div>

        </div>
      </Marquee>
    </div>
  );
};

export default AnnouncementBar;