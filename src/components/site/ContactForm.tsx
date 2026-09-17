"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 12);
  if (!digits) return "";
  const cc = digits.startsWith("375") ? "375" : digits.startsWith("7") ? "7" : "";
  if (!cc) return `+${digits}`;
  const rest = digits.slice(cc.length);
  const parts = [rest.slice(0, 2), rest.slice(2, 5), rest.slice(5, 7), rest.slice(7, 9)].filter(
    Boolean,
  );
  return `+${cc}${parts.length ? " " + parts.join(" ") : ""}`;
}

export function ContactForm({ source }: { source?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      toast.error("Укажите имя", { description: "Минимум 2 символа." });
      return;
    }
    if (phone.replace(/\D/g, "").length < 11) {
      toast.error("Проверьте номер телефона", { description: "Формат +375 XX XXX XX XX." });
      return;
    }

    try {
      const response = await fetch("/api/send-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          message: source ? `[Страница: ${source}] ${message}` : message,
        }),
      });
      if (!response.ok) throw new Error("Failed to send");

      toast.success("Заявка отправлена", {
        description: "Свяжемся с вами в течение рабочего дня и согласуем бесплатный замер.",
      });
      setName("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Ошибка отправки", {
        description: "Попробуйте позже или позвоните нам напрямую.",
      });
    }
  };

  return (
    <form
      onSubmit={submit}
      className="mt-8 grid gap-4 border border-border bg-card p-6 transition-shadow duration-700 focus-within:border-bronze/50 focus-within:shadow-[0_18px_50px_color-mix(in_oklab,var(--ink)_10%,transparent)] sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-xs tracking-widest uppercase">
            Имя
          </label>
          <Input
            id="name"
            value={name}
            maxLength={60}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как к вам обращаться"
            className="h-12 rounded-sm"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="phone" className="text-xs tracking-widest uppercase">
            Телефон (РБ / РФ)
          </label>
          <Input
            id="phone"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="+375 29 000 00 00"
            className="h-12 rounded-sm"
          />
        </div>
      </div>
      <div className="grid gap-2">
        <label htmlFor="msg" className="text-xs tracking-widest uppercase">
          Описание задачи
        </label>
        <Textarea
          id="msg"
          value={message}
          maxLength={1000}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Объект, площадь, сроки, что нужно сделать"
          className="min-h-32 rounded-sm"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="pressable bronze-sweep group h-12 bg-ink text-chalk hover:bg-ink-soft"
      >
        Получить расчёт сметы{" "}
        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-2" />
      </Button>
      <p className="text-xs text-muted-foreground">
        Нажимая кнопку, вы соглашаетесь на обработку контактных данных для связи по заявке.
      </p>
    </form>
  );
}
