import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from "@mui/material";
import Car from './Car';

function Cars() {
    const [carsData, setCarsData] = useState([]);

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const response = await fetch('http://localhost:5000/cardata');
                const data = await response.json();
                console.log('Fetched car data:', data);
                setCarsData(data);
            } catch (error) {
                console.error('Error fetching car data:', error);
            }
        };
        fetchCarData();
    }, []);

    const Cars = [
        "Audi",
        "BMW",
        "Suzuki"
    ];

    const Models = {
        // "Models": {
        "Maruti": [
            "Baleno",
            "Alto 800",
            "Brezza"
        ],
        "Audi": [
            "R8",
            "A5",
            "Q4"
        ]
        // }
    }

    const CarsModel = [
        "Alto 800",
        "Brezza",
        "Audi A5"
    ];

    const [selectedCar, setSelectedCar] = useState(String);
    const [selectedCarModel, setSelectedCarModel] = useState(String);
    // console.log()
    const handlerSubmit = () => {
        console.table([selectedCar, selectedCarModel])
    }

    return (
        <>
            <div className="carFirst">
                <div className="searchCar">
                    <div className="carHeading">
                        <h1>Buying your dream car? <br /> Check Now!</h1>
                    </div>
                    <div className="searchDetail">
                        <Autocomplete
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            disableClearable
                            className='searchTxt'
                            disablePortal
                            options={Cars}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Select Brand" />}
                            // freeSolo
                            value={selectedCar}
                            onChange={(e, newVal) => setSelectedCar(newVal)}
                        />
                        <Autocomplete
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            disableClearable
                            className='searchTxt'
                            disablePortal
                            options={CarsModel}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Select Model" />}
                            // freeSolo
                            value={selectedCarModel}
                            onChange={(e, newVal) => setSelectedCarModel(newVal)}
                        />
                        <button className='Btn' onClick={handlerSubmit}>
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
                        title={car.title}
                        description={car.description}
                    />
                ))}
            </div>
        </>
    );
}

export default Cars;
