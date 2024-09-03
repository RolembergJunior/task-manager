

export function formatNumbertoPercent(value:number, decimals:number){
    if(!value) return '0%';

    const normalizedValue = value.toFixed(decimals).replace('.', '');

    return `${parseInt(normalizedValue)}%`;
}