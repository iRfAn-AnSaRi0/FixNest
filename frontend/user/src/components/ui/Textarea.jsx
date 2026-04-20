const Textarea = ({
  label,
  value,
  onChange,
  id,
  rows = 4,
  ...props
}) => {
  const isActive = value && value.length > 0;

  return (
    <div className="relative w-full">

      <textarea
        id={id}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder=" "
        className="
          peer w-full px-3 pt-5 pb-2
          text-sm text-text
          bg-transparent
          border border-border rounded-lg
          outline-none transition-all resize-none

          focus:border-accent
        "
        {...props}
      />

      <label
        htmlFor={id}
        className={`absolute left-3 px-1
          bg-surface
          text-sm text-muted
          transition-all duration-200

          pointer-events-none

          top-2

          ${
            isActive
              ? "translate-y-[-14px] text-xs"
              : "translate-y-[6px]"
          }

          peer-focus:translate-y-[-14px]
          peer-focus:text-xs
          peer-focus:text-accent
        `}
      >
        {label}
      </label>

    </div>
  );
};

export default Textarea;