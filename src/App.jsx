import React, { useEffect, useState } from "react";
import UpdateItem from "./components/UpdateItem";

// use the following link to get the data
// `/doors` will give you all the doors, to get a specific door use `/doors/1`.
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  // Get the existing item from the server
  // const [item, setItem] = useState(null);
  // pass the item to UpdateItem as a prop
// Get the existing item from the server
const [item, setItem] = useState(null);

useEffect(() => {
  const fetchItem = async () => {
    try {
      const response = await fetch(`${API_URI}/1`);
      const data = await response.json();
      setItem(data);
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  fetchItem();
}, []);

return (
  <div>
    {item ? (
      <UpdateItem item={item} setItem={setItem} />
    ) : (
      <div>Loading...</div>
    )}
  </div>
);
}
export default App;