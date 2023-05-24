import axios, { AxiosInstance } from 'axios';

export function useApi() {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };
    const api: AxiosInstance = axios.create ({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers
    })

    api.interceptors.request.use((config) => {
        // Ajoutez ici toute logique supplémentaire pour modifier la requête
        return config;
      });
    
      api.interceptors.response.use((response) => {
        // Ajoutez ici toute logique supplémentaire pour traiter la réponse
        return response;
      }, (error) => {
        // Ajoutez ici toute logique supplémentaire pour traiter les erreurs
        return Promise.reject(error);
      });
    
      return api;
}