import Container from "../layout/Container";
import ServiceCard from "../ui/ServiceCard";
import CategorySkeletonCard from "../ui/CategorySkeletonCard";
import { useCategories } from "../../context/CategoryContext";
import { getOptimizedImage } from "../../utils/getOptimizedImag";


const ServiceCategories = () => {

  const { categories = [], loading} = useCategories()

  return (
    <section className="py-20 bg-background">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text">
            Explore Home Services
          </h2>

          <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded"></div>

          <p className="text-muted mt-4 font-sans">
            Choose from a wide range of trusted home services and book
            experienced professionals in just a few clicks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">

          {loading ? (
            // 🔥 Skeleton
            Array.from({ length: 6 }).map((_, i) => (
              <CategorySkeletonCard key={i} />
            ))
          ) : categories.length > 0 ? (
            // ✅ Real data
            categories.map((category, index) => (
              <ServiceCard
                key={index}
                image={getOptimizedImage(category.categoryImage)}
                title={category.name}
                description={category.description}
                servicesCount={category.serviceCount}
                path={`/services/${category.name.toLowerCase().replace(/\s+/g, "-")}/${category._id}`}
              />
            ))
          ) : (
            // ❌ No data
            <p className="col-span-full text-center text-muted">
              No categories available
            </p>
          )}

        </div>
      </Container>
    </section>
  );
};

export default ServiceCategories;
