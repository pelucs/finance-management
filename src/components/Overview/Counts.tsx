import { useState } from "react";
import classnames from "classnames";
import Firebase from '../../libs/firebase';
import { CaretUp, Plus, Trash } from "phosphor-react";

interface CountsProps{
  ocultTable: boolean;
  setOcultTable: (newState: boolean) => void;
}

export default ({ ocultTable, setOcultTable }: CountsProps) => {

  const [activeForm, setActiveForm] = useState<boolean>(false);
  const [desc, setDesc] = useState<string>("");
  const [value, setValue] = useState<number>(0);
  const [type, setType] = useState<string>("");

  const createCount = () => {
    Firebase.createCount(desc, value, type);
  }

  return(
    <div>
      <div className={classnames("mt-2 overflow-auto", {
        "h-full": activeForm,
        "h-0 overflow-hidden": !activeForm
      })}>
        <h1 className="text-lg font-bold">
          Preencha todos os campos corretamente
        </h1>

        <div className="mt-2 grid sm:grid-cols-3 gap-5 sm:gap-10 items-center">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-black dark:text-gray-300 font-bold text-sm">
                Descrição
              </label>

              <p className="text-gray-300 text-xs">
                {desc.length}/40
              </p>
            </div>

            <input
              maxLength={40}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Ex: Salário"
              className="input focus:border-gray-200 bg-gray-100 dark:bg-gray-700 
              dark:focus:border-gray-600 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black dark:text-gray-300 font-bold text-sm">Valor $</label>

            <input
              type="number"
              placeholder="Digite um valor"
              onChange={(e) => setValue(Number(e.target.value))}
              className="input focus:border-gray-200 bg-gray-100 dark:bg-gray-700 
              dark:focus:border-gray-600 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-black dark:text-gray-300 font-bold text-sm">Tipo</h1>

            <div>
              <div className="flex items-center gap-2">
                <div 
                  onClick={() => setType("entrada")}
                  className="w-4 h-4 rounded-full bg-gray-700 border border-gray-600 overflow-hidden
                  flex items-center justify-center"
                >
                  <div className={classnames("w-2 h-2 flex items-center justify-center cursor-pointer rounded-full", {
                    "bg-purple-500": type === "entrada",
                    "bg-transparent": type !== "entrada"
                  })}/>
                </div>

                <input 
                  type="radio" 
                  id="enter" 
                  value="entrada" 
                  name="type"
                  onChange={(e) => setType(e.target.value)} 
                  className="hidden"
                />
                <label htmlFor="enter" className="text-positive-100">Entrada</label>
              </div>

              <div className="flex items-center gap-2">
                <div 
                  onClick={() => setType("saida")}
                  className="w-4 h-4 rounded-full bg-gray-700 border border-gray-600 overflow-hidden
                  flex items-center justify-center"
                >
                  <div className={classnames("w-2 h-2 flex items-center justify-center cursor-pointer rounded-full", {
                    "bg-purple-500": type === "saida",
                    "bg-transparent": type !== "saida"
                  })}/>
                </div>

                <input 
                  type="radio" 
                  id="out" 
                  value="saida" 
                  name="type"
                  onChange={(e) => setType(e.target.value)}
                  className="hidden" 
                />
                <label htmlFor="out" className="text-negative-100">Saída</label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <button 
            onClick={createCount}
            className="w-[220px] py-2 text-white rounded bg-purple-500 hover:bg-purple-800"
          >
            Adicionar
          </button>

          <button 
            onClick={() => setActiveForm(false)} 
            className="w-[220px] py-2 text-black rounded bg-gray-100 dark:bg-gray-700 dark:text-white
            dark:hover:bg-gray-600 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <h1 className="font-xl font-bold">
          Suas de contas
        </h1>

        <div className="flex gap-3">
          <button 
            title="Ocultar tudo"
            onClick={() => setOcultTable(!ocultTable)}
            className="p-2 text-sm text-white bg-gray-700 rounded hover:bg-gray-600
            flex items-center justify-center gap-2"
          >
            <CaretUp size={20} weight="bold" className={`realative ${ ocultTable ? 'rotate-180' : 'rotate-0' } transition-all`}/>
          </button>

          <button 
            // onClick={() => setActiveForm(!activeForm)}
            className="py-2 px-3 text-sm text-white bg-purple-500 rounded hover:bg-purple-800
            flex items-center justify-center gap-2"
          >
            <Trash size={20}/>

            Apagar tudo
          </button>

          <button 
            onClick={() => setActiveForm(true)}
            className="py-2 px-3 text-sm text-white bg-purple-500 rounded hover:bg-purple-800
            flex items-center justify-center gap-2"
          >
            <Plus size={20}/>

            Criar conta
          </button>
        </div>
      </div>
    </div>
  );
}