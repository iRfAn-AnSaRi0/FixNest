import { Link } from "react-router-dom";
import Card from "./Card";

const ServiceCard = ({
  image,
  title,
  description,
  servicesCount,
  path
}) => {
  return (
    <Link to={path || "/"}>
      <Card className="overflow-hidden hover:shadow-card transition duration-300 hover:scale-102 cursor-pointer">

        <div className="w-full h-44 overflow-hidden">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

       
        <div className="p-5 flex flex-col gap-2">

          <h3 className="font-heading text-lg font-semibold text-text">
            {title}
          </h3>

          <p className="text-sm text-muted font-sans line-clamp-2">
            {description}
          </p>

          <p className="text-sm text-primary font-sans font-medium mt-1">
            {servicesCount} services available
          </p>

        </div>

      </Card>
    </Link>
  );
};

export default ServiceCard;