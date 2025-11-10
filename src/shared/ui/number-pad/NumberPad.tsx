import { BackSpaceIcon } from "@/shared/ui/icons/common";

interface NumberPadProps {
  onNumberClick: (num: string) => void;
  onBackspace: () => void;
}

export const NumberPad = ({ onNumberClick, onBackspace }: NumberPadProps) => {
  return (
    <div className="border-t border-l border-r border-gray-800 sticky bottom-0 left-0 right-0 bg-black z-50">
      <div className="grid grid-cols-3">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"].map((num) => (
          <button
            key={num}
            onClick={() => onNumberClick(num)}
            className="text-2xl font-normal py-2.5 active:bg-gray-900 transition-colors border-r border-b border-gray-800 last:border-r-0">
            {num}
          </button>
        ))}
        <button
          onClick={onBackspace}
          className="text-3xl font-light py-2.5 active:bg-gray-900 transition-colors flex items-center justify-center border-b border-gray-800">
          <BackSpaceIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
