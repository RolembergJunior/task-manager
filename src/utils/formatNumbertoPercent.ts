

export function formatNumbertoPercent(value:number, decimals:number){
    if(!value) return;

    return `${parseFloat(value.toFixed(decimals)) * 100}%`;
}