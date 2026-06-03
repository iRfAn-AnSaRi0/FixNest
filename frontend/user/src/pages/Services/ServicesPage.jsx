import { useState, useEffect } from "react";
import Container from "../../components/layout/Container";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Link } from "react-router-dom"
import { getService } from "../../services/GetAllServicesApi";
import ServiceSkeletonCard from "../../components/ui/ServiceSkeletonCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getOptimizedImage } from "../../utils/getOptimizedImag";
import { Helmet } from 'react-helmet-async';

const ServicesPage = () => {

  const [service, setService] = useState([])
  const [loading, setLoading] = useState(true);
  const { user, setOpenAuth, setAuthType, setRedirectData } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        const res = await getService();
        const data = res?.data?.data || [];
        setService(data);

        setLoading(false);

      } catch (error) {
        console.error(error);
        setService([]);
        setLoading(false);

      }
    }
    fetchServices()
  }, [])

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");


  const categories = [
    ...new Set(service.map(s => s.category?.name?.toLowerCase()))
  ];

  const filtered = service.filter((item) => {
    const searchWords = search.toLowerCase().split(" ");

    const matchesSearch = searchWords.every((word) =>
      item.name?.toLowerCase().includes(word)
    );

    const matchesCategory =
      activeCategory === "all" ||
      item.category?.name?.toLowerCase() === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const displayServices = filtered.length > 0 ? filtered : service;

  return (
    <>
      <Helmet>
        <title>Home Services in Gangtok | FixNest</title>
        <meta
          name="description"
          content="Explore electrical, plumbing, appliance repair and other home services available through FixNest in Gangtok."
        />
      </Helmet>
      <section className="pt-8 pb-16 bg-surface">

        <Container>

          <div className="text-sm text-muted font-sans mb-6 flex items-center gap-2 flex-wrap">

            <Link to="/" className="hover:text-primary transition">
              Home
            </Link>

            <span>/</span>

            <span className="text-text font-medium">
              Services
            </span>

          </div>

          {/* 🔥 HEADER */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-text">
              All Services
            </h1>

            <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded"></div>

            <p className="text-muted mt-4 font-sans">
              Explore all available home services and book professionals easily
            </p>
          </div>


          {/* 🔍 FILTER BAR */}
          <div className="mb-10">

            <div className="bg-background border border-border rounded-xl p-4 shadow-sm">

              {/* TOP ROW */}
              <div className="flex flex-col md:flex-row md:items-center gap-4">

                {/* SEARCH */}
                <div className="relative w-full md:max-w-xs">

                  <Input
                    type="text"
                    placeholder="Search services..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-11 pl-10 pr-3 border border-border rounded-lg text-base focus:outline-none focus:border-primary"
                  />

                  {/* SEARCH ICON */}
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">
                    🔍
                  </span>

                </div>

                {/* CATEGORY SCROLL (IMPORTANT FIX) */}
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                  {/* ALL BUTTON */}
                  <Button
                    variant={activeCategory === "all" ? "primary" : "outline"}
                    size="sm"
                    className="whitespace-nowrap"
                    onClick={() => setActiveCategory("all")}
                  >
                    All
                  </Button>

                  {/* DYNAMIC CATEGORIES */}
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      variant={activeCategory === cat ? "primary" : "outline"}
                      size="sm"
                      className="whitespace-nowrap"
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </Button>
                  ))}

                </div>

              </div>

            </div>

          </div>

          {/* 📦 SERVICES GRID */}
          {loading ? (
            // 🔥 Skeleton FIRST
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ServiceSkeletonCard key={i} />
              ))}
            </div>
          ) : displayServices.length > 0 ? (
            // ✅ Show filtered OR all services
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayServices.map((service, index) => (
                <Card
                  key={index}
                  className="p-xs overflow-hidden group hover:shadow-card transition duration-300 flex flex-col"
                >
                  {/* IMAGE */}
                  <div className="h-40 rounded-t-md overflow-hidden">
                    <img
                      src={getOptimizedImage(service.serviceImage)}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-1">

                    {/* CATEGORY */}
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded w-fit font-heading">
                      {service.category.name}
                    </span>

                    {/* TITLE */}
                    <h3 className="font-heading text-lg font-semibold text-text mt-2">
                      {service.name}
                    </h3>

                    {/* DURATION */}
                    <p className="text-xs text-muted mt-1 font-sans">
                      ⏱ {service.estimateTime}
                    </p>

                    {/* DESCRIPTION */}
                    <p className="text-sm text-muted mt-1 line-clamp-2 font-sans">
                      {service.description}
                    </p>

                    {/* BOTTOM */}
                    <div className="mt-auto pt-2">

                      {/* PRICE */}
                      <div className="flex items-center gap-2 font-sans">
                        {service.originalPrice && (
                          <span className="text-sm text-muted line-through">
                            {service.originalPrice}
                          </span>
                        )}

                        <span className="text-lg font-bold text-text">
                          ₹{service.price}
                        </span>
                      </div>

                      <p className="text-xs text-muted mt-1 font-sans">
                        * Visiting charges may apply
                      </p>

                      {/* BUTTON */}
                      <Button variant="accent" className="w-full mt-3"
                        onClick={() => {
                          if (!user) {
                            setAuthType("login"); // 👈 open login
                            setRedirectData({
                              path: `/booking/${service._id}`,
                              state: { service }   // 👈 store service here
                            });
                            setOpenAuth(true);      // 👈 show modal
                          } else {
                            navigate(`/booking/${service._id}`, { state: { service } });
                          }
                        }}>
                        Book Now
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            // ❌ No result (after loading)
            <p className="text-center text-muted">No services found</p>
          )}
        </Container>
      </section>
    </>

  );
};

export default ServicesPage;