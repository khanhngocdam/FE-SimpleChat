import customAxios from 'src/config/axios';

/* ===================== FILE UPLOAD ===================== */

export async function uploadImage(file) {
  const fd = new FormData();
  fd.append('file', file);

  const res = await customAxios.post('/files/image', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data;
}

export async function uploadCsv(file) {
  const fd = new FormData();
  fd.append('file', file);

  const res = await customAxios.post('/files/csv', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data;
}

export async function loadCsvFromUrl(url) {
  const res = await customAxios.post('/files/csv-from-url', { url });
  return res.data;
}

/* ===================== CHAT ===================== */

export async function sendChat({ sessionId, message, imageId, csvId }) {
  const res = await customAxios.post('/chat', {
    session_id: sessionId,
    message,
    image_id: imageId || null,
    csv_id: csvId || null,
  });

  return res.data;
}
