import { PencilSimple } from "phosphor-react";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import Firebase from '../../libs/firebase';
import Header from "../Header";
import UploadImageProfile from "./UploadImageProfile";

export default () => {

  const inputName = useRef<HTMLInputElement | null>(null);
  const user = useContext(AuthContext);
  const [name, setName] = useState<string>("");
  const [img, setImg] = useState<any>();

  useEffect(() => {

    if(user && user.displayName){
      setName(user.displayName);
    }

  }, []);

  //EDITAR NOME
  const handleUserName = () => {
    if(inputName.current){
      inputName.current.focus();
    }
  }

  //SALVAR ALTERAÇÕES
  const updateProfile = () => {
    if(name.length !== 0){
      
      Firebase.updateData(name, img, user.uid);

    } else{
      alert("PREENCHA O NOME CORRETO")
    }
  }

  return(
    <div className="w-full min-h-screen pb-20">
      {
        user && (
          <>
            <Header/>

            <div className="py-5 px-3 sm:px-5 flex flex-col items-center md:items-start">
              <div className="flex flex-col items-center md:items-start">
                <h1 className="text-lg font-bold">
                  Informações do usuário
                </h1>

                <h2 className="mt-2 text-gray-300 font-light text-sm">
                  Dados pessoais e cadastro
                </h2>
              </div>

              <div className="pb-10 flex flex-col-reverse items-center gap-5 sm:grid sm:grid-cols-2 
              sm:gap-10 border-b dark-mode-border">
                <div className="mt-2">
                  <div className="h-14 flex items-center justify-start">
                    <h1 className="w-[230px] text-gray-300">
                      userID
                    </h1>

                    <h2 className="text-sm sm:text-base">
                      {user.uid}
                    </h2>
                  </div>

                  <div className="h-14 flex items-center">
                    <h1 className="w-[230px] text-gray-300">
                      Nome
                    </h1>

                    <h2 className="w-auto flex items-center gap-3">
                      <input
                        type="text"
                        value={name}
                        ref={inputName}
                        className="outline-none bg-transparent"
                        onChange={(e) => setName(e.target.value)}
                      />

                      <button 
                        onClick={handleUserName} 
                        className="text-gray-300 hover:text-purple-500 transition-all"
                      >
                        <PencilSimple
                          size={20}
                        />
                      </button>
                    </h2>
                  </div>

                  <div className="h-14 flex items-center">
                    <h1 className="w-[230px] text-gray-300">
                      Email
                    </h1>

                    <h2 className="text-sm sm:text-base">
                      {user.email}
                    </h2>
                  </div>
                </div>

                <div className="mt-5 sm:m-0">
                  <UploadImageProfile 
                    image={user.photoURL} 
                    displayName={user.displayName}
                    img={img}
                    setImg={setImg}
                  />
                </div>
              </div>

              <button 
                onClick={updateProfile}
                className="w-40 mt-10 py-2 flex items-center justify-center text-sm text-white 
                bg-purple-500 rounded hover:bg-purple-800 transition-colors cursor-pointer"
              >
                Salvar alterações
              </button>
            </div>
          </>
        )
      }
    </div>
  );
}