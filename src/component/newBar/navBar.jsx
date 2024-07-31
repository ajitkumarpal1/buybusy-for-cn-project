import Home1 from "../../assets/svg/home1.svg";
import Buket from "../../assets/svg/buket.svg";
import Cart from "../../assets/svg/cart.svg";
import LoginKey from "../../assets/svg/loginkey.svg";
import AvatarIcan from "../../assets/svg/avatar1.svg";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navItems = [
    {
      icon: Home1,
      text: "Home",
      link: "/",
    },
    {
      icon: Buket,
      text: "Orders",
      link: "/orders",
    },
    {
      icon: Cart,
      text: "Cart",
      link: "/cart",
    },
    {
      icon: LoginKey,
      text: "Login",
      link: "/login",
    },
    {
      icon: AvatarIcan,
      text: "Profile",
      link: "/profile",
    },
  ];

  return (
    <>
<nav className="bg-blue-600 p-4 shadow-lg shadow-blue-950 sm:rounded-none md:m-6 md:rounded-3xl lg:m-10">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        <div className="text-lg font-semibold text-white mb-4 md:mb-0">
          MyWebsite
        </div>

        <input
          type="text"
          className="bg-transparent border-b border-white focus:outline-none focus:border-blue-300 text-white placeholder-white w-full md:w-auto mb-4 md:mb-0"
          placeholder="Search..."
        />

        <div className="flex space-x-4 gap-4 w-full md:w-auto justify-between">
          {navItems.map((item, index) => (
            <Link key={index} to={item.link} className="relative flex flex-col items-center">
              <item.icon height="44px" width="44px" className="hover:scale-105 hover:mix-blend-multiply" />
              <span className="text-xs text-center w-full overflow-hidden text-ellipsis">
                {item.text}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
    </>
    
  );
}
