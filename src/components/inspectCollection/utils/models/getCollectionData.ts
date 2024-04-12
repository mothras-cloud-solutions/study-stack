import axios from 'axios';

export const getCollectionMeta = async (collection_id: number) => {
  try {
    const response = await axios.get(`/api/collections/${collection_id}`);
    return response.data;
  } catch (error) {
    console.error('getCollectionMeta error: ', error);
    return error;
  }
};

export const getCollectionFlashcards = async (collection_id: number) => {
  try {
    const response = await axios.get(`/api/flashcards/collection_id/${collection_id}`);
    return response.data;
  } catch (error) {
    console.error('getCollectionFlashcards error: ', error);
    return error;
  }
};

export const getUserCollectionsMeta = async (user_id: string) => {
  try {
    const response = await axios.get(`/api/collections/user/${user_id}`);
    return response.data;
  } catch (error) {
    console.error('getUserCollectionsMeta error: ', error);
    return error;
  }
};