import classNames from "classnames";
import { CaretRight, Gear, Palette } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import Header from "../Header";
import SettingsAdvanced from "./SettingsAdvanced/SettingsAdvanced";

export default () => {

  const user = useContext(AuthContext);
  const [activeLayer, setActiveLayer] = useState<string>("settings-advanced");
  
  useEffect(() => {
    setActiveLayer("");
  }, []);

  return(
    <div className="w-full min-h-screen">
      {
        user && (
          <>
            <Header/>

            <div className={`grid grid-cols-1 md:grid-cols-2`}>
              <div className={classNames("h-screen border-r dark-mode-border", {
                "hidden md:block": activeLayer.length > 0,
                "block md:block": activeLayer.length === 0
              })}>
                <div className="p-5">
                  <h1 className="text-lg font-bold">
                    Configurações
                  </h1>

                  <h2 className="mt-2 text-gray-300 font-light text-sm">
                    Configurações avançadas e visuais de sua conta
                  </h2>
                </div>

                <div>
                  <button 
                    onClick={() => setActiveLayer("settings-advanced")}
                    className={classNames("w-full h-14 flex items-center justify-between px-5 hover:bg-gray-100 dark:hover:bg-gray-700  transition-colors", {
                      "border-r-4 border-purple-500 bg-gray-100 dark:bg-gray-700": activeLayer === "settings-advanced"
                    })}
                  >
                    <div className="flex items-center gap-3">
                      <Gear size={20} className="text-gray-300"/>
                      <h1>Sua conta</h1>
                    </div>

                    <CaretRight
                      size={20}
                      weight="bold"
                      className="text-gray-300"
                    />
                  </button>

                </div>
              </div>

              <div>
                {
                  activeLayer === "settings-advanced" && (
                    <SettingsAdvanced setActiveLayer={setActiveLayer}/>
                  )
                }
              </div>
            </div>
          </>
        )
      }
    </div>
  );
}