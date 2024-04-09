import React from 'react';

const CreateDeck: React.FC = () => {
  const handleClick = () => {
    // Handle button click event here
    console.log('Button clicked!');
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

export default CreateDeck;
