export function formatDateToUs(date:string){

    if(date){
        let [ day, month, year ] = date.split('/');
    
        return `${year}-${month}-${day}`; 

    } else {
        return '2024-08-23'
    }

}