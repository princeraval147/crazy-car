import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  CircularProgress,
  TextField,
  Pagination,
} from "@mui/material";
import Car from "./Car";

function Cars() {
  const [originalCarsData, setOriginalCarsData] = useState([]);
  const [carsData, setCarsData] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 12;

  // Fetch car data on initial render
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch("http://localhost:5000/cardata");
        const data = await response.json();
        setOriginalCarsData(data);
        setCarsData(data);

        const uniqueBrands = Array.from(new Set(data.map((car) => car.brand)));
        setBrands(uniqueBrands);

        const uniqueModels = Array.from(new Set(data.map((car) => car.model)));
        setModels(uniqueModels);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };
    fetchCarData();
  }, []);

  // Filter models when a brand is selected
  useEffect(() => {
    if (selectedBrand) {
      const filteredModels = originalCarsData
        .filter((car) => car.brand === selectedBrand)
        .map((car) => car.model);
      setModels(Array.from(new Set(filteredModels)));
    } else {
      const uniqueModels = Array.from(
        new Set(originalCarsData.map((car) => car.model))
      );
      setModels(uniqueModels);
    }
  }, [selectedBrand, originalCarsData]);

  // useEffect(() => {
  //   const filteredCars = originalCarsData.filter(
  //     (car) =>
  //       (selectedBrand ? car.brand === selectedBrand : true) &&
  //       (selectedModel ? car.model === selectedModel : true) &&
  //       (selectedFuelType ? car.fuelType === selectedFuelType : true)
  //   );
  //   setCarsData(filteredCars);
  //   setCurrentPage(1); // Reset to first page after filtering
  // }, [selectedBrand, selectedModel, selectedFuelType, originalCarsData]);

  function parsePrice(priceStr) {
    if (!priceStr) return 0;

    let num = 0;

    if (priceStr.includes("Crore")) {
      num = parseFloat(priceStr.replace("Crores", "").replace("Crore", "").trim());
      return isNaN(num) ? 0 : num * 10000000; // 1 Crore = 1 Cr = 1,00,00,000
    }

    if (priceStr.includes("Lakh")) {
      num = parseFloat(priceStr.replace("Lakhs", "").replace("Lakh", "").trim());
      return isNaN(num) ? 0 : num * 100000; // 1 Lakh = 1,00,000
    }

    return 0;
  }

  useEffect(() => {
    const filteredCars = originalCarsData.filter((car) => {
      const brandMatch = selectedBrand ? car.brand === selectedBrand : true;
      const modelMatch = selectedModel ? car.model === selectedModel : true;
      const fuelMatch = selectedFuelType ? car.fuelType === selectedFuelType : true;

      // Convert price string to number
      const price = parsePrice(car.price);

      let priceMatch = true;
      if (selectedPriceRange) {
        switch (selectedPriceRange) {
          case "1-5":
            priceMatch = price >= 100000 && price <= 500000;
            break;
          case "5-10":
            priceMatch = price > 500000 && price <= 1000000;
            break;
          case "10-15":
            priceMatch = price > 1000000 && price <= 1500000;
            break;
          case "15-20":
            priceMatch = price > 1500000 && price <= 2000000;
            break;
          case "20-25":
            priceMatch = price > 2000000 && price <= 2500000;
            break;
          case "25-50":
            priceMatch = price > 2500000 && price <= 5000000;
            break;
          case "50-100":
            priceMatch = price > 5000000 && price <= 10000000;
            break;
          case "1-2cr":
            priceMatch = price > 10000000 && price <= 20000000;
            break;
          case "2-5cr":
            priceMatch = price > 20000000 && price <= 50000000;
            break;
          case "above-5cr":
            priceMatch = price > 50000000;
            break;
          default:
            priceMatch = true;
        }
      }

      return brandMatch && modelMatch && fuelMatch && priceMatch;
    });

    setCarsData(filteredCars);
    setCurrentPage(1);
  }, [selectedBrand, selectedModel, selectedFuelType, selectedPriceRange, originalCarsData]);


  // Handle Clear Filter
  const clearFilters = () => {
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedFuelType("");
    setCarsData(originalCarsData);
    setSelectedPriceRange("")
  };

  // Pagination Logic
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = carsData.slice(indexOfFirstCar, indexOfLastCar);

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="carFirst">
        <div className="searchCar">
          <div className="carHeading">
            <h1>
              Buying your dream car? <br /> Check Now!
            </h1>
          </div>
          <div className="searchDetail">
            <Autocomplete
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              } // To avoid warning in console
              // disableClearable
              className="searchTxt"
              disablePortal
              options={brands}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Select Brand" />
              )}
              value={selectedBrand}
              onChange={(e, newVal) => {
                setSelectedBrand(newVal);
                setSelectedModel("");
              }}
            />
            <Autocomplete
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              } // To avoid warning in console
              // disableClearable
              className="searchTxt"
              disablePortal
              options={models}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Select Model" />
              )}
              value={selectedModel}
              onChange={(e, newVal) => setSelectedModel(newVal)}
            />
          </div>
        </div>
      </div>

      <div className="carsFilter">
        <div className="byPrice">
          <select
            className="selectionList"
            value={selectedPriceRange}
            onChange={(e) => setSelectedPriceRange(e.target.value)}
          >
            <option value="">Select Price Range</option>
            <option value="1-5">1 Lakh to 5 Lakhs</option>
            <option value="5-10">5 Lakhs to 10 Lakhs</option>
            <option value="10-15">10 Lakhs to 15 Lakhs</option>
            <option value="15-20">15 Lakhs to 20 Lakhs</option>
            <option value="20-25">20 Lakhs to 25 Lakhs</option>
            <option value="25-50">25 Lakhs to 50 Lakhs</option>
            <option value="50-100">50 Lakhs to 1 Crore</option>
            <option value="1-2cr">1 Crore to 2 Crores</option>
            <option value="2-5cr">2 Crores to 5 Crores</option>
            <option value="above-5cr">Above 5 Crores</option>
          </select>
        </div>

        <div className="FualTypes">
          Fual Types :
          <input
            type="radio"
            name="FualType"
            id="EV"
            value="Electric"
            checked={selectedFuelType === "Electric"}
            onChange={(e) => setSelectedFuelType(e.target.value)}
          />
          <label htmlFor="EV">EV</label>
          <br />
          <input
            type="radio"
            name="FualType"
            id="Petrol"
            value="Petrol"
            checked={selectedFuelType === "Petrol"}
            onChange={(e) => setSelectedFuelType(e.target.value)}
          />
          <label htmlFor="Petrol">Petrol</label>
          <br />
          <input
            type="radio"
            name="FualType"
            id="Diesel"
            value="Diesel"
            checked={selectedFuelType === "Diesel"}
            onChange={(e) => setSelectedFuelType(e.target.value)}
          />
          <label htmlFor="Diesel">Diesel</label>
        </div>
        <div className="filterBtns">
          <button className="ClearBtn" onClick={clearFilters}>
            Clear Filter
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          margin: "20px",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        {carsData.length === 0 ? (
          <div className="Loading">
            {/* <CircularProgress /> */}
            <p>No Matching Data</p>
          </div>
        ) : (
          currentCars.map((car) => (
            <Car
              key={car._id}
              id={car._id}
              image={car.image}
              title={`${car.brand} ${car.model}`}
              price={`₹ ${car.price}`}
              year={car.year}
              fuelType={car.fuelType}
              mileage={car.mileage}
              description={car.description}
            />
          ))
        )}
      </div>

      <div className="pagination">
        <Pagination
          count={Math.ceil(carsData.length / carsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          size="large"
        />
      </div>
    </>
  );
}

export default Cars;
