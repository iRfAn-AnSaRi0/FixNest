import { useParams } from "react-router-dom";
import Container from "../layout/Container"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getServiceByCategory } from "../../services/GetAllServicesApi"
import HeaderSkeleton from "../ui/HeaderSkeleton";

const ServiceHeader = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const [serviceCount, setServiceCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fecthServices = async () => {
       try {
      setLoading(true);

      const res = await getServiceByCategory(id);

      setCategory(res?.data?.data?.category || {});
      setServiceCount(res?.data?.data?.serviceCount || 0);

      setTimeout(() => {
        setLoading(false);
      }, 600); // smooth UX

    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    }

    fecthServices();
  }, [id])
  
  if (loading) return <HeaderSkeleton />;

  return (
    <>
      <section className="bg-surface py-8 md:py-12 border-b border-border">
        <Container>
          <div className="hidden lg:flex text-sm text-muted font-sans mb-4 flex items-center gap-2 flex-wrap" >
            <Link to="/" className="hover:text-primary transition">
              Home
            </Link>

            <span>/</span>
            <Link to="/services" className="hover:text-primary transition">
              Service
            </Link>

            <span>/</span>

            <span className="text-text font-medium">{category.name}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-text leading-tight">{category.name}</h1>
              <p className="text-muted mt-3 font-sans">{category.description}</p>

              {/* <p className="text-muted text-sm mt-2">{serviceCount} services available</p> */}

              <p className="text-sm my-4">
                <span className="bg-accent text-white px-2 py-1 rounded-full font-medium">
                  {serviceCount}
                </span> services available
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-xs sm:text-sm bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full">Verified Professionals</span>
                <span className="text-xs sm:text-sm bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full">On-time Service</span>
                <span className="text-xs sm:text-sm bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full">Affordable Pricing</span>
              </div>
            </div>

            {category.categoryImage && (
              <div className="hidden lg:block md:w-[320px] h-[180px] rounded-lg overflow-hidden shadow-sm">
                <img src={category.categoryImage} alt={category.name}  loading="lazy" className="w-full h-full object-cover" />
              </div>
            )}

          </div>

        </Container>
      </section>
    </>

  );
};

export default ServiceHeader;