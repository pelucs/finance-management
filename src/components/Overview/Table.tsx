import classNames from "classnames";
import { Check, MinusCircle, PlusCircle, Trash } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { CountsContext } from "../../contexts/CountsContext";
import DeleteCount from "./DeleteCount";
import EditCount from "./EditCount";
import Firebase from '../../libs/firebase';

interface TableProps{
  ocultTable: boolean;
  setOcultTable: (newState: boolean) => void;
}

export default ({ ocultTable }: TableProps) => {

  const count = useContext(CountsContext);
  const [idAll, setIdAll] = useState<string[]>([]);

  useEffect(() => {
    setIdAll(count.map(count => count.id))
  }, [count]);

  const deleteAllCounts = () => {
    Firebase.deleteAllCount(idAll);
  }

  return(
    <div className="w-full border rounded dark-mode-border">
      {
        count && (
          <div className={classNames("overflow-hidden transition-all", {
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
        )
      }
    </div>
  );
}