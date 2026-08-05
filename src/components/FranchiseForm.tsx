"use client";

import { useId, useState } from "react";

import type { Dictionary } from "@/i18n/dictionaries";
import styles from "./FranchiseForm.module.css";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<"name" | "phone" | "email" | "city", string>>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Reports the conversion. No personal data is ever passed to either provider. */
function trackLead() {
  window.gtag?.("event", "generate_lead", { form: "franchise" });
  window.fbq?.("track", "Lead");
}

/**
 * The one lead path on the site, so it is deliberately unglamorous and correct:
 * inline errors tied to inputs via aria-describedby, no alert(), no PII logged,
 * and a honeypot that real users never see.
 */
export default function FranchiseForm({ t }: { t: Dictionary }) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const f = t.franchise.form;

  function validate(data: FormData): FieldErrors {
    const next: FieldErrors = {};
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const city = String(data.get("city") ?? "").trim();

    if (name.length < 2) next.name = f.errorName;
    // Deliberately permissive: KSA numbers get written +966, 05, and 5 forms.
    if (phone.replace(/[^\d]/g, "").length < 8) next.phone = f.errorPhone;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = f.errorEmail;
    if (city.length < 2) next.city = f.errorCity;

    return next;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/franchise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      if (!res.ok) throw new Error(String(res.status));
      trackLead();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className={styles.success}>
        <h3 className={styles.successTitle}>{f.successTitle}</h3>
        <p className={styles.successBody}>{f.successBody}</p>
      </div>
    );
  }

  const fields = [
    {
      name: "name" as const,
      label: f.name,
      placeholder: f.namePlaceholder,
      type: "text",
      autoComplete: "name",
    },
    {
      name: "phone" as const,
      label: f.phone,
      placeholder: f.phonePlaceholder,
      type: "tel",
      autoComplete: "tel",
    },
    {
      name: "email" as const,
      label: f.email,
      placeholder: f.emailPlaceholder,
      type: "email",
      autoComplete: "email",
    },
    {
      name: "city" as const,
      label: f.city,
      placeholder: f.cityPlaceholder,
      type: "text",
      autoComplete: "address-level2",
    },
  ];

  return (
    <form onSubmit={onSubmit} noValidate className={styles.form}>
      {fields.map((field) => {
        const fieldId = `${id}-${field.name}`;
        const errorId = `${fieldId}-error`;
        const invalid = Boolean(errors[field.name]);
        return (
          <div key={field.name}>
            <label htmlFor={fieldId} className={styles.label}>
              {field.label}
              <span className={styles.optional}>({f.required})</span>
            </label>
            <input
              id={fieldId}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              aria-invalid={invalid || undefined}
              aria-describedby={invalid ? errorId : undefined}
              className={`${styles.input} ${invalid ? styles.inputInvalid : ""}`}
            />
            {invalid && (
              <p id={errorId} className={styles.fieldError}>
                {errors[field.name]}
              </p>
            )}
          </div>
        );
      })}

      <div>
        <label htmlFor={`${id}-message`} className={styles.label}>
          {f.message}
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={4}
          placeholder={f.messagePlaceholder}
          className={styles.textarea}
        />
      </div>

      <div aria-hidden="true" className={styles.honeypot}>
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p role="alert" className={styles.formError}>
          {f.errorGeneric}
        </p>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn btnPrimary">
        {status === "submitting" ? f.submitting : f.submit}
      </button>
    </form>
  );
}
