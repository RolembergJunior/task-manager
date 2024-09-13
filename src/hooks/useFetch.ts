import { useCallback } from 'react';
import useSWR from 'swr';

interface FetchConfig{
    url: string,
    options?: string
}

export function useFetch( config:FetchConfig ) {
    const { url, options } = config;

    const optionsFetch = options ? options : 'GET';

    const fetcher = useCallback( async (url: string) => {
        const response = await fetch( url, { method: optionsFetch } );
        const data = await response.json();

        return data;
    },[])

    const { data, isLoading, error } = useSWR( url, fetcher );

    return { data, error, isLoading };
}

export function useFetchFolder(config: FetchConfig) {
    return useFetch(config);
  }