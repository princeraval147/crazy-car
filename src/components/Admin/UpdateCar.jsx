import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateCar = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [carData, setCarData] = useState({
        model: '',
        brand: '',
        price: '',
        description: '',
        image: ''
    });

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/cardata/${id}`);
                // const response = await fetch(`https://crazycar-backend.onrender.com/cardata/${id}`);
                const data = await response.json();
                setCarData({
                    model: data.model,
                    brand: data.brand,
                    price: data.price,
                    description: data.description,
                    image: data.image
                });
            } catch (error) {
                console.error('Error fetching car data:', error);
            }
        };

        fetchCarData();
    }, [id]);

    const handleChange = (e) => {
        setCarData({ ...carData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/cardata/${id}`, {
                // const response = await fetch(`https://crazycar-backend.onrender.com/cardata/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(carData)
            });

            if (response.ok) {
                navigate('/car');
            } else {
                console.error('Error updating car data');
            }
        } catch (error) {
            console.error('Error updating car data:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Update Car Data</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Model</label>
                    <input
                        type="text"
                        name="model"
                        value={carData.model}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Brand</label>
                    <input
                        type="text"
                        name="brand"
                        value={carData.brand}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Price</label>
                    <input
                        type="text"
                        name="price"
                        value={carData.price}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Description</label>
                    <textarea
                        name="description"
                        value={carData.description}
                        onChange={handleChange}
                        required
                        style={styles.textarea}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={carData.image}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Update</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: '20px 0',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        marginBottom: '5px',
        fontSize: '16px',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
        height: '100px',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#4CAF50',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    }
};

export default UpdateCar;
