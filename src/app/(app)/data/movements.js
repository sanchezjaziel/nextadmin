const STORAGE_KEY = "budgetapp.movements.v1";

export function loadMovements() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveMovements(movements) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(movements));
}

export function addMovement(movement) {
  const current = loadMovements();
  const next = [movement, ...current];
  saveMovements(next);
  return next;
}
