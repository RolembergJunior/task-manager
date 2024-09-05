import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatDateToUs } from "./formatDateToUS";

export function extractMonthFromDate(date:string[]):string[] | undefined{

    if(date){
        return( date?.map( (data) => {

            const normalizedDate = formatDateToUs( data ) ;
            
            const month = format(new Date(normalizedDate), 'MMMM/yy', {locale: ptBR});

            return month;
        }));
    } 
};