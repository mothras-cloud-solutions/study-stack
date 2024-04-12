import React from 'react';

interface Card {
  id: number;
  term: string;
  definition: string;
  archived: boolean;
}

interface DeckCardsProps {
  cards: Card[];
  handleCardEdit: (id: number) => void;
  handleCardDelete: (id: number) => void;
  handleCardArchive: (id: number) => void;
  handleCardUnarchive: (id: number) => void;
}

const DeckCards: React.FC<DeckCardsProps> = ({ cards, handleCardEdit, handleCardDelete, handleCardArchive, handleCardUnarchive }) => {

  // cards dummy data
  // let cards = [
  //     { id: 1, term: 'Component', definition: 'A reusable, self-contained piece of UI', archived: false },
  //     { id: 2, term: 'State', definition: 'Local state within a component', archived: false },
  //     { id: 3, term: 'Props', definition: 'Properties passed from parent to child component', archived: true },
  //     { id: 4, term: 'Hook', definition: 'A function that lets you "hook into" React state and lifecycle features', archived: false },
  //     { id: 5, term: 'Virtual DOM', definition: 'A lightweight copy of the DOM tree maintained by React', archived: true },
  //   ];

  // Calculate the number of cards in the deck
  const numCards = cards.length;

  // Conditionally render the DeckCards component based on the number of cards
  if (numCards === 0) {
    return null; // If there are no cards, don't render anything? Or you can show amessage saying "You dont have any decks yet and a link saying "Create New Deck" maybe?
  }




  return (
    // CardThumbnailContainer (box)
    <div className="box">
      <span className="block">
        <h2 className="title is-4 mb-3">Cards in this Deck ({numCards})</h2>
      </span>
      <div className="columns is-multiline">


        {/* START OF CardThumbnail (individual cards) */}
        {cards.map(card => (
          <div className="column is-one-third" key={card.id}>
            <div className="card">
              <div className="card-content">
                <div className="content short-description">
                  <p className="chunckle-clamp"><strong>Prompt:</strong> {card.term}</p>
                  {/* <p><strong>Definition:</strong> {card.definition}</p> */}
                  <span dangerouslySetInnerHTML={{ __html: card.definition }} />
                </div>
              </div>
              <footer className="card-footer">
                <a className="card-footer-item" onClick={() => handleCardEdit(card)}>Edit</a>
                <a className="card-footer-item" onClick={() => handleCardDelete(card.id)}>Delete</a>
                {!card.archived ? (
                  <a className="card-footer-item" onClick={() => handleCardArchive(card.id)}>Archive</a>
                ) : (
                  <a className="card-footer-item" onClick={() => handleCardUnarchive(card.id)}>Unarchive</a>
                )}
              </footer>
            </div>
          </div>
        ))}
        {/* END OF CardThumbnail (individual cards) */}


      </div>
    </div>
  );
};

export default DeckCards;
