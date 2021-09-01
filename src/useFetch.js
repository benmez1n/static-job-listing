import { useState,useEffect } from "react";
const useFetch = (url) => {
    
    useEffect(()=>{
        fetch(url)
        .then((response) => {return response.json();})
        .then(data=>{
            setIsLoading(false);
            setData(data);
            setError(null);
        })
        .catch((err)=>{
            setIsLoading(false);
            setError(err.message)
        })
    },[url])
    return {data , isLoading , error};
}
 
export default useFetch;