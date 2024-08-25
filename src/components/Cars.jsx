import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from "@mui/material";
import Car from './Car';

function Cars() {
    const [carsData, setCarsData] = useState([]);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const response = await fetch('http://localhost:5000/cardata');
                // const response = await fetch('https://crazycar-backend.onrender.com/cardata');
                const data = await response.json();
                // console.log('Fetched car data:', data);
                setCarsData(data);

                const uniqueBrands = Array.from(new Set(data.map(car => car.brand)));
                setBrands(uniqueBrands);
                const uniqueModels = Array.from(new Set(data.map(car => car.model)));
                setModels(uniqueModels);

            } catch (error) {
                console.error('Error fetching car data:', error);
            }
        };
        fetchCarData();
    }, []);

    const handleSearch = () => {
        const filteredCars = carsData.filter(car =>
            (selectedBrand ? car.brand === selectedBrand : true) &&
            (selectedModel ? car.model === selectedModel : true)
        );
        setCarsData(filteredCars);
        console.log(filteredCars);
        // console.log(error);
    };

    return (
        <>
            <div className="carFirst">
                <div className="searchCar">
                    <div className="carHeading">
                        <h1>Buying your dream car? <br /> Check Now!</h1>
                    </div>
                    <div className="searchDetail">
                        <Autocomplete
                            disableClearable
                            isOptionEqualToValue={(option, value) => option.value === value.value}  // For ignore warning of console
                            className='searchTxt'
                            disablePortal
                            options={brands}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Select Brand" />}
                            value={selectedBrand}
                            onChange={(e, newVal) => {
                                setSelectedBrand(newVal);
                                setSelectedModel('');
                                // Filter models based on selected brand
                                const filteredModels = carsData
                                    .filter(car => car.brand === newVal)
                                    .map(car => car.model);
                                setModels(Array.from(new Set(filteredModels)));
                            }}
                        />
                        <Autocomplete
                            disableClearable
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            className='searchTxt'
                            disablePortal
                            options={models}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Select Model" />}
                            value={selectedModel}
                            onChange={(e, newVal) => setSelectedModel(newVal)}
                        />
                        <button className='Btn' onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '20px',
                    margin: '20px',
                    padding: '20px',
                    boxSizing: 'border-box',
                }}
            >
                {carsData.map((car) => (
                    <Car
                        key={car._id}
                        car={car}
                        image={car.image}
                        title={`${car.brand} ${car.model}`}
                        price={car.price}
                        description={car.description}
                    />
                ))}
            </div>
        </>
    );
}

export default Cars;
