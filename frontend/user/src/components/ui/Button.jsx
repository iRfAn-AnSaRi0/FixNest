const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  ...props
}) => {
  const base =
    "inline-flex items-center font-sans justify-center rounded-md font-medium transition duration-200";

  const variants = {
    primary: "bg-primary text-white hover:opacity-90",
    accent: "bg-accent text-white hover:opacity-90",
    outline: "border border-border text-text hover:bg-background",
    danger: "bg-danger text-white hover:opacity-90",
    ghost: "bg-transparent text-text hover:bg-primary/10"
  };

   const sizes = {
    sm: "px-3 h-9 text-sm",
    md: "px-4 h-btn text-sm",
    lg: "px-6 h-btn-lg text-base"
  };

  return(
    <button disabled={disabled} className={`${base} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`} {...props}>
     {children}
    </button>
  )
};

export default Button
