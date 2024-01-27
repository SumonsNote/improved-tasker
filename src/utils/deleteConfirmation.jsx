import React from "react";

export default function DeleteConfirmationModal({ onDelete, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#191D26]  p-16 rounded-md shadow-md">
        <p className="text-lg text-white-800 mb-4">
          Are you sure you want to delete this task?
        </p>
        <div className="flex justify-end space-x-5 ">
          <button
            onClick={onDelete}
            className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
