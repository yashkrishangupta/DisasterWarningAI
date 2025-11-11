const API_BASE_URL = 'http://localhost:5001/api';

export async function fetchDistricts() {
  const response = await fetch(`${API_BASE_URL}/districts`);
  if (!response.ok) throw new Error('Failed to fetch districts');
  return response.json();
}

export async function fetchAlerts() {
  const response = await fetch(`${API_BASE_URL}/alerts`);
  if (!response.ok) throw new Error('Failed to fetch alerts');
  return response.json();
}

export async function fetchPilgrimageRoutes() {
  const response = await fetch(`${API_BASE_URL}/routes`);
  if (!response.ok) throw new Error('Failed to fetch routes');
  return response.json();
}

export async function fetchCommunityReports() {
  const response = await fetch(`${API_BASE_URL}/reports`);
  if (!response.ok) throw new Error('Failed to fetch reports');
  return response.json();
}

export async function submitCommunityReport(reportData) {
  const response = await fetch(`${API_BASE_URL}/reports`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reportData),
  });
  if (!response.ok) throw new Error('Failed to submit report');
  return response.json();
}

export async function fetchOverallRisk() {
  const response = await fetch(`${API_BASE_URL}/overall-risk`);
  if (!response.ok) throw new Error('Failed to fetch overall risk');
  return response.json();
}
