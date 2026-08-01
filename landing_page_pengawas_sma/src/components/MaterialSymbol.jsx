export default function MaterialSymbol({
  icon,
  className = "",
  style,
  onClick,
}) {
  return (
    <span
      className={`material-symbols-outlined ${className}`.trim()}
      style={style}
      onClick={onClick}
    >
      {icon}
    </span>
  );
}
