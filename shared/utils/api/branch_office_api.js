import { get } from 'shared/utils/api/client';

const searchByName = async (branchOfficeName, accessToken) => {
  const url = `sucursal/buscar?campo=nombre_sucursal&valor=${branchOfficeName}`;

  return get(url, accessToken);
};

export default { searchByName };
