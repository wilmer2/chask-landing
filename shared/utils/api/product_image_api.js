import { get } from 'shared/utils/api/client';

const findAll = async (accessToken) => get('imagen-producto/todos', accessToken);

const findByProductIds = async (productIds, accessToken) => {
  const url = `imagen-producto/todos-producto?${productIds}`;

  return get(url, accessToken);
};

export default { findAll, findByProductIds };
