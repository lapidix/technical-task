interface BackdropProps {
  onClick?: () => void;
}

export function Backdrop({ onClick }: BackdropProps) {
  return (
    <div
      className="absolute inset-0 bg-black bg-opacity-50"
      onClick={onClick}
    />
  );
}
