import { Popover, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Moon, MoonStars, Sun } from "phosphor-react";
import { useEffect, useState } from "react";

export default () => {

  const [activeTheme, setActiveTheme] = useState<string>("light");

  useEffect(() => {
    let html = document.getElementById("html");
    
    if(localStorage.getItem("theme") === "dark" && html){
      html.classList.add("dark");
      setActiveTheme("dark");
    } else{
      setActiveTheme("light");
    }

  }, []);

  const handleThemeMode = (theme: string) => {
    let html = document.getElementById("html");

    if(html && theme === "dark"){
      
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setActiveTheme("dark");

    } else if(html){
      html.classList.remove("dark");
      localStorage.removeItem("theme");
      setActiveTheme("light");
    }
  }

  return(
    <Popover>
      <Popover.Button 
        title="Tema" 
        className="w-9 h-9 rounded flex items-center justify-center outline-none text-gray-500 
        hover:bg-gray-100 hover:text-purple-500 focus:bg-gray-100 focus:text-purple-500 
        transition-colors dark-mode dark:hover:bg-gray-700 dark:focus:bg-gray-700"
      >
        <MoonStars
          size={25}
        />
      </Popover.Button>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="relative"
      >

        <Popover.Panel
          className="w-[170px] py-2 px-3 absolute top-1 right-0 rounded shadow-lg dark-mode transition-colors
          border border-gray-100 dark:border-gray-700 flex flex-col gap-2"
        >
          <button
            onClick={() => handleThemeMode("light")}
            className={classNames("w-full h-10 flex items-center gap-2 rounded hover:px-2 hover:bg-gray-100 transition-all text-sm hover:text-purple-500 dark:hover:bg-gray-700", {
              "px-2 text-purple-500 bg-gray-100 dark:bg-gray-700": activeTheme === "light"
            })}
          >
            <Sun
              size={20}
            />

            Tema claro
          </button>

          <button 
            onClick={() => handleThemeMode("dark")}
            className={classNames("w-full h-10 flex items-center gap-2 rounded hover:px-2 hover:bg-gray-100 transition-all text-sm hover:text-purple-500 dark:hover:bg-gray-700", {
              "px-2 text-purple-500 bg-gray-100 dark:bg-gray-700": activeTheme === "dark"
            })}
          >
            <Moon
              size={20}
            />

            Tema escuro
          </button>
        </Popover.Panel>

      </Transition>
    </Popover>
  );
}