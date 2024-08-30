import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from "@mui/material";
import Car from './Car';

function Cars() {
    const [originalCarsData, setOriginalCarsData] = useState([]);
    const [carsData, setCarsData] = useState([]);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                // const response = await fetch('http://localhost:5000/cardata');
                const response = await fetch('https://crazycar-backend.onrender.com/cardata');
                const data = await response.json();
                // console.log('Fetched car data:', data);
                console.log('Fetched car data:', data);
                setOriginalCarsData(data);
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

    useEffect(() => {
        if (selectedBrand) {
            const filteredModels = originalCarsData
                .filter(car => car.brand === selectedBrand)
                .map(car => car.model);
            setModels(Array.from(new Set(filteredModels)));
        } else {
            const uniqueModels = Array.from(new Set(originalCarsData.map(car => car.model)));
            setModels(uniqueModels);
        }
    }, [selectedBrand, originalCarsData]);

    const handleSearch = () => {
        const filteredCars = originalCarsData.filter(car =>
            (selectedBrand ? car.brand === selectedBrand : true) &&
            (selectedModel ? car.model === selectedModel : true)
        );
        setCarsData(filteredCars);
        setSelectedBrand('');
        setSelectedModel('');
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
                            className='searchTxt'
                            disablePortal
                            options={brands}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Select Brand" />}
                            value={selectedBrand}
                            onChange={(e, newVal) => {
                                setSelectedBrand(newVal);
                                setSelectedModel('');
                            }}
                        />
                        <Autocomplete
                            disableClearable
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
                        image={car.image}
                        title={`${car.brand} ${car.model}`}
                        description={car.description}
                        price={car.price}
                    />
                ))}
            </div>
        </>
    );
}

export default Cars;
