const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

async function request(path, options = {}) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(`${BASE_URL}${path}`, { ...options, signal: controller.signal });
    const isJson = res.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await res.json() : await res.text();

    if (!res.ok) {
      const msg = data?.detail || data?.error || res.statusText;
      throw new Error(msg);
    }
    return data;
  } finally {
    clearTimeout(t);
  }
}

export async function uploadImage(file) {
  const fd = new FormData();
  fd.append('file', file);
  return request('/files/image', { method: 'POST', body: fd });
}

export async function uploadCsv(file) {
  const fd = new FormData();
  fd.append('file', file);
  return request('/files/csv', { method: 'POST', body: fd });
}

export async function loadCsvFromUrl(url) {
  return request('/files/csv-from-url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
}

export async function sendChat({ sessionId, message, imageId, csvId }) {
  return request('/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      session_id: sessionId,
      message,
      image_id: imageId || null,
      csv_id: csvId || null,
    }),
  });
}
