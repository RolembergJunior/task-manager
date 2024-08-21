import { Tooltip } from "@radix-ui/react-tooltip";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  ComposedChart, 
  Legend, 
  Line, 
  Rectangle, 
  ResponsiveContainer, 
  XAxis, 
  YAxis } from "recharts";

export default function BarChartGeral(){

    const data = [
        {
          name: 'Page A',
          uv: 590,
          pv: 800,
          amt: 1400,
        },
        {
          name: 'Page B',
          uv: 868,
          pv: 967,
          amt: 1506,
        },
        {
          name: 'Page C',
          uv: 1397,
          pv: 1098,
          amt: 989,
        },
        {
          name: 'Page D',
          uv: 1480,
          pv: 1200,
          amt: 1228,
        },
        {
          name: 'Page E',
          uv: 1520,
          pv: 1108,
          amt: 1100,
        },
        {
          name: 'Page F',
          uv: 1400,
          pv: 680,
          amt: 1700,
        },
      ];

    return(
      <div className="dark:bg-[#1e293b] row-start-1 row-end-4 col-start-2 col-end-4 p-5">
        <h1 className="text-xl text-center font-semibold">
          Quadro Geral
        </h1>
        <ResponsiveContainer 
            width="100%" 
            height="100%"
        >
            <BarChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
            >
                <CartesianGrid stroke="#ffffff00" />
                <XAxis type="category" dataKey="name" />
                <YAxis type="number"  />
                {/* <Tooltip /> */}
                <Legend />
                <Bar dataKey="pv" fill="#413ea0" activeBar={<Rectangle fill="pink" stroke="blue" />}/>
                <Bar dataKey="uv" fill="#413ea0" activeBar={<Rectangle fill="orange" stroke="blue" />}/>
            </BarChart>
        </ResponsiveContainer>
      </div>
    );
}