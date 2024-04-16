

export default function MenuFilter(){
    return(
        <div className="flex gap-3">
            <div className="active:border active:border-b-black hover:cursor-pointer hover:bg-zinc-200 hover:rounded-md transition-all  p-3 ">
                <p className="text-md font-medium text-black/50 ">Não inciados</p>
            </div>
            <div className="active:border active:border-b-black hover:cursor-pointer hover:bg-zinc-200 hover:rounded-md transition-all  p-3 ">
                <p className="text-md font-medium text-black/50 ">Fazer</p>
            </div>
            <div className="active:border active:border-b-black hover:cursor-pointer hover:bg-zinc-200 hover:rounded-md transition-all  p-3 ">
                <p className="text-md font-medium text-black/50 ">Em andamento</p>
            </div>
            <div className="active:border active:border-b-black hover:cursor-pointer hover:bg-zinc-200 hover:rounded-md transition-all  p-3 ">
                <p className="text-md font-medium text-black/50 ">Atrasados</p>
            </div>
            <div className="active:border active:border-b-black hover:cursor-pointer hover:bg-zinc-200 hover:rounded-md transition-all  p-3 ">
                <p className="text-md font-medium text-black/50 ">Concluídos</p>
            </div>
        </div>
    );
}