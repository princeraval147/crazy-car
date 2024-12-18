import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../../index.css";

const Addcar = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const Navigate = useNavigate();
  const [modelExists, setModelExists] = useState(false);
  const [priceUnit, setPriceUnit] = useState("Lakhs");

  // Check if model exists
  const checkModelAvailability = async (model) => {
    try {
      const response = await fetch(`http://localhost:5000/checkmodel/${model}`);
      // const response = await fetch(
      //   `https://crazycar-backend.onrender.com/checkmodel/${model}`
      // );
      const result = await response.json();
      if (response.ok && result.exists) {
        setError("model", { type: "manual", message: "Model already exists" });
        setModelExists(true);
      } else {
        clearErrors("model");
        setModelExists(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  const onSubmit = async (data) => {
    // Append priceUnit to price (e.g., 2 Lakhs)
    data.price = `${data.price} ${priceUnit}`;

    try {
      const response = await fetch("http://localhost:5000/cardata", {
        // const response = await fetch(
        //   "https://crazycar-backend.onrender.com/cardata",
        //   {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Car Added Successelly");
        Navigate("/car");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-car-form">
      <h1 className="addCarHeading">Add Car</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="car-form">
        <div className="form-left">
          <label>
            Model:
            <input
              type="text"
              {...register("model", { required: "Model is required" })}
              className="inputFeild"
              onBlur={(e) => checkModelAvailability(e.target.value)}
            />
            {modelExists && (
              <span className="errorMsg">{errors.model?.message}</span>
            )}
          </label>
          <label>
            Brand:
            <input
              type="text"
              {...register("brand", { required: "Brand is required" })}
              className="inputFeild"
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              step={0.01}
              {...register("price", {
                required: "Price is required",
                min: { value: 3, message: "Price cannot be negative" },
              })}
              className="inputFeild"
              onKeyDown={preventMinus}
              min={3}
            />
            <select
              value={priceUnit}
              onChange={(e) => setPriceUnit(e.target.value)}
              className="inputFeild"
            >
              <option value="Lakhs">Lakhs</option>
              <option value="Crores">Crores</option>
            </select>
            {errors.price && (
              <span style={{ color: "red" }}>{errors.price.message}</span>
            )}
          </label>
          <label>
            Year:
            <input
              type="number"
              {...register("year", {
                required: "Year is required",
                min: { value: 1900, message: "Year must be greater than 1900" },
                max: {
                  value: new Date().getFullYear(),
                  message: `Year cannot be beyond ${new Date().getFullYear()}`,
                },
              })}
              className="inputFeild"
              min={1900}
            />
            {errors.year && (
              <span style={{ color: "red" }}>{errors.year.message}</span>
            )}
          </label>
          <label>Fuel Type:</label>
          <div className="radioBtn">
            <input
              id="Electric"
              type="radio"
              value="Electric"
              {...register("fuelType", { required: "Fuel type is required" })}
            />
            <label htmlFor="Electric">Electric</label>
            <input
              id="Petrol"
              type="radio"
              value="Petrol"
              {...register("fuelType", { required: "Fuel type is required" })}
            />
            <label htmlFor="Petrol">Petrol</label>
            <input
              id="Diesel"
              type="radio"
              value="Diesel"
              {...register("fuelType", { required: "Fuel type is required" })}
            />
            <label htmlFor="Diesel">Diesel</label>
          </div>
          {errors.fuelType && (
            <span style={{ color: "red" }}>{errors.fuelType.message}</span>
          )}
          <br></br>
          <label>Transmission:</label>
          <div className="radioBtn">
            <input
              id="Auto"
              type="radio"
              value="Automatic"
              {...register("transmission", {
                required: "Transmission is required",
              })}
            />
            <label htmlFor="Auto">Automatic</label>
            <input
              id="Manual"
              type="radio"
              value="Manual"
              {...register("transmission", {
                required: "Transmission is required",
              })}
            />
            <label htmlFor="Manual">Manual</label>
          </div>
          {errors.transmission && (
            <span style={{ color: "red" }}>{errors.transmission.message}</span>
          )}
          <br></br>
          <label>Seating Capacity:</label>
          <div className="radioBtn">
            <input
              id="5"
              type="radio"
              value="5"
              {...register("seatingCapacity", {
                required: "Seating capacity is required",
              })}
            />
            <label htmlFor="5">5</label>
            <input
              id="7"
              type="radio"
              value="7"
              {...register("seatingCapacity", {
                required: "Seating capacity is required",
              })}
            />
            <label htmlFor="7">7</label>
          </div>
          <br></br>
          <div>
            <label>
              Body Type:
              <input
                type="text"
                {...register("bodyType", { required: "Body type is required" })}
                className="inputFeild"
              />
            </label>
          </div>
          {errors.seatingCapacity && (
            <span style={{ color: "red" }}>
              {errors.seatingCapacity.message}
            </span>
          )}
        </div>

        <div className="form-right">
          <label>
            Mileage (km/l):
            <input
              type="text"
              {...register("mileage", { required: "Mileage is required" })}
              className="inputFeild"
            />
          </label>

          <label>
            Engine Capacity (cc):
            <input
              type="text"
              {...register("engineCapacity")}
              className="inputFeild"
            />
          </label>

          <label>
            Boot Space (liters):
            <input
              type="number"
              {...register("bootSpace", {
                required: "Boot space is required",
                min: { value: 0, message: "Boot space cannot be negative" },
              })}
              className="inputFeild"
            />
            {errors.bootSpace && (
              <span style={{ color: "red" }}>{errors.bootSpace.message}</span>
            )}
          </label>

          <label>
            Safety Features:
            <input
              type="text"
              {...register("safetyFeatures", {
                required: "Safety features are required",
              })}
              className="inputFeild"
            />
          </label>
          <label>
            Features:
            <input
              type="text"
              {...register("features", { required: "Features are required" })}
              className="inputFeild"
            />
          </label>
          <label>
            Warranty:
            <input
              type="text"
              {...register("warranty", { required: "Warranty is required" })}
              className="inputFeild"
            />
          </label>
          <label>
            Description:
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="inputFeild textarea-input"
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              {...register("image", { required: "Image URL is required" })}
              className="inputFeild"
            />
          </label>
        </div>
        <div className="form-button-container">
          <button type="submit" className="form-button">
            Add Car
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addcar;
