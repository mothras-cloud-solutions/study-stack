import React from 'react';

interface Item {
  id: number;
  name: string;
}

interface SearchProps {
  items: Item[];
}

const Search: React.FC<SearchProps> = ({items}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
