import React, { useState } from 'react';

const CustomerRegister = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        nic: '',
        phone1: '',
        phone2: '',
        houseName: '',
        city: '',
        state: '',
        password: '',
        rePassword: ''
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
        if (formData.password !== formData.rePassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log('Form submitted:', formData);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-3xl">
                <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
                <p className="text-center text-gray-600 mb-6">Let's get started!</p>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="p-2 border rounded" required />
                    <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="p-2 border rounded" required />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="p-2 border rounded" required />
                    <input type="text" name="phone1" placeholder="Phone Number 1" value={formData.phone1} onChange={handleChange} className="p-2 border rounded" required />
                    <input type="text" name="nic" placeholder="NIC" value={formData.nic} onChange={handleChange} className="p-2 border rounded" required />
                    <input type="text" name="phone2" placeholder="Phone Number 2" value={formData.phone2} onChange={handleChange} className="p-2 border rounded" />
                    <input type="text" name="houseName" placeholder="House Name" value={formData.houseName} onChange={handleChange} className="p-2 border rounded" required />
                    <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} className="p-2 border rounded" required />
                    <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="p-2 border rounded" required />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="p-2 border rounded" required />
                    <input type="password" name="rePassword" placeholder="RePassword" value={formData.rePassword} onChange={handleChange} className="p-2 border rounded" required />
                    <button type="submit" className="col-span-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded font-bold">SUBMIT</button>
                </form>
            </div>
        </div>
    );
};

export default CustomerRegister;
