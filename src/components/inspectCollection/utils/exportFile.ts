// Note types will need to be updated to match the actual types used in the final version of the full collection data passed in

type CanvasType = {
  id: number;
  canvas: string;
};

type FlashcardType = {
  id: number;
  term: string;
  definition: string;
  confidenceLevel: number;
  keywords: string;
  collectionId: number;
  isArchived?: boolean;
  canvas: CanvasType;
};

type CollectionType = {
  collectionId: number;
  title: string;
  description: string;
  subjects: string[];
  flashcards: FlashcardType[];
};


export const exportCollection = (collection: CollectionType) => {
  // Create a JSON string of the collection data
  const collectionData: string = JSON.stringify(collection);

  // Create a Blob object from the JSON string
  const blob: Blob = new Blob([collectionData], { type: 'application/json' });

  // Create a URL for the Blob object
  const url: string = URL.createObjectURL(blob);

  const title: string = collection.title.replace(/\s/g, '_');

  // Create a link element to trigger the download
  const link: HTMLAnchorElement = document.createElement('a');
  link.href = url;
  link.download = `${collection.title}.json`;

  // Append the link element to the document body and trigger the download
  document.body.appendChild(link);
  link.click();

  // Remove the link element from the document body
  document.body.removeChild(link);
}

// // Example object to test the above function
// const exampleCollection: CollectionType = {
//   collectionId: 1,
//   title: 'Example Collection',
//   description: 'This is an example collection for testing purposes',
//   subjects: ['Test', 'Example'],
//   flashcards: [
//     {
//       id: 1,
//       term: 'Example Term 1',
//       definition: 'This is an example definition for term 1',
//       confidenceLevel: 3,
//       keywords: 'example, term',
//       collectionId: 1,
//       canvas: {
//         id: 1,
//         canvas: 'Example Canvas 1',
//       },
//     },
//     {
//       id: 2,
//       term: 'Example Term 2',
//       definition: 'This is an example definition for term 2',
//       confidenceLevel: 2,
//       keywords: 'example, term',
//       collectionId: 1,
//       canvas: {
//         id: 2,
//         canvas: 'Example Canvas 2',
//       },
//     },
//   ],
// };

// Example of how to use:   <button onClick={() => exportCollection(exampleCollection)}>Export Collection</button>