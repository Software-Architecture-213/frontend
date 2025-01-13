import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const GameDialog = ({ isOpen, onClose, onSave, initialGameType }: any) => {
  const [gameDetails, setGameDetails] = useState({
    name: "",
    type: initialGameType || "QUIZ",
    description: "",
    guideline: "",
    allowItemExchange: false,
    difficulty: "medium",
  });

  const [quizzes, setQuizzes] = useState<{ id: string; question: string; answers: { text: string; isCorrect: boolean }[] }[]>([]);
  const [items, setItems] = useState<{
    name: string;
    description: string;
    rarity: string;
    tradable: boolean;
    maxQuantity: number;
  }[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = e.target instanceof HTMLInputElement ? e.target.checked : false;
    setGameDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleItemInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [name]: value };
    setItems(updatedItems);
  };

  const handleQuizInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedQuizzes = [...quizzes];
    updatedQuizzes[index] = { ...updatedQuizzes[index], [name]: value };
    setQuizzes(updatedQuizzes);
  };

  const handleAnswerChange = (quizIndex: number, answerIndex: number, field: string, value: string | boolean) => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes[quizIndex].answers[answerIndex] = {
      ...updatedQuizzes[quizIndex].answers[answerIndex],
      [field]: value,
    };
    setQuizzes(updatedQuizzes);
  };

  const handleAddQuiz = () => {
    setQuizzes([...quizzes, { id: uuidv4(), question: "", answers: [{ text: "", isCorrect: false }] }]);
  };

  const handleRemoveQuiz = (index: number) => {
    const updatedQuizzes = quizzes.filter((_, i) => i !== index);
    setQuizzes(updatedQuizzes);
  };

  const handleAddItem = () => {
    setItems([...items, { name: "", description: "", rarity: "common", tradable: false, maxQuantity: 1 }]);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleSave = () => {
    onSave(gameDetails, gameDetails.type === "QUIZ" ? quizzes : null, items);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 h-4/5 overflow-auto">
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
        {gameDetails.type === "QUIZ" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Quiz Settings</h3>
            <button
              onClick={handleAddQuiz}
              className="text-blue-500 mb-4 inline-block"
            >
              Add Quiz
            </button>
            {quizzes.map((quiz, index) => (
              <div key={quiz.id} className="mb-4 border-b pb-4">
                <div className="flex items-center">
                  <input
                    type="text"
                    name="question"
                    value={quiz.question}
                    onChange={(e) => handleQuizInputChange(index, e)}
                    placeholder="Enter question"
                    className="w-full border-gray-300 rounded-md p-2"
                  />
                  <button
                    onClick={() => handleRemoveQuiz(index)}
                    className="ml-2 text-red-500"
                  >
                    Remove
                  </button>
                </div>
                {quiz.answers.map((answer, answerIndex) => (
                  <div key={answerIndex} className="mt-2 flex items-center">
                    <input
                      type="text"
                      value={answer.text}
                      onChange={(e) => handleAnswerChange(index, answerIndex, "text", e.target.value)}
                      placeholder="Answer"
                      className="w-2/3 border-gray-300 rounded-md p-2"
                    />
                    <label className="ml-2">
                      <input
                        type="checkbox"
                        checked={answer.isCorrect}
                        onChange={(e) => handleAnswerChange(index, answerIndex, "isCorrect", e.target.checked)}
                        className="mr-1"
                      />
                      Correct
                    </label>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const updatedQuizzes = [...quizzes];
                    updatedQuizzes[index].answers.push({ text: "", isCorrect: false });
                    setQuizzes(updatedQuizzes);
                  }}
                  className="text-blue-500 mt-2"
                >
                  Add Answer
                </button>
              </div>
            ))}
          </div>
        )}
        {/* Item List Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Item Settings</h3>
          <button
            onClick={handleAddItem}
            className="text-blue-500 mb-4 inline-block"
          >
            Add Item
          </button>
          {items.map((item, index) => (
            <div key={index} className="mb-4 border-b pb-4">
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  name="name"
                  value={item.name}
                  onChange={(e) => handleItemInputChange(index, e)}
                  placeholder="Item Name"
                  className="w-full border-gray-300 rounded-md p-2"
                />
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="ml-2 text-red-500"
                >
                  Remove
                </button>
              </div>
              <div className="mb-2">
                <textarea
                  name="description"
                  value={item.description}
                  onChange={(e) => handleItemInputChange(index, e)}
                  placeholder="Description"
                  className="w-full border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex space-x-4">
                <select
                  name="rarity"
                  value={item.rarity}
                  onChange={(e) => handleItemInputChange(index, e)}
                  className="w-1/3 border-gray-300 rounded-md p-2"
                >
                  <option value="common">Common</option>
                  <option value="rare">Rare</option>
                  <option value="epic">Epic</option>
                </select>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="tradable"
                    checked={item.tradable}
                    onChange={(e) => handleItemInputChange(index, e)}
                    className="mr-2"
                  />
                  Tradable
                </label>
                <input
                  type="number"
                  name="maxQuantity"
                  value={item.maxQuantity}
                  onChange={(e) => handleItemInputChange(index, e)}
                  className="w-1/3 border-gray-300 rounded-md p-2"
                  min="1"
                />
              </div>
            </div>
          ))}
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
