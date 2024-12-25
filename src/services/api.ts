import axios from 'axios';

const YOUR_ACCESS_KEY = 'TK19cVFKHM46yorp5ndTNk1CMLG-TbvdXSEQNs0bYZA';
axios.defaults.baseURL = 'https://api.unsplash.com';

axios.defaults.params = {
  per_page: 30,
  orientation: 'landscape',
};

export const fetchImages = async <T> (query: string, page: number): Promise<T> => {
  try {
    const response = await axios.get<T>(`/search/photos`, {
    params: {
      query,
      page,
    },
    headers: {
            Authorization: `Client-ID ${YOUR_ACCESS_KEY}`,
          },
  });
  return response.data;
  } catch (error) {
    throw error;
  }
};
