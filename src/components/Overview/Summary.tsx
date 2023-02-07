import { monthFormat } from '../Date';
import { ArrowRight, MinusCircle, PlusCircle } from "phosphor-react";

interface PreviousMonthProps{
  earnings: number;
  exits: number;
}

export default ({ earnings, exits }: PreviousMonthProps) => {
  return(
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">
          Resumo de contas
        </h1>

        <a href="#" className="text-purple-500 text-sm flex items-center gap-1">
          Ver tudo

          <ArrowRight
            size={16}
            weight="bold"
          />
        </a>
      </div>

      <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="h-32 py-3 px-4 rounded flex flex-col justify-between border dark-mode-border
        hover:bg-gray-700 transition-colors">
          <div className="flex items-center justify-between">
            <h1 className="p-1 bg-purple-500 rounded text-white capitalize">
              {monthFormat}
            </h1>

            <span className="text-sm text-gray-300">
              Em andamento
            </span>
          </div>

          <div className="flex items-center justify-between">
            <h1 className={`text-lg sm:text-2xl ${ earnings - exits >= 0 ? "text-positive-100" : "text-negative-100" }`}>
              R${(earnings - exits).toFixed(2)}
            </h1>

            <PlusCircle
              size={25}
              className="text-positive-100"
            />
          </div>
        </div>

        <div className="h-32 py-3 px-4 rounded flex flex-col justify-between border dark-mode-border
        hover:bg-gray-700 transition-colors">
          <div className="flex items-center justify-between">
            <h1 className="p-1 bg-purple-500 rounded text-white">
              Outubro
            </h1>

            <span className="text-sm text-gray-300">
              Finalizado
            </span>
          </div>

          <div className="flex items-center justify-between">
            <h1>
              Terminou com R$2.500,00
            </h1>

            <PlusCircle
              size={25}
              className="text-positive-100"
            />
          </div>
        </div>

        <div className="h-32 py-3 px-4 rounded flex flex-col justify-between border dark-mode-border
        hover:bg-gray-700 transition-colors">
          <div className="flex items-center justify-between">
            <h1 className="p-1 bg-purple-500 rounded text-white">
              Setembro
            </h1>

            <span className="text-sm text-gray-300">
              Finalizado
            </span>
          </div>

          <div className="flex items-center justify-between">
            <h1>
              Terminou com R$0,00
            </h1>

            <MinusCircle
              size={25}
              className="text-negative-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}