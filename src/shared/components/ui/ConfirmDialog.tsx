import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "./Button";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmPendingLabel?: string;
  isConfirming?: boolean;
}

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  confirmPendingLabel = "Deleting...",
  isConfirming = false,
}: ConfirmDialogProps) => {
  const [pending, setPending] = useState(isConfirming);

  const handleConfirm = async () => {
    setPending(true);
    try {
      await onConfirm();
    } finally {
      setPending(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm action"
      closeOnBackdrop={false}
    >
      <div className="flex items-start gap-3 p-4">
        <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400">
          <TriangleAlert size={20} className="block" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-[#e4e6eb]">{title}</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-[#b0b3b8]">{description}</p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 border-t border-slate-200 dark:border-[#2d2e2f] px-4 py-3">
        <Button
          variant="outline"
          onClick={onClose}
          disabled={pending}
        >
          {cancelLabel}
        </Button>
        <Button
          variant="danger"
          onClick={handleConfirm}
          isLoading={pending}
        >
          {pending ? confirmPendingLabel : confirmLabel}
        </Button>
      </div>
    </Modal>
  );
};
ConfirmDialog.displayName = "ConfirmDialog";

