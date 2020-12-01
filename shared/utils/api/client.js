import { camelizeKeys } from 'humps';
import { BASE_URL, POST, GET } from 'shared/constants';

export const post = async (endpoint, body) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: POST,
      body,
    });

    const data = await response.json();
    return camelizeKeys(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const get = async (endpoint, accessToken) => {
  const headers = { Authorization: `Bearer ${accessToken}` };
  const response = await fetch(`${BASE_URL}${endpoint}`, { headers, method: GET });

  const data = await response.json();

  return camelizeKeys(data);
};
