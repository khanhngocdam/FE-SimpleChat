export function nowIso() {
  return new Date().toISOString();
}

export function fmtTime(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return '';
  }
}

export function mkMessage({ role, content, attachments, artifacts }) {
  return {
    id: crypto.randomUUID?.() || String(Math.random()),
    role,
    content,
    createdAt: nowIso(),
    attachments: attachments || {},
    artifacts: artifacts || {},
  };
}
