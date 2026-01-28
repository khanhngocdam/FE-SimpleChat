export function validateImage(file) {
  if (!file) return 'No file selected';
  const ok = ['image/png', 'image/jpeg'].includes(file.type);
  if (!ok) return 'Only PNG/JPG supported';
  if (file.size > 10 * 1024 * 1024) return 'Max 10MB';
  return null;
}

export function validateCsv(file) {
  if (!file) return 'No file selected';
  const ok =
    file.type.includes('csv') ||
    file.name.toLowerCase().endsWith('.csv') ||
    file.type === 'text/plain';
  if (!ok) return 'Please upload a .csv file';
  if (file.size > 20 * 1024 * 1024) return 'Max 20MB';
  return null;
}

export function validateUrl(url) {
  try {
    new URL(url);
    return null;
  } catch {
    return 'Invalid URL';
  }
}
