const Model = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-modal flex items-center justify-center bg-black/40 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-surface rounded-lg shadow-modal max-w-sm w-full p-lg animate-fade"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Model