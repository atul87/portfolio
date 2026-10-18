"use client";
// @flow strict
import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError((current) => ({ ...current, required: false }));
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (!userInput.email || !userInput.message || !userInput.name) {
      setError((current) => ({ ...current, required: true }));
      return;
    } else if (!isValidEmail(userInput.email)) {
      setError((current) => ({ ...current, email: true }));
      return;
    } else {
      setError({ email: false, required: false });
    };

    try {
      setIsLoading(true);
      await axios.post("/api/contact", userInput);

      toast.success("Message sent successfully!");
      setUserInput({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      const apiMessage = error?.response?.data?.message;
      if (apiMessage === "Email sender credentials are missing.") {
        toast.error("The contact form is not fully configured yet. Please email me directly at atulverma15704@gmail.com.");
      } else {
        toast.error(apiMessage || "Failed to send message. Please try again.");
      }
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} theme="dark" />
      <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">Get in touch</p>
      <div className="max-w-3xl text-white rounded-lg border border-[#464c6a] p-3 lg:p-5">
        <p className="text-sm text-[#d3d8e8]">{"If you have any questions or concerns, please don't hesitate to contact me. I am open to any work opportunities that align with my skills and interests."}</p>
        <form onSubmit={handleSendMail} noValidate className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="text-base">Your Name: </label>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2 placeholder:text-[#8f96ad]"
              type="text"
              maxLength="100"
              required={true}
              placeholder="Your name"
              aria-invalid={error.required && !userInput.name}
              onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
              onBlur={checkRequired}
              value={userInput.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="text-base">Your Email: </label>
            <input
              id="contact-email"
              name="email"
              autoComplete="email"
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2 placeholder:text-[#8f96ad]"
              type="email"
              maxLength="100"
              required={true}
              placeholder="you@example.com"
              aria-invalid={error.email || (error.required && !userInput.email)}
              aria-describedby={error.email ? "email-error" : undefined}
              value={userInput.email}
              onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
              onBlur={() => {
                checkRequired();
                setError((current) => ({ ...current, email: !isValidEmail(userInput.email) }));
              }}
            />
            {error.email && <p id="email-error" className="text-sm text-red-400">Please provide a valid email.</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-message" className="text-base">Your Message: </label>
            <textarea
              id="contact-message"
              name="message"
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2 placeholder:text-[#8f96ad]"
              maxLength="500"
              required={true}
              placeholder="Tell me a little about your project or opportunity."
              aria-invalid={error.required && !userInput.message}
              onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
              onBlur={checkRequired}
              rows="4"
              value={userInput.message}
            />
          </div>

          {/* Honeypot field for bot protection */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={userInput.website || ""}
              onChange={(e) => setUserInput({ ...userInput, website: e.target.value })}
            />
          </div>

          <div className="flex flex-col items-center gap-3">
            {error.required && <p className="text-sm text-red-400" role="alert">
              Please complete all fields.
            </p>}
            <button
              type="submit"
              className="flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-5 py-2.5 text-center text-xs font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:gap-3 hover:text-white hover:no-underline disabled:cursor-not-allowed disabled:opacity-60 md:px-12 md:py-3 md:text-sm md:font-semibold cursor-pointer focus-visible:ring-2 focus-visible:ring-[#16f2b3] focus:outline-none"
              disabled={isLoading}
            >
              {
                isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sending Message...
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    Send Message
                    <TbMailForward size={20} />
                  </span>
                )
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
