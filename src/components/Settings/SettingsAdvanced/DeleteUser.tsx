import { Popover, Transition } from "@headlessui/react";
import { HeartBreak, X } from "phosphor-react";
import { useState } from "react";

import Firebase from '../../../libs/firebase';

export default () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleDeleteAccount = () => {
    if(email.length !== 0 && password.length !== 0){
      Firebase.deleteAccount(email, password);
    } else{
      alert("PREENCHA TODOS OS CAMPOS CORRETAMENTE");
    }
  }

  return(
    <Popover>
      <Popover.Button className="w-full h-14 flex items-center gap-3 px-5 hover:bg-gray-100 dark:hover:bg-gray-700
      transition-colors outline-none focus:bg-gray-100 dark:focus:bg-gray-700 text-negative-100">
        <HeartBreak size={20}/>

        Excluir conta
      </Popover.Button>

      <Popover.Overlay className="bg-black/50 fixed inset-0"/>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="fixed inset-0 flex items-center justify-center"
      >
        <Popover.Panel className="w-[480px] py-4 px-5 rounded-md dark-mode relative border dark:border-gray-700">
          
          <Popover.Button className="w-6 h-6 flex items-center justify-center rounded absolute top-4 right-4
          bg-gray-100 dark:bg-gray-600">
            <X size={20} weight="bold"/>
          </Popover.Button>

          <div>
            <h1 className="text-lg font-bold">
              Excluir conta
            </h1>

            <h2 className="mt-2 text-gray-300 font-light text-sm">
              Informe seu email e senha para excluir a conta
            </h2>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            <input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              className="w-full input focus:border-gray-200 bg-gray-100 dark:bg-gray-600 
              dark:focus:border-gray-400 transition-colors"
            />

            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Digite sua senha"
              className="w-full input focus:border-gray-200 bg-gray-100 dark:bg-gray-600 
              dark:focus:border-gray-400 transition-colors"
            />

            <button 
              onClick={handleDeleteAccount}
              className="w-full py-3 bg-negative-100 flex items-center justify-center rounded text-white"
            >
              Excluir conta
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}