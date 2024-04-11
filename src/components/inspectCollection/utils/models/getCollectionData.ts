import axios from 'axios';

// Update canvas back for flashcard
export const getCollectionMeta = async (collection_id: number) => {
  try {
    const response = await axios.put(`/api/collections/${collection_id}`);
    return response.data;
  } catch (error) {
    console.error('getCollectionMeta error: ', error);
    return error;
  }
};

export const getCollectionFlashcards = async (collection_id: number) => {
  try {
    const response = await axios.put(`/api/flashcards/collection_id/${collection_id}`);
    return response.data;
  } catch (error) {
    console.error('getCollectionFlashcards error: ', error);
    return error;
  }
};