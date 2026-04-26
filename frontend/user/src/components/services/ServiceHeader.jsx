// import { useParams } from "react-router-dom";
// import Container from "../layout/Container"
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { getServiceByCategory } from "../../services/GetAllServicesApi"
// import HeaderSkeleton from "../ui/HeaderSkeleton";
// import { getOptimizedImage } from "../../utils/getOptimizedImag";
// import { useCategories } from "../../context/CategoryContext";

// const ServiceHeader = () => {
//   const { id } = useParams();
//   const [category, setCategory] = useState({});
//   const [serviceCount, setServiceCount] = useState(0);
//   const [loading, setLoading] = useState(true);


//   const { categories } = useCategories();

//   const foundCategory = categories.find(c => c._id === id);
//   // useEffect(() => {
//   //   const fecthServices = async () => {
//   //      try {
//   //     setLoading(true);

//   //     const res = await getServiceByCategory(id);

//   //     setCategory(res?.data?.data?.category || {});
//   //     setServiceCount(res?.data?.data?.serviceCount || 0);



//   //       setLoading(false);
//   //     // smooth UX

//   //   } catch (error) {
//   //     console.error(error);
//   //     setLoading(false);
//   //   }
//   //   }

//   //   fecthServices();
//   // }, [id])

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         if (categories.length > 0) {
//           const found = categories.find(c => c._id === id);

//           if (found) {
//             setCategory(found);
//             setLoading(false);
//             return; // ✅ no API call needed
//           }
//         }

//         // 🔥 fallback API
//         const res = await getServiceByCategory(id);

//         setCategory(res?.data?.data?.category || null);
//         setServiceCount(res?.data?.data?.serviceCount || 0);

//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id, categories]);

//   if (loading) return <HeaderSkeleton />;

//   return (
//     <>
//       <section className="bg-surface py-8 md:py-12 border-b border-border">
//         <Container>
//           <div className="hidden lg:flex text-sm text-muted font-sans mb-4 flex items-center gap-2 flex-wrap" >
//             <Link to="/" className="hover:text-primary transition">
//               Home
//             </Link>

//             <span>/</span>
//             <Link to="/services" className="hover:text-primary transition">
//               Service
//             </Link>

//             <span>/</span>

//             <span className="text-text font-medium">{category.name}</span>
//           </div>

//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
//             <div className="max-w-xl">
//               <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-text leading-tight">{category.name}</h1>
//               <p className="text-muted mt-3 font-sans">{category.description}</p>

//               {/* <p className="text-muted text-sm mt-2">{serviceCount} services available</p> */}

//               <p className="text-sm my-4">
//                 <span className="bg-accent text-white px-2 py-1 rounded-full font-medium">
//                   {serviceCount}
//                 </span> services available
//               </p>

//               <div className="flex flex-wrap gap-2 mt-4">
//                 <span className="text-xs sm:text-sm bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full">Verified Professionals</span>
//                 <span className="text-xs sm:text-sm bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full">On-time Service</span>
//                 <span className="text-xs sm:text-sm bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full">Affordable Pricing</span>
//               </div>
//             </div>

//             {category.categoryImage && (
//               <div className="hidden lg:block md:w-[320px] h-[180px] rounded-lg overflow-hidden shadow-sm">
//                 <img src={getOptimizedImage(category.categoryImage)} alt={category.name} loading="lazy" className="w-full h-full object-cover" />
//               </div>
//             )}

//           </div>

//         </Container>
//       </section>
//     </>

//   );
// };

// export default ServiceHeader;

import { useParams } from "react-router-dom";
import Container from "../layout/Container";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getServiceByCategory } from "../../services/GetAllServicesApi";
import HeaderSkeleton from "../ui/HeaderSkeleton";
import { getOptimizedImage } from "../../utils/getOptimizedImag";
import { useCategories } from "../../context/CategoryContext";

const ServiceHeader = () => {
  const { id } = useParams();

  // ✅ FIX: null instead of {}
  const [category, setCategory] = useState(null);
  const [serviceCount, setServiceCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const { categories } = useCategories();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // ✅ Try context first
        if (categories?.length) {
          const found = categories.find(c => c._id === id);

          if (found) {
            setCategory(found);
            setServiceCount(found.serviceCount || 0);
            return; // skip API
          }
        }

        // 🔥 Fallback API
        const res = await getServiceByCategory(id);

        setCategory(res?.data?.data?.category || null);
        setServiceCount(res?.data?.data?.serviceCount || 0);

      } catch (error) {
        console.error(error);
        setCategory(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, categories]);

  if (loading) return <HeaderSkeleton />;

  return (
    <>
      <section className="bg-surface py-8 md:py-12 border-b border-border">
        <Container>
          <div className="hidden lg:flex text-sm text-muted font-sans mb-4 flex items-center gap-2 flex-wrap">
            <Link to="/" className="hover:text-primary transition">
              Home
            </Link>

            <span>/</span>

            <Link to="/services" className="hover:text-primary transition">
              Service
            </Link>

            <span>/</span>

            <span className="text-text font-medium">
              {category?.name}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-text leading-tight">
                {category?.name}
              </h1>

              <p className="text-muted mt-3 font-sans">
                {category?.description}
              </p>

              <p className="text-sm my-4">
                <span className="bg-accent text-white px-2 py-1 rounded-full font-medium">
                  {serviceCount}
                </span>{" "}
                services available
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-xs sm:text-sm bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full">
                  Verified Professionals
                </span>
                <span className="text-xs sm:text-sm bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full">
                  On-time Service
                </span>
                <span className="text-xs sm:text-sm bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full">
                  Affordable Pricing
                </span>
              </div>
            </div>

            {category?.categoryImage && (
              <div className="hidden lg:block md:w-[320px] h-[180px] rounded-lg overflow-hidden shadow-sm">
                <img
                  src={getOptimizedImage(category.categoryImage)}
                  alt={category?.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
};

export default ServiceHeader;