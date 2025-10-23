import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useWishes } from "../context/WishesContext";
import Modal from "../components/Modal";
import WishForm from "../components/WishForm";
import Snackbar from "../components/Snackbar";
import type { Wish } from "../types/Wish";

export default function WishPage() {
  const { wishes, deleteWish, updateWish } = useWishes();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const wish = wishes.find((w: Wish) => w.id === id);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  if (!wish) return <p className="p-6">Wish not found</p>;

  const handleDelete = () => {
    try {
      deleteWish(wish.id);
      setSnackbar({ message: "Wish deleted successfully", type: "success" });
      setTimeout(() => navigate("/"), 500);
    } catch {
      setSnackbar({ message: "Failed to delete wish", type: "error" });
    }
  };

  const handleUpdate = (data: Omit<typeof wish, "id" | "createdAt">) => {
    try {
      updateWish(wish.id, data);
      setSnackbar({ message: "Wish updated successfully", type: "success" });
      setIsEditOpen(false);
    } catch {
      setSnackbar({ message: "Failed to update wish", type: "error" });
    }
  };

  return (
    <div className="p-6 w-2xs md:w-3xl sm:w-2xl max-w-6xl bg-white rounded-md">
      <button
        onClick={() => navigate("/")}
        className="text-blue-500 mb-4 underline cursor-pointer"
      >
        ← Back to Dashboard
      </button>

      <div className="border border-[#dcdcdc] rounded-lg p-4 shadow flex flex-col items-center">
        <img
          src={wish.image}
          alt={wish.title}
          className="w-full h-auto rounded mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{wish.title}</h1>
        <p className="text-gray-700 mb-2">{wish.description}</p>
        <p className="font-semibold mb-4">${wish.price}</p>

        <div className="flex gap-3">
          <button
            onClick={() => setIsEditOpen(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => setIsDeleteOpen(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>

      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Wish"
      >
        <WishForm
          initialData={wish}
          onSubmit={handleUpdate}
          onClose={() => setIsEditOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Delete Wish"
      >
        <p className="mb-4">Are you sure you want to delete this wish?</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsDeleteOpen(false)}
            className="bg-gray-200 px-3 py-1 rounded cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 px-3 py-1 text-white rounded cursor-pointer"
          >
            Delete
          </button>
        </div>
      </Modal>

      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar(null)}
        />
      )}
    </div>
  );
}
