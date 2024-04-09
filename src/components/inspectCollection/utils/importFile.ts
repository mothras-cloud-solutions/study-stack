

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

const importCollection = (file: File): Promise<CollectionType> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const collectionData: CollectionType = JSON.parse(event.target?.result as string);
        resolve(collectionData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsText(file);
  });
};

//function that opens a file dialog and triggers the importCollection function
export const openFile = () => {
  const input: HTMLInputElement = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';

  input.onchange = (event) => {
    const file: File = (event.target as HTMLInputElement).files?.[0] as File;
    importCollection(file)
      .then((collection) => {
        console.log(collection);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  input.click();
};


// Use with (example):   <button onClick={() => openFile()}>Import Collection</button>
