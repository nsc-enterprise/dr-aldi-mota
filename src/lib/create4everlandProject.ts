
import axios from 'axios';
import FormData from 'form-data';

export async function create4everlandProject({
  name,
  deployType = 'CLI',
  platform = 'IPFS',
  secret,
}: {
  name: string;
  deployType?: string;
  platform?: string;
  secret: string;
}) {
  if (!secret) {
    throw new Error('EVERLAND_API_SECRET is not set');
  }
  const form = new FormData();
  form.append('deployType', deployType);
  form.append('name', name);
  form.append('platform', platform);

  const response = await axios.post(
    'https://hosting.api.4everland.org/project',
    form,
    {
      headers: {
        'Authorization': `Bearer ${secret}`,
        ...form.getHeaders(),
      },
    }
  );
  return response.data;
}
