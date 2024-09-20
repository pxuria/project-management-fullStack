const Badge = ({ children, onDelete }: { children: string; onDelete?: (badge: string) => void }) => {
  return (
    <div
      className="px-4 py-1 rounded bg-gray-100 border border-gray-200 cursor-pointer"
      onClick={() => onDelete?.(children)}
    >
      {children}
    </div>
  );
};

export default Badge;
