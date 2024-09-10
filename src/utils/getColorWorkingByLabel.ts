import { Working } from "@/app/types/Types";

export function getColorbyLabelWorkingTask(typeWorking:string){
    if(!typeWorking) return;

    if(typeWorking === Working.LATE ){
        return '#dc2626'
    } else if( typeWorking === Working.LAST_DAY ){
        return '#ea580c'
    } else if( typeWorking === Working.ON_TIME ){
        return '#16a34a'
    } 
};