import { get } from 'shared/utils/api/client';

const findById = async (shopId, accessToken) => {
  const url = `tienda/buscar?campo=id&valor=${shopId}`;

  return get(url, accessToken);
};

export default { findById };
