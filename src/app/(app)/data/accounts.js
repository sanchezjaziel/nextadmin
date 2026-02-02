const STORAGE_KEY = "budgetapp.accounts.v1";

export function loadAccounts() {
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

export function saveAccounts(accounts) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
}

export function addAccount(account) {
  const current = loadAccounts();
  const next = [account, ...current];
  saveAccounts(next);
  return next;
}

export function removeAccount(accountId) {
  const current = loadAccounts();
  const next = current.filter((account) => account.id !== accountId);
  saveAccounts(next);
  return next;
}

export function updateAccount(accountId, patch) {
  const current = loadAccounts();
  const next = current.map((account) =>
    account.id === accountId ? { ...account, ...patch } : account
  );
  saveAccounts(next);
  return next;
}
