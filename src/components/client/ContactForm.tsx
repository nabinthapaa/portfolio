"use client";

import React, { useState } from "react";

type Status = { kind: "idle" | "sending" } | { kind: "sent" | "error"; message: string };

const inputClass =
  "bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ kind: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data: { error?: string } = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus({ kind: "error", message: data.error ?? "Something went wrong." });
        return;
      }

      setStatus({ kind: "sent", message: "Thanks — I'll get back to you shortly." });
      setForm({ name: "", email: "", message: "", company: "" });
    } catch {
      setStatus({ kind: "error", message: "Could not reach the server. Please try again." });
    }
  };

  const sending = status.kind === "sending";

  return (
    <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
      <label htmlFor="name" className="flex flex-col">
        <span className="text-white font-medium mb-4">Your Name</span>
        <input
          type="text"
          name="name"
          id="name"
          required
          maxLength={100}
          value={form.name}
          onChange={handleChange}
          placeholder="What's your name?"
          className={inputClass}
        />
      </label>
      <label htmlFor="email" className="flex flex-col">
        <span className="text-white font-medium mb-4">Your Email</span>
        <input
          type="email"
          name="email"
          id="email"
          required
          maxLength={254}
          value={form.email}
          onChange={handleChange}
          placeholder="What's your email?"
          className={inputClass}
        />
      </label>
      <label htmlFor="message" className="flex flex-col">
        <span className="text-white font-medium mb-4">Your Message</span>
        <textarea
          rows={7}
          name="message"
          id="message"
          required
          maxLength={5000}
          value={form.message}
          onChange={handleChange}
          placeholder="What do you want to say?"
          className={inputClass}
        />
      </label>

      {/* Honeypot: hidden from people, filled in by bots. */}
      <input
        type="text"
        name="company"
        value={form.company}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={sending}
          className="bg-tertiay py-3 px-8 outline-none w-fit font-bold shadow-md shadow-primary rounded-xl disabled:opacity-60"
        >
          {sending ? "Sending...." : "Send"}
        </button>
        {(status.kind === "sent" || status.kind === "error") && (
          <p
            role="status"
            className={`text-[14px] ${status.kind === "sent" ? "text-white" : "text-[#ff8a8a]"}`}
          >
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
