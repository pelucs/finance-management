import { MinusCircle, PlusCircle } from "phosphor-react";

interface CardsProps{
  earnings: number;
  exits: number;
}

export default ({ earnings, exits }: CardsProps) => {

  return(
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-5">
      <div className="sm:h-24 py-3 px-4 flex sm:flex-col justify-between sm:items-start items-center rounded bg-gray-100 dark:bg-gray-700">
        <h1 className="text-black dark:text-gray-300">
          Ganhos
        </h1>

        <div className="sm:w-full flex items-center gap-2 justify-start sm:justify-between">
          <h1 className="text-lg sm:text-2xl text-black dark:text-white">
            + R${earnings.toFixed(2)}
          </h1>

          <PlusCircle
            size={30}
            className="text-positive-100"
          />
        </div>
      </div>

      <div className="sm:h-24 py-3 px-4 flex sm:flex-col justify-between sm:items-start items-center rounded bg-gray-100 dark:bg-gray-700">
        <h1 className="text-black dark:text-gray-300">
          Saídas
        </h1>

        <div className="sm:w-full flex items-center gap-2 justify-start sm:justify-between">
          <h1 className="text-lg sm:text-2xl text-black dark:text-white">
            - R${exits.toFixed(2)}
          </h1>

          <MinusCircle
            size={30}
            className="text-negative-100"
          />
        </div>
      </div>

      <div className="sm:h-24 py-3 px-4 flex sm:flex-col justify-between sm:items-start items-center rounded bg-gray-100 dark:bg-gray-700">
        <h1 className="text-black dark:text-gray-300">
          Total
        </h1>

        <h1 className={`text-lg sm:text-2xl ${ earnings - exits >= 0 ? "text-positive-100" : "text-negative-100" }`}>
          R${(earnings - exits).toFixed(2)}
        </h1>
      </div>
    </div>
  );
}