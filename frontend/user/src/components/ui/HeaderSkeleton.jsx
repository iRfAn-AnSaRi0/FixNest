import Container from "../layout/Container";


const HeaderSkeleton = () => {
  return (
    <section className="bg-surface py-8 md:py-12 border-b border-border animate-pulse">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">

          <div className="max-w-xl">

            {/* TITLE */}
            <div className="h-8 w-3/4 bg-gray-300 rounded mb-3"></div>

            {/* DESCRIPTION */}
            <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-5/6 bg-gray-300 rounded mb-4"></div>

            {/* COUNT */}
            <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>

            {/* TAGS */}
            <div className="flex gap-2">
              <div className="h-6 w-24 bg-gray-300 rounded-full"></div>
              <div className="h-6 w-28 bg-gray-300 rounded-full"></div>
              <div className="h-6 w-32 bg-gray-300 rounded-full"></div>
            </div>

          </div>

          {/* IMAGE */}
          <div className="hidden lg:block md:w-[320px] h-[180px] bg-gray-300 rounded-lg"></div>

        </div>
      </Container>
    </section>
  );
};

export default HeaderSkeleton;