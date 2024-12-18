import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const Navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/contact", {
        // const response = await fetch(
        //   "https://crazycar-backend.onrender.com/contact",
        //   {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Thanks for contacting us");
        Navigate("/car");
      } else {
        console.error("Error during submission:", response.statusText);
      }
    } catch (error) {
      console.log("Error during submission:", error);
    }
  };

  return (
    <>
      <div className="contactAll">
        <div className="part1">
          <h1 className="contactHeading">Get in touch :</h1>
          <p className="contactText">
            Fill in the form to start a conversation
          </p>
          <div className="contactDetail">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="25"
              height="25"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                width="25"
                height="25"
              />
            </svg>
            <div>Surat, Gujarat, 123456</div>
          </div>

          <div className="contactDetail">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="25"
              height="25"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <div>+91 12345 67890</div>
          </div>

          <div className="contactDetail">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="25"
              height="25"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <div>support@crazycar.com</div>
          </div>
        </div>

        <form className="contactForm" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Full Name"
              className="inputFeild"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="error">Name is required</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Email"
              className="inputFeild"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="error">Email is required</p>}
          </div>

          <div>
            <textarea
              name="message"
              id="message"
              required
              placeholder="Enter Your Message"
              className="inputFeild"
              rows={5}
              {...register("message", { required: true })}
            />
            {errors.message && <p className="error">Message is required</p>}
          </div>

          <button type="submit" className="Btn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
