import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMapMarkerAlt, faClock, faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import InputField from "./InputField";

const ContactUs = () => {
  const { register, handleSubmit, formState: { errors }, reset} = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelector(".contact-form").classList.remove("opacity-0");
      document.querySelector(".contact-form").classList.add("opacity-100");

      document.querySelector(".contact-info").classList.remove("opacity-0");
      document.querySelector(".contact-info").classList.add("opacity-100");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5050/contact-us", data);
      setMessage(res.data.message);
      reset();
    } catch (err) {
      setMessage("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gradient-to-br from-orange-100 via-teal-50 to-green-50 rounded-lg shadow-xl">
      <h1 className="text-5xl font-extrabold text-center text-orange-600 mb-4 flex items-center justify-center space-x-3">
        <FontAwesomeIcon icon={faAddressBook} size="lg" />
        <span>Get in Touch</span>
      </h1>
      <p className="text-center text-gray-700 mb-10">Let’s connect and share our love for delicious food!</p>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-white rounded-lg shadow-md p-8 contact-info opacity-0 transition-opacity duration-1000">
          <h2 className="text-3xl font-bold mb-6 text-green-700">Contact Information</h2>
          <div className="space-y-6">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="text-orange-500 w-6 h-6 mr-3" />
              <span className="text-lg font-medium text-gray-800">your.foodsite@gmail.com</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faPhone} className="text-orange-500 w-6 h-6 mr-3" />
              <span className="text-lg font-medium text-gray-800">+91 XXXXX XXXXX</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-orange-500 w-6 h-6 mr-3" />
              <span className="text-lg font-medium text-gray-800">Netaji Subhash University, Dwarka Sector-3, New Delhi</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faClock} className="text-orange-500 w-6 h-6 mr-3" />
              <span className="text-lg font-medium text-gray-800">Mon-Fri 9AM-5PM, Sat 10AM-2PM, Sun Closed</span>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-8 text-orange-600 text-center">Follow Us</h3>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="text-teal-600 hover:text-teal-800" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href="#" className="text-teal-600 hover:text-teal-800" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="#" className="text-teal-600 hover:text-teal-800" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 contact-form opacity-0 transition-opacity duration-1000">
          <h2 className="text-3xl font-bold mb-6 text-green-700">Send Us a Message</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <InputField
                id="name"
                label="Name"
                type="text"
                placeholder="Your Name"
                register={register}
                errors={errors}
                requiredMessage="Name is required"
              />
              <InputField
                id="email"
                label="Email"
                type="email"
                placeholder="your.email@example.com"
                register={register}
                errors={errors}
                requiredMessage="Email is required"
              />
              <InputField
                id="subject"
                label="Subject"
                type="text"
                placeholder="What's this about?"
                register={register}
                errors={errors}
                requiredMessage="Subject is required"
              />
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Tell us more about your inquiry..."
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  {...register("message", { required: "Message is required" })}
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
              </div>
            </div>

            <button
              type="submit"
              className={`mt-6 w-full bg-orange-600 text-white p-3 rounded-md hover:bg-orange-700 focus:ring focus:ring-orange-300 transition-all duration-300 ease-in-out transform hover:scale-105 ${loading && "cursor-wait"}`}
              disabled={loading || Object.keys(errors).length > 0}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="w-6 h-6 border-4 border-t-4 border-white border-solid rounded-full animate-spin-slow"></div>
                </div>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
          {message && <div className={`text-center mt-4 ${
              message.toLowerCase().includes("successfully") ? "text-green-600" : "text-red-500"}`}>{message}</div>
          }
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
