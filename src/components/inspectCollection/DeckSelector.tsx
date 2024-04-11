import React, { useEffect, useState } from 'react';

type CollectionType = {
  id: number;
  title: string;
};

type DeckSelectorProps = {
  onDeckSelect: (collection: CollectionType) => void;
};

const DeckSelector: React.FC<DeckSelectorProps> = ({ uid, onDeckSelect }) => {
  const [collections, setCollections] = useState<CollectionType[]>([]);

  useEffect(() => {
    if (uid) {

      const pUrl = `https://study-stack-production.railway.internal/api/collections/user/${uid}`;

      // const url = process.env.NODE_ENV === 'production' ? pUrl : `/api/collections/user/${uid}`;

      fetch(pUrl)
        .then(response => response.json())
        .then(data => {
          setCollections(data);
        })
        .catch(error => {
          console.error('Error fetching collections:', error);
        });
    }
  }, [uid]);

  return (
    <div className="w-full mb-4">
      <label htmlFor="collection-select" className="block text-lg font-medium text-gray-700 mb-2">
        Decks:
      </label>
      <select
        id="collection-select"
        className="block w-full pl-4 pr-10 py-3 text-lg border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
        defaultValue=""
        onChange={(e) => {
          const index = parseInt(e.target.value, 10);
          if (index >= 0 && index < collections.length) {
            onDeckSelect(collections[index]);
          }
        }}
      >
        <option value="" disabled>
          Please select a deck
        </option>
        {collections.map((collection, index) => (
          <option key={collection.id} value={index} className="text-lg">
            {collection.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DeckSelector;
