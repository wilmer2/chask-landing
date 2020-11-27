import { post } from 'shared/utils/api/client';
import FormData from 'form-data';

const login = async () => {
  const data = new FormData();
  data.append('email', 'dante.e.cortes@gmail.com');
  data.append('password', 'secret');

  return post('auth/login', data);
};

export default { login };
