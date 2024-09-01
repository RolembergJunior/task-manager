'use client'

import { PieChart, Pie, Cell } from "recharts";

export default function PercentLateTaskDash(){

    const RADIAN = Math.PI / 180;
    const data = [
        { name: 'A', value: 80, color: '#ff0000' },
        { name: 'B', value: 45, color: '#00ff00' },
        { name: 'C', value: 25, color: '#0000ff' },
      ];

    const cx =  140;
    const cy = 150;
    const iR = 50;
    const oR = 100;
    const value = 50;

    const needle = ( value:number, data:any, cx:number, cy:number, iR:number, oR:number, color:string ) => {
        let total = 0;

        data.forEach( ( dataItem ) => {
            total += dataItem.value
        });

        const angle = 180.0 * ( 1 - value / total );
        const length = ( iR + 2 * oR ) - 150;
        const sin = Math.sin( -RADIAN * angle ) ;
        const cos = Math.cos( -RADIAN * angle );
        const r = 5;
        const x0 = cx + 5;
        const y0 = cy + 5;
        const xba = x0 + r * sin;
        const yba = y0 - r * cos;
        const xbb = x0 - r * sin;
        const ybb = y0 + r * cos;
        const xp = x0 + length * cos;
        const yp = y0 + length * sin;

        return [
            <circle cx={x0} cy={y0} r={r} fill={color} stroke="none"></circle>,
            <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />
        ];
    };

    return(
        <div className="dark:bg-[#1e293b] row-start-2 row-end-4 col-start-1 col-end-2 h-full w-full p-5">
            <h1 className="text-xl text-center font-semibold">Índice de efetividade</h1>
            <PieChart 
                className="mx-auto my-10"
                width={300} 
                height={250}>
                <Pie 
                    className="w-[300px] h-[200px]"
                    dataKey='value'
                    startAngle={180}
                    endAngle={0}
                    data={data}
                    cx={cx}
                    cy={cy}
                    innerRadius={iR}
                    outerRadius={oR}
                    fill="#8884d8"
                    stroke="none"
                >
                    { data.map(( entry, index ) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                { needle( value, data, cx, cy, iR, oR, '#d0d000' ) }
            </PieChart>
            <div className="flex flex-col items-center justify-center space-y-1">
                <h3 className="text-black dark:text-red-600 font-medium">
                    2,35%
                </h3>
                <h2 className="text-black dark:text-white font-semibold">
                    PERÍODO ANALISADO: AGOSTO/24
                </h2>
            </div>
        </div>
    );
}