function isClientSide(){
    return typeof window !== 'undefined';
};

export async function isServer(){
    return isClientSide();
};