import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Supplies.css";
import OwnerSidebar from "../components/SideNav";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Supplies = () => {
  const [supplies, setSupplies] = useState([]);
  const [supplierNames, setSupplierNames] = useState([]);
  const [productNames, setProductNames] = useState([]);
  const [newSupply, setNewSupply] = useState({
    name: "",
    product_name: "",
    phone_number: "",
    address: "",
    company_name: "",
    supplierName: "",
    description: ""
  });

  // Map productNames to react-select options
  const productOptions = productNames.map((product) => ({
    value: product.name,
    label: product.name
  }));

  // Fetch supplier names from backend
  const fetchSupplierNames = async () => {
    try {
      const response = await axios.get("http://localhost:5000/supplies/names");
      setSupplierNames(response.data);
    } catch (error) {
      console.error("Error fetching supplier names:", error);
      toast.error("Error fetching supplier names");
    }
  };

  // Fetch product names from backend
  const fetchProductNames = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products/names");
      setProductNames(response.data);
    } catch (error) {
      console.error("Error fetching product names:", error);
      toast.error("Error fetching product names");
    }
  };

  // Fetch all supplies
  const fetchSupplies = async () => {
    try {
      const response = await axios.get("http://localhost:5000/supplies");
      setSupplies(response.data);
    } catch (error) {
      console.error("Error fetching supplies:", error);
      toast.error("Error fetching supplies");
    }
  };

  // Call fetch functions on mount
  useEffect(() => {
    fetchSupplierNames();
    fetchProductNames();
    fetchSupplies();
  }, []);

  // Handle adding a new supply
  const handleAddSupply = async (e) => {
    e.preventDefault();
    // Validate required supply fields
    if (
      !newSupply.name ||
      !newSupply.address ||
      !newSupply.company_name ||
      !newSupply.phone_number
    ) {
      console.error("Missing required fields:", {
        name: newSupply.name,
        address: newSupply.address,
        company_name: newSupply.company_name,
        phone_number: newSupply.phone_number
      });
      toast.error("Please fill all supply fields.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/supplies", newSupply);
      toast.success("Supply added successfully");
      fetchSupplies();
      setNewSupply((prev) => ({
        ...prev,
        name: "",
        phone_number: "",
        address: "",
        company_name: ""
      }));
    } catch (error) {
      console.error("Error adding supply:", error);
      toast.error("Error adding supply");
    }
  };

  // Handle adding a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newSupply.product_name || !newSupply.description) {
      toast.error("Please fill in Product Name and Description.");
      return;
    }
    try {
      const productData = {
        product_name: newSupply.product_name,
        description: newSupply.description
      };
      await axios.post("http://localhost:5000/products", productData);
      toast.success("Product added successfully");
      fetchProductNames();
      setNewSupply((prev) => ({
        ...prev,
        product_name: "",
        description: ""
      }));
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product");
    }
  };

  // Handle adding new inventory data
  const handleAddInventory = async (e) => {
    e.preventDefault();
    if (!newSupply.product_name || !newSupply.quantity || !newSupply.supplierName) {
      toast.error("Please fill in all inventory fields.");
      return;
    }
    try {
      const inventoryData = {
        product_name: newSupply.product_name,
        quantity: newSupply.quantity,
        supplierName: newSupply.supplierName
      };
      await axios.post("http://localhost:5000/supplies/inventory", inventoryData);
      toast.success("Inventory added successfully");
      setNewSupply((prev) => ({
        ...prev,
        product_name: "",
        quantity: "",
        supplierName: ""
      }));
    } catch (error) {
      console.error("Error adding inventory:", error);
      toast.error("Error adding inventory");
    }
  };

  // Handle supply deletion
  const handleDeleteSupply = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/supplies/${id}`);
      toast.success("Supply deleted successfully");
      fetchSupplies();
    } catch (error) {
      console.error("Error deleting supply:", error);
      toast.error("Error deleting supply");
    }
  };

  return (
    <div>
      <OwnerSidebar />
      <div className="supplies-container">
        <h2>Add Supplies</h2>
        <form onSubmit={handleAddSupply}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            placeholder="Supply Name"
            value={newSupply.name}
            onChange={(e) =>
              setNewSupply({ ...newSupply, name: e.target.value })
            }
            required
          />
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="text"
            placeholder="Phone Number"
            value={newSupply.phone_number}
            onChange={(e) =>
              setNewSupply({ ...newSupply, phone_number: e.target.value })
            }
            required
          />
          <label htmlFor="address">Address</label>
          <input
            type="text"
            placeholder="Address"
            value={newSupply.address}
            onChange={(e) =>
              setNewSupply({ ...newSupply, address: e.target.value })
            }
            required
          />
          <label htmlFor="company_name">Company Name</label>
          <input
            type="text"
            placeholder="Company Name"
            value={newSupply.company_name}
            onChange={(e) =>
              setNewSupply({ ...newSupply, company_name: e.target.value })
            }
            required
          />
          <button type="submit">Add Supply</button>
        </form>

        <div className="product-container">
          <h2>Add New Product</h2>
          <form onSubmit={handleAddProduct}>
            <label htmlFor="product_name">Product Name</label>
            <input
              type="text"
              placeholder="Product Name"
              value={newSupply.product_name}
              onChange={(e) =>
                setNewSupply({ ...newSupply, product_name: e.target.value })
              }
              required
            />
            <label htmlFor="description">Description</label>
            <input
              type="text"
              placeholder="Description"
              value={newSupply.description}
              onChange={(e) =>
                setNewSupply({ ...newSupply, description: e.target.value })
              }
              required
            />
            <button type="submit">Add Product</button>
          </form>
        </div>

        <div className="Inventory-container">
          <h2>Inventory</h2>
          <form onSubmit={handleAddInventory}>
            <label htmlFor="product_name_inventory">Product Name</label>
            <Select
              id="product_name_inventory"
              options={productOptions}
              value={productOptions.find(
                (option) => option.value === newSupply.product_name
              )}
              onChange={(selectedOption) =>
                setNewSupply({ ...newSupply, product_name: selectedOption.value })
              }
              placeholder="Select Product"
              isSearchable
              required
            />
            <label htmlFor="quantityInventory">Quantity</label>
            <input
              type="number"
              placeholder="Quantity"
              value={newSupply.quantity}
              onChange={(e) =>
                setNewSupply({ ...newSupply, quantity: e.target.value })
              }
              required
            />
            <label htmlFor="amountInventory">Amount</label>
            <input
              type="number"
              placeholder="Amount"
              value={newSupply.amount}
              onChange={(e) =>
                setNewSupply({ ...newSupply, amount: e.target.value })
              }
              required
            />
            <label htmlFor="supplierName">Supplier Name</label>
            <select
              id="supplierName"
              value={newSupply.supplierName}
              onChange={(e) =>
                setNewSupply({ ...newSupply, supplierName: e.target.value })
              }
              required
            >
              <option value="">Select Supplier</option>
              {supplierNames.map((supplier) => (
                <option key={supplier.id} value={supplier.name}>
                  {supplier.name}
                </option>
              ))}
            </select>
            <button type="submit">Add Inventory</button>
          </form>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Product Name</th>
              <th>Phone Number</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Date and Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {supplies.map((supply) => (
              <tr key={supply.id}>
                <td>{supply.id}</td>
                <td>{supply.name}</td>
                <td>{supply.product_name}</td>
                <td>{supply.phone_number}</td>
                <td>{supply.quantity}</td>
                <td>{supply.amount}</td>
                <td>{supply.date_added}</td>
                <td>
                  <button onClick={() => handleDeleteSupply(supply.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Supplies;