import { Backdrop } from "./Backdrop";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function BaseModal({ isOpen, onClose, children }: BaseModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <Backdrop onClick={onClose} />
      <div className="relative z-10 bg-[#1A1D1A] rounded-2xl shadow-xl max-w-md w-full mx-4 p-6">
        {children}
      </div>
    </div>
  );
}
