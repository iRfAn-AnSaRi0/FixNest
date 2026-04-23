const FixNestLoader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-[9999]">

      {/* 🔵 Outer Glow Ring */}
      <div className="relative flex items-center justify-center">

        {/* spinning ring */}
        <div
          className="w-20 h-20 rounded-full animate-spin border-4"
          style={{
            borderColor: "#40916C33",
            borderTopColor: "#2D6A4F",
          }}
        />

        {/* inner logo */}
        <div className="absolute flex flex-col items-center justify-center">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: "#2D6A4F" }}
          >
            FN
          </div>
        </div>

      </div>

      {/* 🟢 Brand Name */}
      <h1 className="mt-4 text-2xl font-bold tracking-wide"
        style={{ color: "#2D6A4F" }}
      >
        FixNest
      </h1>

      {/* 🟠 Accent line animation */}
      <div className="mt-2 flex gap-1">
        <span className="w-2 h-2 rounded-full animate-bounce"
          style={{ backgroundColor: "#2D6A4F" }}
        />
        <span className="w-2 h-2 rounded-full animate-bounce delay-150"
          style={{ backgroundColor: "#40916C" }}
        />
        <span className="w-2 h-2 rounded-full animate-bounce delay-300"
          style={{ backgroundColor: "#FF7A00" }}
        />
      </div>

      <p className="text-xs text-muted mt-3">
        Fixing your home services...
      </p>

    </div>
  );
};

export default FixNestLoader;