import {useState, useCallback} from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method='GET', body = null, headers = {}) => {
        setLoading(true);
        try {
            if(body){
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            const response = await fetch(url, {method, body, headers});
            const data = await response.json();

            if(!response.ok){
                return data.message || 'Error';
            }

            setLoading(false);

            return data;
        } catch (e) {
            setError(e.message);
        }
    },[]);

    return {loading, request, error };
}