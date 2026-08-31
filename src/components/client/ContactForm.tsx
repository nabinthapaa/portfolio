"use client";

import emailjs from "@emailjs/browser";
import React, { useRef, useState } from "react";

const EMAILJS_SERVICE = process.env.NEXT_PUBLIC_EMAILJS_SERVICE;
const EMAILJS_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE;
const EMAILJS_PUBLIC = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC;
const EMAILJS_TO_NAME = process.env.NEXT_PUBLIC_EMAILJS_TO_NAME;
const EMAILJS_TO_EMAIL = process.env.NEXT_PUBLIC_EMAILJS_TO_EMAIL;

const inputClass =
  "bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium";

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!EMAILJS_SERVICE || !EMAILJS_TEMPLATE || !EMAILJS_PUBLIC) {
      console.error("EmailJS environment variables are not configured.");
      alert("An error occurred, Please try again");
      return;
    }

    setLoading(true);
    emailjs
      .send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          from_name: form.name,
          to_name: EMAILJS_TO_NAME,
          from_email: form.email,
          to_email: EMAILJS_TO_EMAIL,
          message: form.message,
        },
        { publicKey: EMAILJS_PUBLIC },
      )
      .then(
        (result) => {
          console.log(result.text);
          setLoading(false);
          alert("Message Sent, I'll get back to you shortly");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.log(error);
          alert("An error occurred, Please try again");
        },
      );
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="mt-12 flex flex-col gap-8"
    >
      <label htmlFor="name" className="flex flex-col">
        <span className="text-white font-medium mb-4">Your Name</span>
        <input
          type="text"
          name="name"
          id="name"
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
          value={form.message}
          onChange={handleChange}
          placeholder="What do you want to say?"
          className={inputClass}
        />
      </label>
      <button
        type="submit"
        className="bg-tertiay py-3 px-8 outline-none w-fit font-bold shadow-md shadow-primary rounded-xl"
      >
        {loading ? "Sending...." : "Send"}
      </button>
    </form>
  );
};

export default ContactForm;
