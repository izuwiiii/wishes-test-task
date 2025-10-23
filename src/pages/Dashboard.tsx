import { useState } from "react";
import { useWishes } from "../context/WishesContext";
import Modal from "../components/Modal";
import WishForm from "../components/WishForm";
import FiltersBar from "../components/FiltersBar";
import type { Wish } from "../types/Wish";
import { useNavigate } from "react-router";
import { WishCard } from "../components/WishCard";
import { sortWishes } from "../utils/sortWishes";
import { ConfirmModal } from "../components/ConfirmModal";
import Snackbar from "../components/Snackbar";

export default function Dashboard() {
  const navigate = useNavigate();
  const { wishes, addWish, deleteWish, updateWish } = useWishes();

  const [sortByDate, setSortByDate] = useState<"newest" | "oldest" | "">("");
  const [sortByPrice, setSortByPrice] = useState<"high" | "low" | "">("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWish, setEditingWish] = useState<Wish | null>(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [wishToDelete, setWishToDelete] = useState<Wish | null>(null);

  const [snackbar, setSnackbar] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleAddClick = () => {
    setEditingWish(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (wish: Wish) => {
    setEditingWish(wish);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (wish: Wish) => {
    setWishToDelete(wish);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (wishToDelete) {
      try {
        deleteWish(wishToDelete.id);
        setSnackbar({ message: "Wish deleted successfully", type: "success" });
      } catch {
        setSnackbar({ message: "Failed to delete wish", type: "error" });
      }
    }
    setIsConfirmOpen(false);
  };

  const handleSubmit = (wishData: Omit<Wish, "id" | "createdAt">) => {
    try {
      if (editingWish) {
        updateWish(editingWish.id, wishData);
        setSnackbar({ message: "Wish updated successfully", type: "success" });
      } else {
        addWish(wishData);
        setSnackbar({ message: "Wish added successfully", type: "success" });
      }
    } catch {
      setSnackbar({ message: "Operation failed", type: "error" });
    }
    setIsModalOpen(false);
  };

  const sortedWishes = sortWishes(wishes, sortByDate, sortByPrice);

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-md">
      <h1 className="text-2xl font-bold mb-4">My Wishes</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <FiltersBar
          sortByDate={sortByDate}
          sortByPrice={sortByPrice}
          onDateChange={setSortByDate}
          onPriceChange={setSortByPrice}
        />

        <button
          onClick={handleAddClick}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          + Add Wish
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedWishes.length ? (
          sortedWishes.map((wish) => (
            <WishCard
              key={wish.id}
              wish={wish}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              onDetails={() => navigate(`/wish/${wish.id}`)}
            />
          ))
        ) : (
          <p>Add your first wish!</p>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingWish ? "Edit Wish" : "Add New Wish"}
      >
        <WishForm
          initialData={editingWish || undefined}
          onSubmit={handleSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this wish?"
      />

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
