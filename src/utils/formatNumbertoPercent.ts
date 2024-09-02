

export function formatNumbertoPercent(value:number, decimals:number){
    if(!value) return '0%';

    return `${parseFloat(value.toFixed(decimals)) * 100}%`;
}