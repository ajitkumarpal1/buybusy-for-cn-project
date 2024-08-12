import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// Assuming you have a removeItem action in your Redux setup
import { removeProduct as removeItem } from "../../redux/reducer/cartItemredicer";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItem);

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleOrder = () => {
    // Logic for handling the order process
    console.log("Order placed");
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="flex min-h-screen flex-col items-center rounded-3xl bg-blue-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-xl">Your cart is empty</p>
      ) : (
        <div className="w-full max-w-4xl">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center shadow-md rounded-lg mb-4 p-6  bg-blue-600">
              <img src={item.image || item.images[0]} alt={item.title} className="w-32 h-32 object-contain mb-4 sm:mb-0 sm:mr-4" />
              <div className="flex flex-col flex-grow">
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-white mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xl">₹ {item.price.toFixed(2)}</span>
                  {/* <span className="text-red-300">{item.rating.rate} ★</span> */}
                </div>
              </div>
              <button 
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 sm:mt-0 sm:ml-4"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
          {/* parches div */}
          <div className="mt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <span className="text-2xl font-bold mb-4 sm:mb-0">Total: ₹ {totalAmount.toFixed(2)}</span>
              <button 
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-transform hover:scale-105 active:scale-100"
                onClick={handleOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
