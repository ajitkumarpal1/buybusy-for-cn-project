import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HomeItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <div className="min-h-screen flex flex-col items-center bg-blue-900 text-white rounded-3xl">
      <div className="w-full max-w-7xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Shopping Items</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item.id} className="flex flex-col overflow-hidden rounded-lg bg-blue-600 text-white pt-2 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <Link to={`/product/${item.id}`} className="flex flex-col flex-grow">
                <img src={item.image} alt={item.title} className="w-full h-48 object-contain" />
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold mb-2 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{item.title}</h2>
                  <p className="mb-4 overflow-hidden flex-grow" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="font-bold">${item.price}</span>
                    <span className="">{item.rating.rate} ★</span>
                  </div>
                </div>
              </Link>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-b focus:outline-none focus:shadow-outline transition-transform hover:scale-105 active:scale-100">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
