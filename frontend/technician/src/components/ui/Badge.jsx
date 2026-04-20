import Raect from 'react';

const Badge = ({ status, children }) => {
    const style = {
        pending: "bg-warning/10 text-warning",
        accepted: "bg-info/10 text-info",
        in_progress: "bg-primary/10 text-primary",
        completed: "bg-success/10 text-success",
        cancelled: "bg-danger/10 text-danger",
        step: "bg-accent text-white",
        technician_assigned: "bg-accent/10 text-accent",
    }

    return (
        <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${style[status] || "bg-muted/20 text-muted"
                }`}
        >
            {children || status}
        </span>
    )
}

export default Badge;