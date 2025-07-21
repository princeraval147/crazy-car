import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const UpdateCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const [priceUnit, setPriceUnit] = useState("Lakhs");

  // Fetch car data by ID
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getcardata/${id}`);
        const data = await response.json();

        // Split price into two parts (number and unit)
        const priceNumber = parseFloat(data.price);
        const priceUnit = data.price.includes("Lakhs") ? "Lakhs" : "Crores";
        const priceValue = priceNumber ? priceNumber : 0;
        const images = data.image || [];
        const image1 = images[0] || ""; // Set the first image URL if available
        const image2 = images[1] || ""; // Set the second image URL if available
        // Set form values
        reset({
          model: data.model,
          brand: data.brand,
          price: priceValue,
          year: data.year,
          fuelType: data.fuelType,
          mileage: data.mileage,
          transmission: data.transmission,
          engineCapacity: data.engineCapacity || "", // Make sure to handle undefined or missing values
          seatingCapacity: data.seatingCapacity,
          bodyType: data.bodyType,
          safetyFeatures: data.safetyFeatures.join(", "),
          bootSpace: data.bootSpace,
          features: data.features.join(", "),
          warranty: data.warranty,
          description: data.description,
          image1: data.image[0],
          image2: data.image[1],
        });

        setPriceUnit(priceUnit);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCarData();
  }, [id, reset]);

  const onSubmit = async (formData) => {
    const updatedCarData = {
      ...formData,
      price: `${formData.price} ${priceUnit}`,
      safetyFeatures: formData.safetyFeatures
        .split(",")
        .map((feature) => feature.trim()),
      features: formData.features.split(",").map((feature) => feature.trim()),
    };

    try {
      const response = await fetch(`http://localhost:5000/updatecar/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCarData),
      });

      if (response.ok) {
        navigate("/car");
      } else {
        console.error("Error updating car data");
      }
    } catch (error) {
      console.error("Error updating car data:", error);
    }
  };

  return (
    <div className="UpdateContainer">
      <h1 className="UpdateTitle">Update Car</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="UpdateForm">
        <div className="updateFormLeft">
          <label className="UpdateLabel">
            Model:
            <input
              type="text"
              className="inputFeild"
              disabled
              {...register("model", { required: "Model is required" })}
            />
          </label>

          <label className="UpdateLabel">
            Brand:
            <input
              type="text"
              className="inputFeild"
              {...register("brand", { required: "Brand is required" })}
              disabled
            />
          </label>

          <label className="UpdateLabel">
            Price:
            <input
              type="number"
              step="0.01"
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
                min: { value: 3.0, message: "Price must be a positive number" },
              })}
              className="inputFeild"
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
              <span className="errorMsg">{errors.price.message}</span>
            )}
          </label>

          <label className="UpdateLabel">
            Year:
            <input
              type="number"
              className="inputFeild"
              {...register("year", {
                required: "Year is required",
                valueAsNumber: true,
                min: { value: 1900, message: "Year must be greater than 1900" },
                max: {
                  value: new Date().getFullYear(),
                  message: `Year cannot be beyond ${new Date().getFullYear()}`,
                },
              })}
              min={1900}
            />
            {errors.year && (
              <span className="errorMsg">{errors.year.message}</span>
            )}
          </label>

          <label className="UpdateLabel">
            Fuel Type:
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
                className={{ marginBottom: "20px" }}
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
              {errors.fuelType && (
                <span className="errorMsg">{errors.fuelType.message}</span>
              )}
            </div>
          </label>

          <label className="UpdateLabel">
            Mileage:
            <input
              type="text"
              {...register("mileage", { required: "Mileage is required" })}
              className="inputFeild"
            />
            {errors.mileage && (
              <span className="errorMsg">{errors.mileage.message}</span>
            )}
          </label>
          <label className="UpdateLabel">
            Transmission:
            <div className="radioBtn">
              <input
                id="Automatic"
                type="radio"
                value="Automatic"
                className={{ marginBottom: "20px" }}
                {...register("transmission", {
                  required: "Transmission is required",
                })}
              />
              <label htmlFor="Automatic">Automatic</label>
              <input
                id="Manual"
                type="radio"
                value="Manual"
                {...register("transmission", {
                  required: "Transmission is required",
                })}
              />{" "}
              <label htmlFor="Manual">Manual</label>
              {errors.transmission && (
                <span className="errorMsg">{errors.transmission.message}</span>
              )}
            </div>
          </label>
          <label className="UpdateLabel">
            Engine Capacity (cc):
            <input
              type="text"
              {...register("engineCapacity", {
                required: "Engine capacity is required",
              })}
              className="inputFeild"
            />
            {errors.engineCapacity && (
              <span className="errorMsg">{errors.engineCapacity.message}</span>
            )}
          </label>
        </div>

        <div className="UpdateFormRight">
          <label className="UpdateLabel">
            Seating Capacity:
            <input
              type="number"
              {...register("seatingCapacity", {
                required: "Seating capacity is required",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Seating capacity must be at least 1",
                },
              })}
              className="inputFeild"
            />
            {errors.seatingCapacity && (
              <span className="errorMsg">{errors.seatingCapacity.message}</span>
            )}
          </label>

          <label className="UpdateLabel">
            Body Type:
            <input
              type="text"
              {...register("bodyType", { required: "Body type is required" })}
              className="inputFeild"
            />
            {errors.bodyType && (
              <span className="errorMsg">{errors.bodyType.message}</span>
            )}
          </label>

          <label className="UpdateLabel">
            Boot Space (liters):
            <input
              type="number"
              {...register("bootSpace", {
                required: "Boot space is required",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Boot space must be a positive number",
                },
              })}
              className="inputFeild"
            />
            {errors.bootSpace && (
              <span className="errorMsg">{errors.bootSpace.message}</span>
            )}
          </label>

          <label className="UpdateLabel">
            Safety Features:
            <input
              type="text"
              {...register("safetyFeatures", {
                required: "Safety features are required",
              })}
              className="inputFeild"
            />
            {errors.safetyFeatures && (
              <span className="errorMsg">{errors.safetyFeatures.message}</span>
            )}
          </label>

          <label className="UpdateLabel">
            Features:
            <input
              type="text"
              {...register("features", { required: "Features are required" })}
              className="inputFeild"
            />
            {errors.features && (
              <span className="errorMsg">{errors.features.message}</span>
            )}
          </label>

          <label className="UpdateLabel">
            Warranty:
            <input
              type="text"
              {...register("warranty", { required: "Warranty is required" })}
              className="inputFeild"
            />
            {errors.warranty && (
              <span className="errorMsg">{errors.warranty.message}</span>
            )}
          </label>

          <label className="UpdateLabel">
            Description:
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="inputFeild"
            />
            {errors.description && (
              <span className="errorMsg">{errors.description.message}</span>
            )}
          </label>

          <label className="UpdateLabel">
            Image URL:
            <input
              type="text"
              {...register("image1", { required: "Image URL is required" })}
              className="inputFeild"
            />
            {errors.image && (
              <span className="errorMsg">{errors.image.message}</span>
            )}
          </label>
          <label className="UpdateLabel">
            Image 2 URL:
            <input
              type="text"
              {...register("image2", { required: "Image 2 URL is required" })}
              className="inputFeild"
            />
            {errors.image && (
              <span className="errorMsg">{errors.image.message}</span>
            )}
          </label>
        </div>
        <span>
          <button type="submit" className="UpdateButton">
            Update Car
          </button>
        </span>
      </form>
    </div>
  );
};

export default UpdateCar;
