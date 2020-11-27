import { get } from 'shared/utils/api/client';

const findByBranchOfficeId = async (branchOfficeId, accessToken) => {
  const url = `producto/buscar?campo=id_sucursal&valor=${branchOfficeId}`;

  return get(url, accessToken);
};

export default { findByBranchOfficeId };
