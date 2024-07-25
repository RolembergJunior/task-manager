import { tasksProps } from '@/app/types/Types';
import useSWR from 'swr';

export function useFetch( url:string ) {
    const { data, error, isLoading } = useSWR<tasksProps[]>( url, async (url:string) => {
        const response = await fetch( url );
        const data = await response.json();
    
        return data;
    });

    return { data, error, isLoading }
}

export function useFetchFolder( url:string ) {
    const { data, error, isLoading } = useSWR<String[]>( url, async (url:string) => {
        const response = await fetch( url );
        const data = await response.json();
    
        return data;
    });

    return { data, error, isLoading }
}