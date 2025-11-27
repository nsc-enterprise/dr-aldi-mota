import FormData from 'form-data';

export async function create4everlandProject({ name, deployType = 'CLI', platform = 'IPFS', secret }) {
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
    body: form
  });
  const result = await response.json();
  return result;
}


// Usage example (async context):
async function runCreateProject() {
  const result = await create4everlandProject({
    name: 'Doctor Aldimir Mota',
    secret: process.env.EVERLAND_API_SECRET
  });
  if (result && result.projectId) {
    console.log('Created projectId:', result.projectId);
  } else {
    console.log('Project creation response:', result);
  }
}

runCreateProject();

