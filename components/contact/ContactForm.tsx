"use client";

import React, { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
});

const inputClass =
  "w-full bg-surface border border-white/[0.08] rounded-sm px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-white/20 transition-colors duration-200";

const labelClass = "block text-[10px] uppercase tracking-[0.2em] text-text-muted mb-2";

export function ContactForm() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast.success("Mensaje enviado. Hugo se pondrá en contacto a la brevedad.");
      setForm({ nombre: "", email: "", mensaje: "" });
    } catch {
      toast.error("No se pudo enviar el mensaje. Intentá de nuevo.");
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
      initial="initial"
      animate="animate"
    >
      <motion.div {...fadeUp(0.3)}>
        <label className={labelClass}>Nombre</label>
        <input
          type="text"
          required
          placeholder="Tu nombre"
          value={form.nombre}
          onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
          className={inputClass}
        />
      </motion.div>

      <motion.div {...fadeUp(0.38)}>
        <label className={labelClass}>Email</label>
        <input
          type="email"
          required
          placeholder="tu@email.com"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className={inputClass}
        />
      </motion.div>

      <motion.div {...fadeUp(0.46)}>
        <label className={labelClass}>Mensaje</label>
        <textarea
          required
          rows={5}
          placeholder="¿En qué podemos ayudarte?"
          value={form.mensaje}
          onChange={(e) => setForm((f) => ({ ...f, mensaje: e.target.value }))}
          className={`${inputClass} resize-none`}
        />
      </motion.div>

      <motion.div {...fadeUp(0.54)}>
        <button
          type="submit"
          disabled={sending}
          className="w-full py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] bg-text-primary text-base transition-opacity hover:opacity-85 active:opacity-70 disabled:opacity-40 rounded-sm"
        >
          {sending ? "Enviando…" : "Enviar mensaje"}
        </button>
      </motion.div>
    </motion.form>
  );
}
