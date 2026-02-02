export const movementTypes = [
  { id: "income", label: "Ingreso" },
  { id: "expense", label: "Gasto" },
  { id: "transfer", label: "Transferencia" },
];

export const categoryGroups = [
  { id: "income", label: "Ingresos", type: "income" },
  { id: "expense_fixed", label: "Gastos fijos", type: "expense" },
  { id: "expense_variable", label: "Gastos variables", type: "expense" },
  { id: "savings", label: "Metas", type: "transfer" },
];

export const categories = [
  { id: "salary", label: "Sueldo", group: "income" },
  { id: "freelance", label: "Freelance", group: "income" },
  { id: "bonus", label: "Bono", group: "income" },
  { id: "rent", label: "Renta", group: "expense_fixed" },
  { id: "services", label: "Servicios", group: "expense_fixed" },
  { id: "insurance", label: "Seguro médico", group: "expense_fixed" },
  { id: "food", label: "Alimentación", group: "expense_variable" },
  { id: "transport", label: "Transporte", group: "expense_variable" },
  { id: "health", label: "Salud", group: "expense_variable" },
  { id: "savings_goal", label: "Meta mensual", group: "savings" },
  { id: "emergency", label: "Fondo emergencia", group: "savings" },
];

export function getCategoryLabel(categoryId) {
  const found = categories.find((category) => category.id === categoryId);
  return found ? found.label : categoryId;
}

export function getGroupsByType(type) {
  return categoryGroups.filter((group) => group.type === type);
}

export function getCategoriesByType(type) {
  const groups = new Set(
    categoryGroups.filter((group) => group.type === type).map((g) => g.id)
  );
  return categories.filter((category) => groups.has(category.group));
}
