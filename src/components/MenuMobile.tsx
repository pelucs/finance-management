import { Gear, House, SignOut, UserCircle } from "phosphor-react";
import { Link } from "react-router-dom";
import Firebase from '../libs/firebase';

export default () => {

  const handleLogout = () => {
    Firebase.logout();
  }

  return(
    <div className="w-full h-14 px-5 sm:hidden flex items-center justify-between dark-mode fixed bottom-0 left-0 
    border-t border-gray-100 dark:border-gray-700">
      <Link 
        to="/app"
        className="w-10 h-10 rounded flex items-center justify-center focus:bg-gray-100 dark:focus:bg-gray-700
        hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-purple-500 transition-colors"
      >
        <House
          size={23}
          className=""
        />
      </Link>

      <Link 
        to="/profile"
        className="w-10 h-10 rounded flex items-center justify-center focus:bg-gray-100 dark:focus:bg-gray-700
        hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-purple-500 transition-colors"
      >
        <UserCircle
          size={23}
          className=""
        />
      </Link>

      <Link 
        to="/settings"
        className="w-10 h-10 rounded flex items-center justify-center focus:bg-gray-100 dark:focus:bg-gray-700
        hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-purple-500 transition-colors"
      >
        <Gear
          size={23}
          className=""
        />
      </Link>

      <button 
        onClick={handleLogout}
        className="w-10 h-10 rounded flex items-center justify-center focus:bg-gray-100 dark:focus:bg-gray-700
        hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-purple-500 transition-colors"
      >
        <SignOut
          size={20}
        />
      </button>
    </div>
  );
}