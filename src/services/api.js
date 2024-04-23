

const config = {
    method: 'GET',
}

export const getTasks = async () =>{
    const response = await fetch('http://localhost:3000/tarefas', config)
    .then( response => response.json() )

    return response
}


export const getOnlyTask = async (id) => {
    const response = await fetch(`http://localhost:3000/tarefas/?id=${id}`)
    .then( response => response.json() )

    return response
}