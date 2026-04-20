const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-surface border border-border rounded-xl shadow-card p-4 transition-all duration-200 hover:shadow-md ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => {
  return (
    <p className="text-sm text-muted font-medium mb-1">
      {children}
    </p>
  );
};

export const CardBody = ({ children, className = "" }) => {
  return (
    <h3 className={`text-xl font-semibold text-text ${className}`}>
      {children}
    </h3>
  );
};

export default Card;