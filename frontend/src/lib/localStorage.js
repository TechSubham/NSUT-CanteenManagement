//Implemented local storage to persist data on re-renders.

// Function to get saved items from localStorage
export const getSavedItemsFromLocalStorage = () => {
  try {
    const savedItems = localStorage.getItem("savedItems");

    // If no saved items, returning an empty array
    if (!savedItems) return [];

    // Try parsing the saved items, handle error if parsing fails
    return JSON.parse(savedItems);
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return []; 
  }
};

// Function to save items to localStorage
export const saveItemsToLocalStorage = (items) => {
  try {
    // Save items as JSON string
    localStorage.setItem("savedItems", JSON.stringify(items));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};