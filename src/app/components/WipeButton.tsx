export default function WipeButton({
  children,
  className = "",
  onClick,
  variant = "light",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full cursor-pointer transition-colors duration-300
        ${dark ? "bg-white text-black" : "bg-black text-white"} ${className}`}
    >
      {/* wipe fill */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 rounded-[inherit] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out
          ${dark ? "bg-black" : "bg-white"}`}
      />
      {/* label */}
      <span
        className={`relative z-10 transition-colors duration-200 ease-in-out
          ${dark ? "text-black group-hover:text-white" : "text-white group-hover:text-black"}`}
      >
        {children}
      </span>
    </button>
  );
}
