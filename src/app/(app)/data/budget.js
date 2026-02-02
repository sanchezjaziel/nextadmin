const STORAGE_KEY = "budgetapp.budget.v1";

export function loadBudget() {
  if (typeof window === "undefined") return { month: "", amount: "" };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { month: "", amount: "" };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return { month: "", amount: "" };
    }
    return {
      month: parsed.month || "",
      amount: parsed.amount || "",
    };
  } catch {
    return { month: "", amount: "" };
  }
}

export function saveBudget(budget) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(budget));
}
