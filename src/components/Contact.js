import React, { useState, useEffect } from "react";
import { init, send } from "emailjs-com";
import  useContactForm  from "../hooks/useContactForm";

const Contact = () => {

  const {
    formData,
    errors,
    isSent,
    isSubmitting,
    handleChange,
    handleSubmit
  } = useContactForm();

  return (
    <section id="contact" className="py-20 bg-zinc-900 text-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Get in Touch
          </h3>
          <p className="text-base lg:text-lg mt-4 text-gray-300">
            Feel free to reach out with any questions or collaborations!
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-12 max-w-2xl mx-auto border border-gray-800 p-6 lg:p-8 rounded-xl shadow-2xl bg-zinc-900/50 backdrop-blur-sm"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="w-full md:w-1/2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                disabled={isSubmitting}
                className={`w-full p-4 bg-zinc-800/50 border ${
                  errors.name ? "border-red-500" : "border-gray-700"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300`}
              />
              {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div className="w-full md:w-1/2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                disabled={isSubmitting}
                className={`w-full p-4 bg-zinc-800/50 border ${
                  errors.email ? "border-red-500" : "border-gray-700"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300`}
              />
              {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
            </div>
          </div>
          <div className="mb-6">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="4"
              disabled={isSubmitting}
              className={`w-full p-4 bg-zinc-800/50 border ${
                errors.message ? "border-red-500" : "border-gray-700"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300`}
            ></textarea>
            {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 rounded-lg text-lg font-semibold 
            ${!isSubmitting ? 'hover:from-blue-600 hover:to-green-600 hover:-translate-y-1' : 'opacity-75 cursor-not-allowed'}
            transition duration-300 transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          {errors.submit && <p className="mt-4 text-red-500 text-center">{errors.submit}</p>}
        </form>

        {isSent && <p className="text-green-500 text-center mt-4">Message sent successfully!</p>}
      </div>
    </section>
  );
};

export default Contact;