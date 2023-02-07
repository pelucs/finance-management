import classNames from "classnames";
import { CaretUp, Check, MinusCircle, Plus, PlusCircle, Trash } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { CountsContext } from "../../contexts/CountsContext";
import DeleteCount from "./DeleteCount";
import EditCount from "./EditCount";
import Firebase from '../../libs/firebase';

interface TableProps{
  ocultTable: boolean;
  setOcultTable: (newState: boolean) => void;
  setActiveForm: (newState: boolean) => void;
}

export default ({ ocultTable, setOcultTable, setActiveForm }: TableProps) => {

  const count = useContext(CountsContext);
  const [idAll, setIdAll] = useState<string[]>([]);

  useEffect(() => {
    setIdAll(count.map(count => count.id))
  }, [count]);

  const deleteAllCounts = () => {
    Firebase.deleteAllCount(idAll);
  }

  return(
    <div className="">
      <div className="mt-5 flex items-center justify-between">
        <h1 className="text-lg font-bold">
          Suas contas
        </h1>

        <div className="flex gap-3">
          <button 
            title="Ocultar tudo"
            onClick={() => setOcultTable(!ocultTable)}
            className="p-2 text-sm text-white bg-gray-700 rounded hover:bg-gray-600
            flex items-center justify-center gap-2"
          >
            <CaretUp size={20} weight="bold" className={`realative ${ ocultTable ? 'rotate-0' : 'rotate-180' } transition-all`}/>
          </button>

          <button 
            onClick={deleteAllCounts}
            disabled={count.length > 0 ? false : true}
            className="py-2 px-3 text-sm text-white bg-purple-500 rounded hover:bg-purple-800
            flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:bg-purple-500"
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

      {count && (
        <div className={classNames("mt-5 overflow-hidden border rounded dark-mode-border", {
          "h-auto": ocultTable,
          "h-0": !ocultTable
        })}>
          {
            count.length !== 0 ? (
              <table className="w-full border-collapse z-0 relative transition-all">
                <thead>
                  <tr className="border-b dark-mode-border">
                    <td className="text-xs sm:text-base p-3 px-3 sm:px-5">Descrição</td>
                    <td className="text-xs sm:text-base p-3 px-3 sm:px-5">Valor</td>
                    <td className="text-xs sm:text-base p-3 px-3 sm:px-5">Tipo</td>
                    <td className="text-xs sm:text-base p-3 px-3 sm:px-5">Data</td>
                  </tr>
                </thead>

                {
                  count.map((item, key) => (
                    <tbody key={key}>
                      <tr className="border-b dark-mode-border">
                        <td className="p-3 px-3 sm:px-5">
                          <h1 className="break-words text-xs sm:text-base">{item.count}</h1>
                        </td>

                        <td className={classNames("text-xs sm:text-base p-3 px-3 sm:px-5", {
                          "text-positive-100": item.type === "entrada",
                          "text-negative-100": item.type !== "entrada"
                        })}>
                          R${Number(item.value).toFixed(2)}
                        </td>
                        
                        <td className="text-xs sm:text-base p-3 px-3 sm:px-5">
                          {item.type === "entrada" ? (
                              <PlusCircle
                                size={20}
                                className="text-positive-100"
                              />
                            ) : (
                              <MinusCircle
                                size={20}
                                className="text-negative-100"
                              />
                          )}
                        </td>

                        <td className="text-xs sm:text-base p-3 px-3 sm:px-5 text-gray-300">
                          {item.date}
                        </td>
                        
                        <td>
                          <EditCount
                            id={item.id} 
                            desc={item.count} 
                            value={item.value}
                            date={item.date}
                            type={item.type}
                          />
                        </td>

                        <td>
                          <DeleteCount 
                            id={item.id}
                          />
                        </td>
                      </tr>
                    </tbody>
                  ))
                }
              </table>
            ) 
            : (
              <div className="w-full py-10 pl-5 flex items-center justify-center">
                <h1 className="text-gray-300">Nenhuma conta registrada</h1>
              </div> 
            )
          }
        </div>
      )}
    </div>
  );
}