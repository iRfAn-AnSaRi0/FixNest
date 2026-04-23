import { useParams } from "react-router-dom";
import Container from "../layout/Container";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { getServiceByCategory } from "../../services/GetAllServicesApi"
import ServiceSkeletonCard from "../ui/ServiceSkeletonCard"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ServiceList = () => {
  const { name, id } = useParams();
  const [service, setService] = useState([]);
  const [loading, setLoading] = useState(false)
  const { user, setOpenAuth, setAuthType, setRedirectData } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const fecthServices = async () => {
      try {
        setLoading(true)
        const res = await getServiceByCategory(id)

        const data = res?.data?.data?.services || []

        setService(data)

        setTimeout(() => {
          setLoading(false);
        }, 600);

      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fecthServices();
  }, [id])

  return (
    <section className="pt-7 pb-12">
      <div className=" lg:hidden px-4 text-sm text-muted font-sans mb-5 flex items-center gap-2 flex-wrap" >
        <Link to="/" className="hover:text-primary transition">
          Home
        </Link>

        <span>/</span>
        <Link to="/services" className="hover:text-primary transition">
          Service
        </Link>

        <span>/</span>

        <span className="text-text font-medium">{name.replace(/-/g, " ")}</span>
      </div>
      <Container>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {loading ? (
            // 🔥 Skeleton
            Array.from({ length: 8 }).map((_, i) => (
              <ServiceSkeletonCard key={i} />
            ))
          ) : service.length > 0 ? (
            // ✅ Real data
            service.map((services, index) => (
              <Card
                key={index}
                className="p-xs overflow-hidden group hover:shadow-card transition duration-300 flex flex-col"
              >

                {/* IMAGE */}
                <div className="h-40 overflow-hidden">
                  <img
                    src={services.serviceImage}
                    alt={services.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                <div className="p-4 flex flex-col flex-1">

                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded w-fit font-heading">
                    {name.replace(/-/g, " ")}
                  </span>

                  <h3 className="font-heading text-lg font-semibold text-text mt-2">
                    {services.name}
                  </h3>

                  <p className="text-xs text-muted mt-1 font-sans">
                    ⏱ {services.estimateTime}
                  </p>

                  <p className="text-sm text-muted mt-1 line-clamp-2 font-sans">
                    {services.description}
                  </p>

                  <div className="mt-auto pt-2">

                    <div className="flex items-center gap-2 font-sans">

                      {services.originalPrice && (
                        <span className="text-sm text-muted line-through">
                          {services.originalPrice}
                        </span>
                      )}

                      <span className="text-lg font-bold text-text">
                        ₹{services.price}
                      </span>

                    </div>

                    <p className="text-xs text-muted mt-1 font-sans">
                      * Visiting charges may apply
                    </p>

                    <Button variant="accent" className="w-full mt-3"
                      onClick={() => {
                        if (!user) {
                          setAuthType("login"); // 👈 open login
                          setRedirectData({
                            path: `/booking/${services._id}`,
                            state: { services }   // 👈 store service here
                          });
                          setOpenAuth(true);      // 👈 show modal
                        } else {
                          navigate(`/booking/${services._id}`, { state: { services } })
                        }
                      }}>
                      Book Now
                    </Button>
                    {/* {
                        navigate(`/booking/${services._id}`, { state: { services } })} */}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            // ❌ No data
            <p className="col-span-full text-center text-muted">
              No service available
            </p>
          )}

        </div>
      </Container>
    </section>
  );
};

export default ServiceList;