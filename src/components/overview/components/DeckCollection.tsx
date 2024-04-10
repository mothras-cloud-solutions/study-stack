type DeckType = {
  collectionId: number;
  title: string;
  description: string;
  subjects: string[];
};

const DeckCollection: React.FC = () => {
  const [selectedDeck, setSelectedDeck] = useState<DeckType | null>(null);

  // Create a handler for when a deck is selected
  const handleDeckSelect = (deck: DeckType) => {
    setSelectedDeck(deck);
  }

  return (
    <div>
      {deckData.map((deck: DeckType) => (
        <div key={deck.collectionId}>
          <h2>{deck.title}</h2>
          <p>{deck.description}</p>
          <ul>
            {deck.subjects.map((subject: string) => (
              <li key={subject}>{subject}</li>
            ))}
          </ul>
          <button onClick={() => handleDeckSelect(deck)}>Select Deck</button>
        </div>
      ))}
    </div>
  );
}
