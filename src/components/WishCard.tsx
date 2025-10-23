import type { Wish } from "../types/Wish";

type WishCardProps = {
  wish: Wish;
  onEdit: (wish: Wish) => void;
  onDelete: (wish: Wish) => void;
  onDetails: (wish: Wish) => void;
};

export function WishCard({ wish, onEdit, onDelete, onDetails }: WishCardProps) {
  return (
    <div
      key={wish.id}
      className="border border-[#dcdcdc] rounded-lg p-4 shadow-sm flex flex-col"
    >
      <img
        src={wish.image}
        alt={wish.title}
        className="h-40 w-full object-cover rounded mb-3"
      />
      <h2 className="font-semibold text-lg">{wish.title}</h2>
      <p className="text-sm text-gray-600 mb-1">{wish.description}</p>
      <p className="font-medium text-gray-800">${wish.price}</p>

      <div className="flex justify-end gap-2 mt-3">
        <button
          onClick={() => onDetails(wish)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded cursor-pointer"
        >
          Details
        </button>
        <button
          onClick={() => onEdit(wish)}
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(wish)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
