import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Supplies.css"; // Import CSS file
import NewNavbar from "../components/Navbars/OwnerRegiNavBar"; // Navbar component
import OwnerSidebar from "../components/SideNav";

const Supplies = () => {
    const [supplies, setSupplies] = useState([]);
    const [newSupply, setNewSupply] = useState({ name: "", product_name: "", quantity: "" });

    useEffect(() => {
        fetchSupplies();
    }, []);

    const fetchSupplies = async () => {
        try {
            const response = await axios.get("http://localhost:5000/supplies");
            setSupplies(response.data);
        } catch (error) {
            console.error("Error fetching supplies:", error);
        }
    };

    const handleAddSupply = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/supplies", newSupply);
            fetchSupplies();
            setNewSupply({ name: "", product_name: "", quantity: "" });
        } catch (error) {
            console.error("Error adding supply:", error);
        }
    };

    const handleDeleteSupply = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/supplies/${id}`);
            fetchSupplies();
        } catch (error) {
            console.error("Error deleting supply:", error);
        }
    };

    return (
        <div>
            <NewNavbar />
            <OwnerSidebar />
        <div className="supplies-container">
            <h2>Supplies Management</h2>
            <form onSubmit={handleAddSupply}>
                <input
                    type="text"
                    placeholder="Supply Name"
                    value={newSupply.name}
                    onChange={(e) => setNewSupply({ ...newSupply, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Product Name"
                    value={newSupply.product_name}
                    onChange={(e) => setNewSupply({ ...newSupply, product_name: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={newSupply.quantity}
                    onChange={(e) => setNewSupply({ ...newSupply, quantity: e.target.value })}
                    required
                />
                <button type="submit">Add Supply</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {supplies.map((supply) => (
                        <tr key={supply.id}>
                            <td>{supply.id}</td>
                            <td>{supply.name}</td>
                            <td>{supply.product_name}</td>
                            <td>{supply.quantity}</td>
                            <td>
                                <button onClick={() => handleDeleteSupply(supply.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default Supplies;