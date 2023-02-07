import { MagnifyingGlass } from "phosphor-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

import Theme from "./Theme";

export default () => {

  const user  = useContext(AuthContext);

  return(
    <>
      {
        user && (
          <div className="flex-1 h-[60px] px-3 sm:px-5 flex items-center justify-between sticky top-0
          border-gray-100 dark-mode border-b dark-mode-border z-10">
            <h1>
              Olá, <span className="font-bold">
                {user.displayName?.split(" ")[0]}
              </span>
            </h1>
      
            <div className="flex items-center gap-3">
              <Theme/>
      
              <Link to="/profile" className="flex items-center gap-2">
                {
                  user.photoURL ? (
                    <div className="w-8 h-8 rounded-full border-2 border-purple-500 overflow-hidden">
                      <img src={user.photoURL} className="w-full" />
                    </div>
                  )
                  : (
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                      <h1 className="uppercase text-white">
                        {user.displayName?.split("")[0]}
                      </h1>
                    </div>
                  )
                }
      
                <div className="hidden sm:block">
                  <h1 className="text-sm font-bold">
                    {user.displayName?.split(" ")[0]}
                  </h1>
                  
                  <h2 className="text-xs text-gray-300">Ver perfil</h2>
                </div>
              </Link>
            </div>
          </div>
        )
      }
    </>
  );
}