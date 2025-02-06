import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from './NavBar'; // Import the Navbar component

const WorkerRegister = () => {
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        title: '',
        email: '',
        phone1: '',
        phone2: '',
        nic: '',
        address1: '',
        address2: '',
        password: '',
        rePassword: '',
        secretKey: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div>
            <Navbar /> {/* Add the Navbar component here */}
            <div className="flex justify-center items-center min-h-screen bg-gray-900">
                <div className="bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-2xl text-white">
                    <h2 className="text-2xl font-bold text-center">Worker <span className="text-red-500">REGISTRATION</span></h2>
                    <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-2 gap-4">
                        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="p-2 bg-gray-700 rounded" required />
                        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="p-2 bg-gray-700 rounded" required />
                        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="p-2 bg-gray-700 rounded" required />
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="p-2 bg-gray-700 rounded" required />
                        <input type="text" name="phone1" placeholder="Phone Number 1" value={formData.phone1} onChange={handleChange} className="p-2 bg-gray-700 rounded" required />
                        <input type="text" name="phone2" placeholder="Phone Number 2" value={formData.phone2} onChange={handleChange} className="p-2 bg-gray-700 rounded" />
                        <input type="text" name="nic" placeholder="NIC" value={formData.nic} onChange={handleChange} className="p-2 bg-gray-700 rounded" required />
                        <input type="text" name="address1" placeholder="Address Line 1" value={formData.address1} onChange={handleChange} className="p-2 bg-gray-700 rounded" required />
                        <input type="text" name="address2" placeholder="Address Line 2" value={formData.address2} onChange={handleChange} className="p-2 bg-gray-700 rounded" />
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="p-2 border rounded" required />
                        <input type="password" name="rePassword" placeholder="RePassword" value={formData.rePassword} onChange={handleChange} className="p-2 border rounded" required />
                        <input type="secretKey" name="secretKey" placeholder="secret Key" value={formData.secretKey} onChange={handleChange} className="p-2 border rounded" required />
                        <button type="submit" className="col-span-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded font-bold">SEND</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WorkerRegister;