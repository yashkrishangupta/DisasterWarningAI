const API_BASE_URL = '/api';

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

export async function fetchRoutes() {
  const response = await fetch(`${API_BASE_URL}/routes`);
  if (!response.ok) throw new Error('Failed to fetch routes');
  return response.json();
}

// Alias for Dashboard component
export const fetchPilgrimageRoutes = fetchRoutes;

export async function fetchReports() {
  const response = await fetch(`${API_BASE_URL}/reports`);
  if (!response.ok) throw new Error('Failed to fetch reports');
  return response.json();
}

// Alias for Dashboard component
export const fetchCommunityReports = fetchReports;

export async function fetchOverallRisk() {
  const response = await fetch(`${API_BASE_URL}/overall-risk`);
  if (!response.ok) throw new Error('Failed to fetch overall risk');
  return response.json();
}

export async function submitCommunityReport(report) {
  const response = await fetch(`${API_BASE_URL}/reports`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(report),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to submit report');
  }
  
  return response.json();
}

// Admin API functions
export async function adminLogin(username, password) {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }
  
  return response.json();
}

export async function adminLogout() {
  const response = await fetch(`${API_BASE_URL}/admin/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error('Logout failed');
  }
  
  return response.json();
}

export async function checkAdminAuth() {
  const response = await fetch(`${API_BASE_URL}/admin/me`, {
    credentials: 'include',
  });
  
  if (!response.ok) {
    return { authenticated: false };
  }
  
  return response.json();
}

export async function fetchAdminReports() {
  const response = await fetch(`${API_BASE_URL}/admin/reports`, {
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch reports');
  }
  
  return response.json();
}

export async function updateReportStatus(id, status) {
  const response = await fetch(`${API_BASE_URL}/admin/reports/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ status }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update report');
  }
  
  return response.json();
}
