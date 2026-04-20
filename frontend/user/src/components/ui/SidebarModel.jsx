const SidebarModel = ({
  isOpen,
  onClose,
  children,
  width = "w-[280px]",
}) => {
  return (
    <>
      {/* 🔲 OVERLAY */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 bg-black/40 z-dropdown
          transition-opacity duration-300
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      {/* 📦 SIDEBAR */}
      <div
        className={`
          fixed top-0 right-0 h-full ${width}
          bg-surface z-modal shadow-modal
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* ❌ CLOSE BUTTON */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-2xl text-dark"
          >
            ✕
          </button>
        </div>

        {/* 📌 CONTENT */}
        <div className="px-6 pb-6">
          {children}
        </div>
      </div>
    </>
  );
};

export default SidebarModel;