import { Popover, Transition } from "@headlessui/react";
import { EnvelopeSimple, X } from "phosphor-react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

import Firebase from '../../../libs/firebase';

interface EmailVerifyProps{
  email: string;
}


export default ({ email }: EmailVerifyProps) => {

  const user = useContext(AuthContext);

  const handleEmailVerified = () => {
    Firebase.sendEmailVerification();
  }

  return(
    <div>
      {
        user && (
          <>
            {
              user.emailVerified ? (
                <div className="w-full h-14 flex items-center gap-3 px-5 hover:bg-gray-700 transition-colors">
                  <EnvelopeSimple
                    size={20}
                    className="text-gray-300"
                  />

                  <h1>Seu email já foi verificado</h1>
                </div>
              ) 
              : (
                <Popover>
                  <Popover.Button className="w-full h-14 flex items-center gap-3 px-5 hover:bg-gray-100 dark:hover:bg-gray-700
                  transition-colors outline-none focus:bg-gray-100 dark:focus:bg-gray-700">
                    <EnvelopeSimple
                      size={20}
                      className="text-gray-300"
                    />

                    Verificação de email
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
                          Verificar email
                        </h1>

                        <h2 className="mt-5 text-lg text-gray-300 font-light">
                          Iremos enviar um link para o email cadastrado <span className="font-bold text-black dark:text-white">{email}</span> para ser verificado
                        </h2>

                        <button 
                          onClick={handleEmailVerified}
                          className="w-full h-10 mt-5 bg-purple-500 flex items-center justify-center rounded 
                          text-white"
                        >
                          Enviar email
                        </button>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>
              )
            }
          </>
        )
      }
    </div>
  );
}