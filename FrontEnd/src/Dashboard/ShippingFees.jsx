import React, { useEffect, useState } from "react";
import "./dshusers.css";
import DASHHeader from "./DashboardComponents/dashHeader";
import DashSidebar from "./DashboardComponents/dashSidebar";
import { useTranslation } from "../TranslationContext";
import axios from "axios";

function ShippingFees() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [showCreateCity, setShowCreateCity] = useState(false);
  const [city, setCity] = useState([]);
  const [editingCity, setEditingCity] = useState(null);
  const [updatedFees, setUpdatedFees] = useState({});
  const [newFee, setNewFee] = useState({ cityId: "", fee: "" });

  const [newCity, setNewCity] = useState({
    countryId: "",
    name: "",
  });

  const [updatedCity, setUpdatedCity] = useState({
    countryId: "",
    name: "",
  });

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const { translations } = useTranslation();
  useEffect(() => {
    fetchCities();
  }, []);

  const handleFeeChange = (cityId, newFee) => {
    setUpdatedFees((prev) => ({
      ...prev,
      [cityId]: newFee, // Store changes per city
    }));
  };

  const handleUpdateFee = async (cityId) => {
    try {
      const token = localStorage.getItem("token");
      const fee = updatedFees[cityId];

      await axios.put(
        `http://auth-db942.hstgr.io:3306/shipping-fees`,
        { city_id: cityId, fee: parseInt(fee) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCity((prevCities) =>
        prevCities.map((city) =>
          city.id === cityId ? { ...city, shippingFee: fee } : city
        )
      );

      console.log("Shipping fee updated successfully!");
    } catch (error) {
      console.error("Error updating shipping fee:", error);
    }
  };

  const handleCreateFee = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://auth-db942.hstgr.io:3306/shipping-fees",
        { city_id: parseInt(newFee.cityId), fee: parseInt(newFee.fee) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchCities(); // Refresh city data
      setNewFee({ cityId: "", fee: "" });
    } catch (error) {
      console.error("Error creating shipping fee:", error);
    }
  };

  const handleDeleteFee = async (cityId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://auth-db942.hstgr.io:3306/shipping-fees/${cityId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCity((prevCities) =>
        prevCities.map((city) =>
          city.id === cityId ? { ...city, shippingFee: 0 } : city
        )
      );

      console.log("Shipping fee deleted!");
    } catch (error) {
      console.error("Error deleting shipping fee:", error);
    }
  };

  const fetchCities = async () => {
    try {
      const citiesResponse = await axios.get(
        "http://auth-db942.hstgr.io:3306/cities"
      );
      const shippingResponse = await axios.get(
        "http://auth-db942.hstgr.io:3306/shipping-fees"
      );

      // Merge cities with their shipping fees
      const citiesWithFees = citiesResponse.data.map((city) => {
        const feeData = shippingResponse.data.find(
          (fee) => fee.city_id === city.id
        );
        return { ...city, shippingFee: feeData ? feeData.fee : 0 }; // Default to 0 if no fee
      });

      setCity(citiesWithFees);
    } catch (error) {
      console.error("Error fetching cities or shipping fees:", error);
    }
  };

  // Fetch city by ID
  const fetchCityById = async (id) => {
    try {
      const response = await axios.get(
        `http://auth-db942.hstgr.io:3306/cities/${id}`
      );
      console.log(response.data); // Handle the fetched city data
    } catch (error) {
      console.error("Error fetching city by ID:", error);
    }
  };

  // Create a new city
  const handleCreateCity = async () => {
    try {
      const token = localStorage.getItem("token");

      const formattedCity = {
        ...newCity,
        countryId: parseInt(newCity.countryId) || null, // Convert to integer
      };

      const response = await axios.post(
        "http://auth-db942.hstgr.io:3306/cities",
        formattedCity,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Ensure `city` is an array before updating it
      setCity((prevCities) =>
        Array.isArray(prevCities)
          ? [...prevCities, response.data]
          : [response.data]
      );

      setNewCity({ countryId: "", name: "" });
    } catch (error) {
      console.error("Error creating city:", error);
    }
  };

  // Delete city
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Get token from storage
      await axios.delete(`http://auth-db942.hstgr.io:3306/cities/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include authentication token
        },
      });

      setCity(city.filter((city) => city.id !== id));
    } catch (error) {
      console.error("Error deleting city:", error);
    }
  };

  // Open edit modal
  const handleEditClick = (city) => {
    setEditingCity(city);
    setUpdatedCity({ name: city.name, countryId: city.countryId });
  };

  // Update city
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from storage
      const response = await axios.put(
        `http://auth-db942.hstgr.io:3306/cities/${editingCity.id}`,
        updatedCity,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include authentication token
            "Content-Type": "application/json",
          },
        }
      );

      setCity(
        city.map((city) => (city.id === editingCity.id ? response.data : city))
      );
      setEditingCity(null);
    } catch (error) {
      console.error("Error updating city:", error);
    }
  };
  return (
    <>
      <div className="wrap-container">
        <DashSidebar
          OpenSidebar={OpenSidebar}
          openSidebarToggle={openSidebarToggle}
        />

        <div className="middle-container">
          <DASHHeader OpenSidebar={OpenSidebar} />
          <main>
            <div class="customers">
              <h2 className="">Shipping Fees</h2>
              <table>
                <thead>
                  <tr>
                    <th className="select">{translations.select}</th>
                    <th className="adminid">City Id</th>
                    <th className="name">Name</th>
                    <th>Shipping-fees</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(city) && city.length > 0 ? (
                    city.map((cityItem) => (
                      <tr key={cityItem.id}>
                        <td>
                          <i className="fa-regular fa-square"></i>
                        </td>
                        <td>{cityItem.id}</td>
                        <td>{cityItem.name}</td>
                        <td>
                          <input
                            type="number"
                            value={cityItem.shippingFee}
                            onChange={(e) =>
                              handleFeeChange(cityItem.id, e.target.value)
                            }
                          />
                          <button onClick={() => handleUpdateFee(cityItem.id)}>
                            Update
                          </button>
                        </td>

                        <td>
                          <button
                            className="edit"
                            onClick={() => handleEditClick(cityItem)}>
                            Edit
                          </button>
                          <td>
                            <button
                              onClick={() => handleDeleteFee(cityItem.id)}>
                              Delete Fee
                            </button>
                          </td>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No Shipping fees found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <a onClick={fetchCities} className="showall">
                {translations.showall}
              </a>
            </div>
            <div className="adminsbuttons">
              <button
                className="createadmin"
                onClick={() => setShowCreateCity(!showCreateCity)}>
                {showCreateCity ? "Close" : "Create Shipping fee"}
              </button>
              <button className="delete">{translations.delete}</button>
            </div>
            {showCreateCity && (
              <div className="createFee">
                <input
                  type="number"
                  placeholder="City ID"
                  value={newFee.cityId}
                  onChange={(e) =>
                    setNewFee({ ...newFee, cityId: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Shipping Fee"
                  value={newFee.fee}
                  onChange={(e) =>
                    setNewFee({ ...newFee, fee: e.target.value })
                  }
                />
                <button onClick={handleCreateFee}>Add Fee</button>
              </div>
            )}
            {/* Edit City Modal */}
            {editingCity && (
              <div className="edit-user-modal">
                <h3>Edit City</h3>
                <input
                  type="text"
                  placeholder="Country Id"
                  value={updatedCity.countryId}
                  onChange={(e) =>
                    setUpdatedCity({
                      ...updatedCity,
                      countryId: parseInt(e.target.value),
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="City Name"
                  value={updatedCity.name}
                  onChange={(e) =>
                    setUpdatedCity({ ...updatedCity, name: e.target.value })
                  }
                />
                <button onClick={handleUpdate}>Update</button>
                <button onClick={() => setEditingCity(null)}>Cancel</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default ShippingFees;
