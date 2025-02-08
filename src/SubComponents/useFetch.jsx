
import { useState, useEffect } from 'react';

const useFetch = (url, params = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stateParam, setStateParam] = useState(null); // Track the parameter state

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            setStateParam(params); // Set the parameter state

            try {
                const queryParams = new URLSearchParams(params).toString();
                const fullUrl = queryParams ? `${url}?${queryParams}` : url;
                const response = await fetch(fullUrl);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                if (!result || Object.keys(result).length === 0) {
                    throw new Error('No data found!');
                }

                setData(result);
            } catch (err) {
                setError(err.message || 'Something went wrong!');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, params]); // Include params in dependency array to refetch if params change

    return { data, loading, error, stateParam }; // Return stateParam as well
};

export default useFetch;
