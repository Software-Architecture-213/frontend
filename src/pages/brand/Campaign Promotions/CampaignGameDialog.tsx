import React, { useState } from "react";

const GameDialog = ({ isOpen, onClose, onSave, initialGameType }: any) => {
  const [gameDetails, setGameDetails] = useState({
    name: "",
    type: initialGameType || "QUIZ",
    description: "",
    guideline: "",
    allowItemExchange: false,
    difficulty: "medium",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = e.target instanceof HTMLInputElement ? e.target.checked : false;
    setGameDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    onSave(gameDetails);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/4">
        <h2 className="text-xl font-bold mb-4">Create a Game</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Game Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            value={gameDetails.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Game Type
          </label>
          <select
            id="type"
            name="type"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            value={gameDetails.type}
            onChange={handleInputChange}
          >
            <option value="QUIZ">Quiz</option>
            <option value="SHAKE">Shake</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            value={gameDetails.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="guideline" className="block text-sm font-medium text-gray-700">
            Guideline
          </label>
          <textarea
            id="guideline"
            name="guideline"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            value={gameDetails.guideline}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Allow Item Exchange</label>
          <input
            type="checkbox"
            name="allowItemExchange"
            checked={gameDetails.allowItemExchange}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
            Difficulty
          </label>
          <select
            id="difficulty"
            name="difficulty"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            value={gameDetails.difficulty}
            onChange={handleInputChange}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="flex justify-end space-x-3">
          <button className="bg-gray-300 px-4 py-2 rounded-md" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSave}>
            Save Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameDialog;
