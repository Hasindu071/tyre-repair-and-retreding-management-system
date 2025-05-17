import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/Supplies.css";
import OwnerSidebar from "../components/SideNav";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";

// Validation helper functions
const validateName = (name) => /^[A-Za-z\s]+$/.test(name);
const validatePhoneNumber = (phone) => /^\d{10}$/.test(phone);
const validateNumber = (value) => !isNaN(value) && Number(value) > 0;

const Supplies = () => {
  const [supplies, setSupplies] = useState([]);
  const [supplierNames, setSupplierNames] = useState([]);
  const [inventories, setInventory] = useState([]);
  const [productNames, setProductNames] = useState([]);
  const [newSupply, setNewSupply] = useState({
    name: "",
    product_name: "",
    phone_number: "",
    address: "",
    company_name: "",
    supplierName: "",
    description: "",
    quantity: "",
    amount: ""
  });

  // Refs for navigable sections
  const suppliesRef = useRef(null);
  const productRef = useRef(null);
  const inventoryRef = useRef(null);

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
      const response = await axios.get("http://localhost:5000/supplies/supplier");
      setSupplies(response.data);
    } catch (error) {
      console.error("Error fetching supplies:", error);
      toast.error("Error fetching supplies");
    }
  };

  // GET method to fetch inventory details
  const fetchInventory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/supplies/inventory");
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventories:", error);
      toast.error("Error fetching inventories");
    }
  };

  // Call fetch functions on mount
  useEffect(() => {
    fetchSupplierNames();
    fetchProductNames();
    fetchSupplies();
    fetchInventory();
  }, []);

  // Navigation function
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Validate all supply fields before submission
  const validateSupplyFields = () => {
    if (!newSupply.name || !validateName(newSupply.name)) {
      toast.error("Please enter a valid Supply Name (only letters and spaces allowed).");
      return false;
    }
    if (!newSupply.phone_number || !validatePhoneNumber(newSupply.phone_number)) {
      toast.error("Please enter a valid 10-digit Phone Number.");
      return false;
    }
    if (!newSupply.address) {
      toast.error("Address is required.");
      return false;
    }
    if (!newSupply.company_name || !validateName(newSupply.company_name)) {
      toast.error("Please enter a valid Company Name (only letters and spaces allowed).");
      return false;
    }
    return true;
  };

  // Handle adding a new supply
  const handleAddSupply = async (e) => {
    e.preventDefault();
    if (!validateSupplyFields()) return;
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
    if (
      !newSupply.product_name ||
      !newSupply.quantity ||
      !newSupply.supplierName
    ) {
      toast.error("Please fill in all inventory fields.");
      return;
    }
    if (!validateNumber(newSupply.quantity)) {
      toast.error("Quantity must be a positive number.");
      return;
    }
    if (!validateNumber(newSupply.amount)) {
      toast.error("Amount must be a positive number.");
      return;
    }
    try {
      const inventoryData = {
        product_name: newSupply.product_name,
        quantity: newSupply.quantity,
        supplierName: newSupply.supplierName,
        amount: newSupply.amount
      };
      await axios.post("http://localhost:5000/supplies/inventory", inventoryData);
      toast.success("Inventory added successfully");
      setNewSupply((prev) => ({
        ...prev,
        product_name: "",
        quantity: "",
        supplierName: "",
        amount: ""
      }));
      fetchInventory();
    } catch (error) {
      console.error("Error adding inventory:", error);
      toast.error("Error adding inventory");
    }
  };

  // Handle supply deletion with SweetAlert confirmation
  const handleDeleteSupply = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this supply!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`http://localhost:5000/supplies/${id}`);
          await swal("Supply deleted successfully", { icon: "success" });
          fetchSupplies();
        } catch (error) {
          swal("Failed to delete supply", { icon: "error" });
        }
      }
    });
  };

  // Handle product deletion with SweetAlert confirmation
  const handleDeleteProduct = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`http://localhost:5000/products/${id}`);
          await swal("Product deleted successfully", { icon: "success" });
          fetchProductNames();
        } catch (error) {
          swal("Failed to delete product", { icon: "error" });
        }
      }
    });
  };

  // Handle inventory deletion with SweetAlert confirmation
  const handleDeleteInventory = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this inventory record!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`http://localhost:5000/supplies/inventory/${id}`);
          await swal("Inventory deleted successfully", { icon: "success" });
          fetchInventory();
        } catch (error) {
          swal("Failed to delete inventory", { icon: "error" });
        }
      }
    });
  };

  return (
    <div>
      <OwnerSidebar />
      <div className="supplies-container-page">
        {/* Navigation Buttons */}
        <div className="supplies-nav-buttons" style={{ marginBottom: "50px" }}>
          <button onClick={() => scrollToSection(suppliesRef)}>Add Supplies</button>
          <button onClick={() => scrollToSection(productRef)}>Add New Product</button>
          <button onClick={() => scrollToSection(inventoryRef)}>Inventory</button>
        </div>

        {/* Add Supplies Section */}
        <div id="add-supplies" ref={suppliesRef}>
          <h2 className="supplies-section-title">Add Supplies</h2>
          <form className="supplies-form" onSubmit={handleAddSupply}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              placeholder="Supply Name"
              value={newSupply.name}
              onChange={(e) => setNewSupply({ ...newSupply, name: e.target.value })}
              onKeyPress={(e) => {
                const char = String.fromCharCode(e.charCode);
                if (!/^[A-Za-z\s]$/.test(char)) {
                  e.preventDefault();
                  toast.error("Only letters and spaces allowed in Full Name.");
                }
              }}
              required
            />
            <label htmlFor="phone_number">Phone Number</label>
            <input
              type="number"
              placeholder="Phone Number"
              value={newSupply.phone_number}
              onChange={(e) => setNewSupply({ ...newSupply, phone_number: e.target.value })}
              required
            />
            <label htmlFor="address">Address</label>
            <input
              type="text"
              placeholder="Address"
              value={newSupply.address}
              onChange={(e) => setNewSupply({ ...newSupply, address: e.target.value })}
              required
            />
            <label htmlFor="company_name">Company Name</label>
            <input
              type="text"
              placeholder="Company Name"
              value={newSupply.company_name}
              onChange={(e) => setNewSupply({ ...newSupply, company_name: e.target.value })}
              onKeyPress={(e) => {
                const char = String.fromCharCode(e.charCode);
                if (!/^[A-Za-z\s]$/.test(char)) {
                  e.preventDefault();
                  toast.error("Only letters and spaces allowed in Company Name.");
                }
              }}
              required
            />
            <button className="supplies-submit-button" type="submit">Add Supply</button>
          </form>

          <table className="supplies-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Company Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {supplies.map((supply) => (
                <tr key={supply.id}>
                  <td>{supply.id}</td>
                  <td>{supply.name}</td>
                  <td>0{supply.phone_number}</td>
                  <td>{supply.address}</td>
                  <td>{supply.company_name}</td>
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

        <hr />

        {/* Add New Product Section */}
        <div id="add-product" ref={productRef}></div>
        <div className="supplies-product-container">
          <h2 className="supplies-section-title">Add New Product</h2>
          <form className="supplies-product-form" onSubmit={handleAddProduct}>
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
            <button className="supplies-submit-button" type="submit">Add Product</button>
          </form>
        </div>

        <table className="supplies-product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productNames.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>
                  <button onClick={() => handleDeleteProduct(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Inventory Section */}
        <div id="inventory" ref={inventoryRef}></div>
        <div className="supplies-inventory-container">
          <h2 className="supplies-section-title">Inventory</h2>
          <form className="supplies-inventory-form" onSubmit={handleAddInventory}>
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
            <button className="supplies-submit-button" type="submit">Add Inventory</button>
          </form>
        </div>

        <table className="supplies-inventory-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Product Name</th>
              <th>Supplier Name</th>
              <th>Stock</th>
              <th>Quantity</th>
              <th>Date and Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {inventories.map((inventory) => (
              <tr key={inventory.id}>
                <td>{inventory.id}</td>
                <td>{inventory.product_name}</td>  
                <td>{inventory.supplier_name}</td> 
                <td>{inventory.stock}</td>
                <td>{inventory.quantity}</td>
                <td>{inventory.amount}</td>
                <td>{new Date(inventory.date).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleDeleteInventory(inventory.id)}>
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