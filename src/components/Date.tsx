import { format } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR'

const date = new Date(),
      day: number = date.getDate(),
      month: number = date.getMonth(),
      year: number = date.getFullYear();
  
const newFormat = format(new Date(year, month, day), "EEEE', 'd' de 'MMMM' de 'yyyy'", { locale: ptBR });
const monthFormat = format(new Date(year, month, day), 'MMMM', { locale: ptBR });

export { newFormat, monthFormat };