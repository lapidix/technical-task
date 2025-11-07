interface NumberPadProps {
  onNumberClick: (num: string) => void;
  onBackspace: () => void;
}

export const NumberPad = ({ onNumberClick, onBackspace }: NumberPadProps) => {
  return (
    <div className="px-6">
      <div className="grid grid-cols-3 gap-4">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"].map((num) => (
          <button
            key={num}
            onClick={() => onNumberClick(num)}
            className="text-3xl font-light py-6 active:bg-gray-900 rounded-lg transition-colors">
            {num}
          </button>
        ))}
        <button
          onClick={onBackspace}
          className="text-3xl font-light py-6 active:bg-gray-900 rounded-lg transition-colors flex items-center justify-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2">
            <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
            <line x1="18" y1="9" x2="12" y2="15" />
            <line x1="12" y1="9" x2="18" y2="15" />
          </svg>
        </button>
      </div>
    </div>
  );
};
