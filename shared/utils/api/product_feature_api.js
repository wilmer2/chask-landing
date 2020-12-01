import { get } from 'shared/utils/api/client';

const findAllPurchased = async (productIds, accessToken) => {
  const url = `caracteristica-costo-producto/todos-producto?${productIds}`;

  return get(url, accessToken);
};

const findAllFree = async (productIds, accessToken) => {
  const url = `caracteristica-gratis-producto/todos-producto?${productIds}`;

  return get(url, accessToken);
};

const findByProductIdFree = async (productId, accessToken) => {
  const url = `caracteristica-gratis-producto/buscar?campo=id_producto&valor=${productId}`;

  return get(url, accessToken);
};

const findByProductIdPurchased = async (productId, accessToken) => {
  const url = `caracteristica-costo-producto/buscar?campo=id_producto&valor=${productId}`;

  return get(url, accessToken);
};

export default { findAllPurchased, findAllFree, findByProductIdFree, findByProductIdPurchased };
