import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from "@mui/material";
import Car from './Car';
import PaginationComponent from './PaginationComponent';
import Pagination from '@mui/material/Pagination';

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
                const response = await fetch('http://localhost:5000/cardata');
                // const response = await fetch('https://crazycar-backend.onrender.com/cardata');
                const data = await response.json();
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


    //  Pagination
    // const [page, setPage] = useState(1);
    // const handlePage = (e, p) => {
    //     console.log(e, p)
    //     setPage(p)
    // }
    // const [carCount, setCarCount] = useState(0);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             // Fetch total car data
    //             const carResponse = await fetch('http://localhost:5000/api/cars/count');
    //             const carData = await carResponse.json();
    //             console.log('Fetched car data:', carData);
    //             setCarCount(carData.totalCars);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    //     fetchData();
    // }, []);
    // console.log("Total Car = ", carCount);


    // AI Pagination
    const [page, setPage] = useState(1);
    const [cars, setCars] = useState([]);
    const [carCount, setCarCount] = useState(0);
    const [perPage] = useState(8); // 8 cars per page
    const handlePage = (e, value) => {
        setPage(value);
        console.log("Current Page = ", value);
    };
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const start = (page - 1) * perPage;
                const response = await fetch(`http://localhost:5000/cardata?limit=${perPage}&skip=${start}`);
                // const response = await fetch(`http://localhost:5000/cardata?limit=8&skip=0`);
                const data = await response.json();
                setCars(data);
                const carCountResponse = await fetch('http://localhost:5000/api/cars/count');
                const carData = await carCountResponse.json();
                setCarCount(carData.totalCars);
                console.log('My data = ', carData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchCars();
    }, [page, perPage]);


    return (
        <>
            <div className="carFirst">
                <div className="searchCar">
                    <div className="carHeading">
                        <h1>Buying your dream car? <br /> Check Now!</h1>
                    </div>
                    <div className="searchDetail">
                        <Autocomplete
                            isOptionEqualToValue={(option, value) => option.value === value.value} // To avoid Warnig in Console
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
                            isOptionEqualToValue={(option, value) => option.value === value.value} // To avoid Warnig in Console
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
                        id={car._id}
                        image={car.image}
                        title={`${car.brand} ${car.model}`}
                        price={`${"₹"} ${car.price}`}
                        year={car.year}
                        fuelType={car.fuelType}
                        mileage={car.mileage}
                        description={car.description}
                    />
                ))}
            </div>
            <div className="pagination">
                {/* <Pagination count={10} onChange={handlePage} size='large' /> */}
                <Pagination
                    count={Math.ceil(carCount / perPage)}
                    // count={10}
                    page={page}
                    onChange={(e, value) => handlePage(e, value)}
                    size='large'
                />
                {/* <PaginationComponent /> */}
            </div>
        </>
    );
}

export default Cars;
