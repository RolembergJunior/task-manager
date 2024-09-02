import { format } from "date-fns";


export function getValueWorkingTask(dateEnd:string):number | undefined{

    let currentDate = new Date( format(Date.now(), 'yyyy-MM-dd') );
    let inputedDate = new Date( dateEnd );

    if( currentDate.getTime() === inputedDate.getTime() ){
        return 0
    } else if( currentDate.getTime() < inputedDate.getTime() ){
        return 1
    } else if( currentDate.getTime() > inputedDate.getTime() ){
        return -1
    } 

}