import { get } from 'shared/utils/api/client';

const findAllPurchased = async (productIds, accessToken) => {
  const url = `caracteristica-costo-producto/todos-producto?${productIds}`;
  return get(url, accessToken);
};

const findAllFree = async (productIds, accessToken) => {
  const url = `caracteristica-gratis-producto/todos-producto?${productIds}`;
  return get(url, accessToken);
};

export default { findAllPurchased, findAllFree };
