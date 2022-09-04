const baseUrl = 'https://api.unsplash.com/';

export const fetcher = (url) => fetch(baseUrl + url).then((res) => res.json());
