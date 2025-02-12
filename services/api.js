import axios from "axios";

export const addFoodLog = async (foodId) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/food_log`, { food_id: foodId });
    return response.data; // The response from the backend
  } catch (error) {
    console.error("Error adding food log:", error);
    throw error;
  }
};

// Function to get available food items
export const getFoodItems = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/food_log`);
    return response.data; // List of food items
  } catch (error) {
    console.error("Error fetching food items:", error);
    throw error;
  }
};

// Function to get macros for the day items
export const getMacros = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/food_log/macros`);
    return response.data; // List of food items
  } catch (error) {
    console.error("Error fetching macros:", error);
    throw error;
  }
};
