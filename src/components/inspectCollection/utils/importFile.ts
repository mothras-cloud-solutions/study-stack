import { postCollection, postFlashcard, deleteDeck, putCanvasBack, putCanvasFront } from "./models/postCollectionData.ts";
import { getUserCollectionsMeta } from "./models/getCollectionData.ts";

type FlashcardType = {
  id: number;
  term: string;
  definition: string;
  confidenceLevel: number;
  keywords: string;
  collection_id: number;
  archived: number;
  starred: number;
  created_at: string;
  edited_at: string;
  canvas_front: string;
  canvas_back: string;
  deck_title: string;
};

type CollectionType = {
  id: number;
  title: string;
  description: string;
  subjects: string;
  created_at: string;
  edited_at: string;
  user_id: string;
  created_from_id: number;
  flashcards: FlashcardType[];
};

type PostFlashcardResponseType = {
  flashcard: FlashcardType;
};

const createCollection = async (collection: CollectionType, user_id: string) => {
  try {
    const userCollections = await getUserCollectionsMeta(user_id);
    let deleteChoice: boolean = false;
    for (const userCollection of userCollections) {
      if (userCollection.created_from_id && userCollection.created_from_id === collection.id) {
        if (!deleteChoice) {
          if (window.confirm('This deck has already been imported.\nWould you like to replace the previous version(s) of this deck?\nSelect "Ok" to replace or "Cancel" to keep both new and previous versions.')) {
            await deleteDeck(userCollection.id);
            deleteChoice = true;
          } else {
            break;
          }
        } else {
          await deleteDeck(userCollection.id);
        }
      }
    }
    const {title, description, subjects} = collection;
    const created_from_id = collection.id;
    const newCollection: CollectionType = await postCollection({title, description, subjects, user_id, created_from_id});
    const newCollectionId = newCollection.id;
    await Promise.all(collection.flashcards.map(async (flashcard) => {
      const {term, definition, keywords} = flashcard;
      const collection_id = newCollectionId;
      const confidenceLevel: number = 0;
      const archived: number = 0;
      const starred: number = 0;
      const newFlashcard: PostFlashcardResponseType = await postFlashcard({term, definition, keywords, archived, starred, confidenceLevel, collection_id});
      await putCanvasFront(newFlashcard.flashcard.id, {canvas_front: flashcard.canvas_front});
      await putCanvasBack(newFlashcard.flashcard.id, {canvas_back: flashcard.canvas_back});
    }));
    return newCollectionId;
  } catch (error) {
    console.error('createCollection error: ', error);
    return error;
  }
}



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
export const importFile = (user_id: string | null, setRefreshDecks: (a: boolean) => void, refreshDecks: boolean) => {
  if (!user_id) {
    return;
  }
  const input: HTMLInputElement = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';

  input.onchange = (event) => {
    const file: File = (event.target as HTMLInputElement).files?.[0] as File;
    importCollection(file)
      .then((collection) => {
        createCollection(collection, user_id)
          .then((newCollectionId) => {
            // console.log('New deck created with id:', newCollectionId);
            setRefreshDecks(!refreshDecks);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  input.click();
};


// Use with (example):   <button onClick={() => openFile()}>Import Collection</button>
