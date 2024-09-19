import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../../index.css'

const Addcar = () => {
  const { register, handleSubmit } = useForm();
  const Navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/cardata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
      alert("Car Added Successfully");
      Navigate('/car');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-car-form">
      <h1>Add Car</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Model:
          <input type="text" {...register('model')} className="form-input" />
        </label>
        <br />
        <label>
          Brand:
          <input type="text" {...register('brand')} className="form-input" />
        </label>
        <br />
        <label>
          Price:
          <input type="text" {...register('price')} className="form-input" />
        </label>
        <br />
        <label>
          Description:
          <textarea {...register('description')} className="form-input" />
        </label>
        <br />
        <label>
          Image:
          <input type="text" {...register('image')} className="form-input" />
        </label>
        <br />
        <button type="submit" className="form-button">
          Add Car
        </button>
      </form>
    </div>
  );
};

export default Addcar;