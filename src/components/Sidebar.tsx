import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarCheck, 
  Gear, 
  SignOut, 
  SquaresFour, 
  UserCircle } 
from "phosphor-react";

import classNames from "classnames";
import Firebase from '../libs/firebase';

export default () => {

  const [pathName, setPathName] = useState<string>("");

  useEffect(() => {

    let slug = window.location.pathname;
    setPathName(slug);

  }, []);

  const handleLogout = () => {
    Firebase.logout();
  }

  return(
    <div className="w-[70px] md:w-[260px] h-screen p-3 md:p-5 hidden sm:flex flex-col justify-between sticky top-0 
    dark-mode border-r dark-mode-border transition-all">
      <div>
        <div>
          <h1 className="text-gray-300 uppercase text-xs font-bold text-center md:text-left">Menu</h1>

          <div className="mt-2 flex flex-col gap-2">

            {/* DASHBOARD */}
            <Link to="/app" className={classNames("py-2 text-sm text-gray-300 flex items-center justify-center md:justify-start md:gap-2 md:hover:px-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded group", {
              "md:px-3 bg-gray-100 dark:bg-gray-700 text-purple-500": pathName === "/app"
            })}>
              <SquaresFour
                size={24}
                className="group-hover:text-purple-500"
              />

              <span className="group-hover:text-purple-500 w-0 md:w-auto transition-all overflow-hidden">
                Dashboard
              </span>
            </Link>

            {/* PERFIL */}
            <Link to="/profile" className={classNames("py-2 text-sm text-gray-300 flex items-center justify-center md:justify-start md:gap-2 md:hover:px-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded group", {
              "md:px-3 bg-gray-100 dark:bg-gray-700 text-purple-500": pathName === "/profile"
            })}>
              <UserCircle
                size={24}
                className="group-hover:text-purple-500"
              />

              <span className="group-hover:text-purple-500 w-0 md:w-auto transition-all overflow-hidden">
                Perfil
              </span>
            </Link>

            {/* MESES ANTERIORES
            <Link to="/month" className={classNames("py-2 text-sm text-gray-300 flex items-center justify-center md:justify-start md:gap-2 md:hover:px-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded group", {
              "md:px-3 bg-gray-200 text-purple-500": pathName === "/month"
            })}>
              <CalendarCheck
                size={24}
                className="group-hover:text-purple-500"
              />

              <span className="group-hover:text-purple-500 w-0 md:w-auto transition-all overflow-hidden">
                Meses anteriores
              </span>
            </Link> */}

            {/* CONFIGURAÇÕES */}
            <Link to="/settings" className={classNames("py-2 text-sm text-gray-300 flex items-center justify-center md:justify-start md:gap-2 md:hover:px-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded group", {
              "md:px-3 bg-gray-100 dark:bg-gray-700 text-purple-500": pathName === "/settings"
            })}>
              <Gear
                size={24}
                className="group-hover:text-purple-500"
              />

              <span className="group-hover:text-purple-500 w-0 md:w-auto transition-all overflow-hidden">
                Configurações
              </span>
            </Link>
          </div>
        </div>
      </div>

      <button 
        onClick={handleLogout}
        className="py-2 bg-negative-100/20 text-negative-100 flex justify-center 
        items-center md:gap-2 rounded text-sm"
      >
        <SignOut
          size={20}
        />

        <span className="w-0 md:w-auto transition-all overflow-hidden">
          Sair da conta
        </span>
      </button>
    </div>
  );
}