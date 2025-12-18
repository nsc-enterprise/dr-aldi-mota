import FormData from 'form-data';

interface Create4everlandProjectParams {
  name: string;
  deployType?: string;
  platform?: string;
  secret: string;
}

export async function create4everlandProject({ 
  name, 
  deployType = 'CLI', 
  platform = 'IPFS', 
  secret 
}: Create4everlandProjectParams) {
  const form = new FormData();
  form.append('deployType', deployType);
  form.append('name', name);
  form.append('platform', platform);

  const response = await fetch('https://hosting.api.4everland.org/project', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${secret}`,
      ...form.getHeaders()
    },
    body: form as any // Node.js FormData compatibility with fetch
  });
  const result = await response.json();
  return result;
}

/*
// Usage example (async context):
async function runCreateProject() {
  const result = await create4everlandProject({
    name: 'Doctor Aldimir Mota',
    secret: process.env.EVERLAND_API_SECRET || ''
  });
  if (result && result.projectId) {
    console.log('Created projectId:', result.projectId);
  } else {
    console.log('Project creation response:', result);
  }
}

// Uncomment to run: runCreateProject();
*/
