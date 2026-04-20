const CategorySkeletonCard = () => {
  return (
    <div className="animate-pulse bg-white rounded-lg shadow overflow-hidden">

      {/* IMAGE */}
      <div className="h-40 bg-gray-300"></div>

      <div className="p-4">
        {/* TITLE */}
        <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>

        {/* DESCRIPTION */}
        <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6 mb-3"></div>

        {/* COUNT */}
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default CategorySkeletonCard;