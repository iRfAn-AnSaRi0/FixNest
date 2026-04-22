const Badge = ({ status, children, className = "" }) => {
  const style = {
    pending: "bg-warning/10 text-warning",
    technician_assigned: "bg-primary-100 text-primary",
    accepted: "bg-info/10 text-info",
    in_progress: "bg-primary/10 text-primary",
    completed: "bg-success/10 text-success",
    cancelled: "bg-danger/10 text-danger",
    step: "bg-accent text-white",

  };

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${style[status] || "bg-muted/20 text-muted"
        } ${className} `}
    >
      {children || status}
    </span>
  );
};

export default Badge;
