import Modal from "./Modal";

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
};

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title || "Confirm"}>
      <p className="mb-4 text-gray-700">{message}</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}
