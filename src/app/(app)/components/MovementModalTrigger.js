"use client";

import { useState } from "react";
import MovementForm from "./MovementForm";

export default function MovementModalTrigger({
  label,
  buttonClassName,
  defaultType,
  defaultCategory,
  onSave,
  accounts,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={buttonClassName}
        onClick={() => setIsOpen(true)}
      >
        {label}
      </button>
      <MovementForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultType={defaultType}
        defaultCategory={defaultCategory}
        onSave={onSave}
        accounts={accounts}
      />
    </>
  );
}
