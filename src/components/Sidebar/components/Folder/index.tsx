

export default function Folder(){

    const folders = [
        {
            id: 1,
            name: 'Tasks futuras'
        },
        {
            id: 2,
            name: 'Tasks de desenvolvimento'
        },
        {
            id: 3,
            name: 'Bugs'
        },
        {
            id: 4,
            name: 'Melhorias'
        }
    ]

    return(
        folders.map( (folder) => {
            <div className="flex items-center gap-3">
                <p>{folder.id}</p>
                <p>{folder.name}</p>
            </div>
        } )
    );
}