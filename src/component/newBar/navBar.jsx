import Home1 from "../../assets/svg/home1.svg";
import Buket from "../../assets/svg/buket.svg";
import Cart from "../../assets/svg/cart.svg";
import LoginKey from "../../assets/svg/loginkey.svg";
import AvatarIcan from "../../assets/svg/avatar1.svg";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import cartItem from "../../redux/reducer/cartItemredicer";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userData)
  const navItems = [
    {
      icon: Home1,
      text: "Home",
      link: "/",
      states: true
    },
    {
      icon: Buket,
      text: "Orders",
      link: "/orders",
      cartItem: 0,
      states: true
    },
    {
      icon: Cart,
      text: "Cart",
      link: "/cart",
      cartItem: useSelector((state) => state.cartItem).length || 0,
      states: true
    },
    {
      icon: LoginKey,
      text: "Login",
      link: "/login",
      states: !user.isLoggedIn
    },
    {
      icon: AvatarIcan,
      text: "Profile",
      link: "/profile",
      menu: [{ text: "login" },{text: "view frofile"}
      ],
      states: user.isLoggedIn
    },
  ];
  useEffect(() => {

  }, [dispatch])
  return (
    <>
      <nav className="bg-blue-600 p-4 shadow-lg shadow-blue-950 sm:rounded-none md:m-6 md:rounded-3xl lg:m-10">
        <div className="container mx-auto flex items-center justify-between flex-wrap">
          <div className="text-lg font-semibold text-white mb-4 md:mb-0">
          🙄Work in progress...
          </div>

          <input
            type="text"
            className="bg-transparent border-b border-white focus:outline-none focus:border-blue-300 text-white placeholder-white w-full md:w-auto mb-4 md:mb-0"
            placeholder="Search..."
          />

          <div className="flex space-x-4 gap-4 w-full md:w-auto justify-between">
            {navItems.map((item, index) => {
              return (item.states && <Link key={index} to={item.link} className="relative flex flex-col items-center">
                {item.cartItem ? <div className="w-6 h-6 text-white text-center bg-blue-400 absolute rounded-full ml-10 -mt-1 overflow-hidden">{ item.cartItem}</div> : ""}
                <item.icon height="44px" width="44px" className="hover:scale-105 hover:mix-blend-multiply" />
                <span className="text-xs text-center w-full overflow-hidden text-ellipsis">
                  {item.text}
                </span>
              </Link>)

            })}
          </div>
        </div>
      </nav>
    </>

  );
}
