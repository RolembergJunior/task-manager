

export default function CountTaskStatus(){
    return(
        <div className="flex flex-col justify-around row-start-1 row-end-2 col-start-1 col-end-2 bg-white dark:bg-[#1e293b] p-4">
            <h1 className="text-center text-xl">Contadores de status das tasks</h1>
            <div className="flex items-center w-full">
                <div className="bg-red-700 h-10 w-full" />
                <div className="bg-blue-600 h-10 w-full" />
                <div className="bg-green-600 h-10 w-full" />
            </div>
            <div className="flex justify-around ">
                <div className="text-center">
                    <p className="text-xl">20%</p>
                    <span className="text-red-700 font-semibold">Atrasadas</span>
                </div>
                <div className="text-center">
                    <p className="text-xl">20%</p>
                    <span className="text-blue-600 font-semibold">Em andamento</span>
                </div>
                <div className="text-center">
                    <p className="text-xl">20%</p>
                    <span className="text-green-600 font-semibold">Concluídas</span>
                </div>
            </div>
        </div>
    );
}