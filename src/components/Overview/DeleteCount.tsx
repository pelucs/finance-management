import { Popover, Transition } from "@headlessui/react";
import { Trash, X } from "phosphor-react";
import { useEffect, useState } from "react";

import Firebase from '../../libs/firebase';

interface EditCountProps{
  id: string;
}

export default ({ id }: EditCountProps) => {

  const [idCount, setIdCount] = useState<string>("");

  useEffect(() => {

    setIdCount(id);

  }, [id]);

  const handleDeleteCount = () => {
    Firebase.deleteCount(id);
  }

  return(
    <Popover>
      <Popover.Button 
        title="Apagar conta" 
        className="p-1 rounded hover:bg-gray-100 transition-all text-sm hover:text-purple-500 
        dark:hover:bg-gray-700 focus:bg-gray-700 outline-none"
      >
        <Trash
          size={20}
          className="text-gray-300"
        />
      </Popover.Button>

      <Popover.Overlay className="bg-black/50 fixed inset-0 z-10 transition-all"/>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="p-5 fixed inset-0 flex items-center justify-center z-10"
      >
        <Popover.Panel className="w-[460px] py-4 px-5 rounded-md dark-mode border dark:border-gray-700
        relative">

          <Popover.Button className="w-6 h-6 flex items-center justify-center rounded absolute top-4 right-4
          bg-gray-100 dark:bg-gray-600">
            <X size={20} weight="bold"/>
          </Popover.Button>

          <div>
            <h1 className="text-lg font-bold">
              Excluir conta
            </h1>

            <h2 className="mt-2 text-gray-300 font-light text-sm">
              ID da conta: #{id}
            </h2>
          </div>

          <h1 className="text-xl text-center my-7">
            Tem certeza que deseja <br></br> excluir essa conta?
          </h1>

          <div className="mt-5 flex gap-5">
            <button
              onClick={handleDeleteCount}
              className="w-full py-2 bg-purple-500 hover:bg-purple-800 flex items-center justify-center 
              rounded text-white transition-colors"
            >
              Excluir
            </button>

            <Popover.Button className="w-full py-2 text-black rounded bg-gray-100 dark:bg-gray-700
             dark:text-white dark:hover:bg-gray-600 transition-colors">
              Cancelar
            </Popover.Button>
          </div>  
        </Popover.Panel>        
      </Transition>
    </Popover>
  );
}