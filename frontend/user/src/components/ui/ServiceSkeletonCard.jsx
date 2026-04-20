const ServiceSkeletonCard = () => {
  return (
    <div className="animate-pulse bg-white rounded-lg shadow overflow-hidden">
      <div className="h-40 bg-gray-300"></div>

      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded w-24 mb-3"></div>
        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6 mb-4"></div>

        <div className="h-5 bg-gray-300 rounded w-20 mb-3"></div>
        <div className="h-10 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );
};

export default ServiceSkeletonCard;