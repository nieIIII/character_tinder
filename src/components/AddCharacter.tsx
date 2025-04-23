import React, { useState } from 'react';
import { addCustomCharacter } from '../lib/characters';

interface AddCharacterProps {
  onAdd: () => void;
}

export const AddCharacter: React.FC<AddCharacterProps> = ({ onAdd }) => {
  const [hanzi, setHanzi] = useState('');
  const [pinyin, setPinyin] = useState('');
  const [meaning, setMeaning] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hanzi && pinyin && meaning) {
      addCustomCharacter({ hanzi, pinyin, meaning });
      setHanzi('');
      setPinyin('');
      setMeaning('');
      onAdd();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Add Custom Character</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="hanzi" className="block text-sm font-medium text-gray-700">
            Chinese Character (汉字)
          </label>
          <input
            type="text"
            id="hanzi"
            value={hanzi}
            onChange={(e) => setHanzi(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="pinyin" className="block text-sm font-medium text-gray-700">
            Pinyin
          </label>
          <input
            type="text"
            id="pinyin"
            value={pinyin}
            onChange={(e) => setPinyin(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="meaning" className="block text-sm font-medium text-gray-700">
            English Meaning
          </label>
          <input
            type="text"
            id="meaning"
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Add Character
        </button>
      </form>
    </div>
  );
};