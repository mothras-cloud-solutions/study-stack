import axios from 'axios';

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