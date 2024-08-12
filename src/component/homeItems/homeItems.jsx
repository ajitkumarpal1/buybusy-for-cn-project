import { useSelector, useDispatch } from "react-redux";
import { setHomeItemThunk, setItems } from "../../redux/reducer/homereducer";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { addProduct } from "../../redux/reducer/cartItemredicer";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebaseInit";
import { toast } from "react-toastify";

export default function HomeItems() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.homeItam).data;
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    console.log("items",items)
    dispatch(setHomeItemThunk());
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get("https://fakestoreapi.com/products"); 
    //     dispatch(setItems(response.data));
    //     /* const response = await fetch("https://fakestoreapi.com/products");
    //     const data = await response.json(); 
    //     dispatch(setItems(data));*/
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };

    // fetchData();
  }, [dispatch]);

  const handleAddToCart = async (item) => {
    try {
      const userRef = doc(db, "buybusy-redux", userData.userLoggedIn.id);
      await updateDoc(userRef, {
        cart: arrayUnion(item)
      });
      dispatch(addProduct(item));
      toast.success("Item added to cart successfully!"); // Replace with your desired notification system
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-blue-900 text-white rounded-3xl">
      <div className="w-full max-w-7xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Shopping Items</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.loading && (
            <>
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
            </>
          )}
          {items.error && (
            <div className="text-red-500 text-center mb-8">Error: {items.error}</div>
          )}
          {!items.loading && !items.error && items.products && items.products.map((item) => (
            <div key={item.id} className="flex flex-col overflow-hidden rounded-lg bg-blue-600 text-white pt-2 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <Link to={`/product/${item.id}`} className="flex flex-col flex-grow">
                <img src={item.images[0]} alt={item.title} className="w-full h-48 object-contain" />
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold mb-2 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{item.title}</h2>
                  <p className="mb-4 overflow-hidden flex-grow" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>{item.description}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="font-bold">₹{item.price}</span>
                    <span>{item.rating.rate} ★</span>
                  </div>
                </div>
              </Link>
              <button onClick={() => handleAddToCart(item)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-b focus:outline-none focus:shadow-outline transition-transform hover:scale-105 active:scale-100">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkeletonItem() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-blue-600 text-white pt-2 shadow-lg transition-shadow duration-200 animate-pulse">
      <div className="w-full h-48 bg-blue-700"></div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="h-6 bg-blue-700 mb-2"></div>
        <div className="h-4 bg-blue-700 mb-4"></div>
        <div className="h-4 bg-blue-700 mb-4"></div>
        <div className="flex justify-between items-center mt-auto">
          <div className="h-6 bg-blue-700 w-20"></div>
          <div className="h-6 bg-blue-700 w-12"></div>
        </div>
      </div>
    </div>
  );
}
