import { Popover, Transition } from "@headlessui/react";
import classnames from "classnames";
import { Pencil, X } from "phosphor-react";
import { useEffect, useState } from "react";

import Firebase from '../../libs/firebase';

interface EditCountProps{
  id: string;
  desc: string;
  value: number;
  type: string;
  date: string;
}

export default (props: EditCountProps) => {

  const [desc, setDesc] = useState<string>("");
  const [value, setValue] = useState<number>(0);
  const [type, setType] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {

    setDesc(props.desc);
    setValue(props.value);
    setType(props.type);
    setId(props.id);
    setDate(props.date);

  }, [props]);

  const handleEditCount = () => {
    Firebase.editCount(desc, value, type, id, date);
  }

  return(
    <Popover>
      <Popover.Button 
        title="Editar conta" 
        className="p-1 rounded hover:bg-gray-100 transition-all text-sm hover:text-purple-500 
        dark:hover:bg-gray-700 focus:bg-gray-700 outline-none"
      >
        <Pencil
          size={20}
          className="text-gray-300"
        />
      </Popover.Button>

      <Popover.Overlay className="bg-black/70 fixed inset-0 z-10 transition-all"/>

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
              Editar conta
            </h1>

            <h2 className="mt-2 text-gray-300 font-light text-sm">
              ID da conta: #{id}
            </h2>
          </div>

          <div className="mt-5 flex flex-col gap-5">
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
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Ex: Salário"
                className="input focus:border-gray-200 bg-gray-100 dark:bg-gray-700 
                dark:focus:border-gray-600 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-black dark:text-gray-300 font-bold text-sm">
                Valor $
              </label>

              <input
                maxLength={40}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                placeholder="Ex: Salário"
                className="input focus:border-gray-200 bg-gray-100 dark:bg-gray-700 
                dark:focus:border-gray-600 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-black dark:text-gray-300 font-bold text-sm">
                Data
              </label>

              <input
                maxLength={40}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Ex: Salário"
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
                    id="enterEditCount" 
                    name="type"
                    type="radio" 
                    checked={ type === "entrada" ? true : false }
                    value="entrada" 
                    onChange={(e) => setType(e.target.value)} 
                    className="hidden"
                  />
                  <label htmlFor="enterEditCount" className="text-positive-100">Entrada</label>
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
                    id="outEditCount" 
                    name="type"
                    type="radio" 
                    checked={ type === "saida" ? true : false }
                    value="saida" 
                    onChange={(e) => setType(e.target.value)} 
                    className="hidden"
                  />
                  <label htmlFor="outEditCount" className="text-negative-100">Saída</label>
                </div>
              </div>
            </div>

            <button
              onClick={handleEditCount}
              className="w-full py-3 bg-purple-500 flex items-center justify-center rounded text-white"
            >
              Salvar alterações
            </button>
          </div>  
        </Popover.Panel>        
      </Transition>
    </Popover>
  );
}