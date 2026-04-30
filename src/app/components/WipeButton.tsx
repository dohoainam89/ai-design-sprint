export default function WipeButton({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden bg-black text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full cursor-pointer ${className}`}
    >
      {/* wipe fill — scale from left on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-[inherit] bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out"
      />
      {/* label — colour flips in sync */}
      <span className="relative z-10 text-white group-hover:text-black transition-colors duration-200 ease-in-out">
        {children}
      </span>
    </button>
  );
}
