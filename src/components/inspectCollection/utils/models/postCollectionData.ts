import axios from 'axios';

export const postCollection = async (data: {title: string, description: string, subjects: string , user_id: string, created_from_id: number}) => {
  try {
    const response = await axios.post('/api/collections', data);
    return response.data;
  } catch (error) {
    console.error('postCollection error: ', error);
    return error;
  }
}

export const postFlashcard = async (data: {term: string, definition: string, keywords: string, collection_id: number}) => {
  try {
    const response = await axios.post('/api/flashcards', data);
    return response.data;
  } catch (error) {
    console.error('postFlashcard error: ', error);
    return error;
  }
}

export const deleteDeck = async (deck_id: number) => {
  try {
    const response = await axios.delete(`/api/collections/${deck_id}`);
    return response.data;
  } catch (error) {
    console.error('deleteDeck error: ', error);
    return error;
  }
}


// Update canvas back for flashcard
export const putCanvasBack = async (flashcards_id: number, data: {canvas_back: string}) => {
  try {
    const response = await axios.put(`/api/canvases/${flashcards_id}/canvasBack`, data);
    return response.data;
  } catch (error) {
    console.error('putCanvasBack error: ', error);
    return error;
  }
};

// Update canvas front for flashcard
export const putCanvasFront = async (flashcards_id: number, data: {canvas_front: string}) => {
  try {
    const response = await axios.put(`/api/canvases/${flashcards_id}/canvasFront`, data);
    return response.data;
  } catch (error) {
    console.error('putCanvasBack error: ', error);
    return error;
  }
};