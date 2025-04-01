import React, { useState, useEffect } from "react";
import axios from "axios";
import NewNavbar from "../components/Navbars/OwnerRegiNavBar"; // Owner's Navbar
import "../styles/UpdateTirePatterns.css";
import OwnerSidebar from "../components/SideNav";

const UpdateTirePatterns = () => {
    // State to hold the files selected by the owner for each pattern number
    const [fileUpdates, setFileUpdates] = useState({
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
    });
    // State to hold the current image URLs for each tire pattern
    const [patternImages, setPatternImages] = useState({});

    // Fetch current pattern images from the backend on mount
    useEffect(() => {
        const fetchPatterns = async () => {
            try {
                const res = await axios.get("http://localhost:5000/patterns/getAll");
                // Expected response: [{ id: 1, imageUrl: "http://localhost:5000/assets/pattern/pattern1.jpg" }, ...]
                const images = {};
                res.data.forEach((pattern) => {
                    images[pattern.id] = pattern.imageUrl;
                });
                setPatternImages(images);
            } catch (error) {
                console.error("Error fetching patterns:", error);
            }
        };
        fetchPatterns();
    }, []);

    const handleFileChange = (e, patternNum) => {
        setFileUpdates((prev) => ({
            ...prev,
            [patternNum]: e.target.files[0],
        }));
    };

    const handleUpload = async (patternNum) => {
        if (!fileUpdates[patternNum]) {
            alert("Please select a file first.");
            return;
        }
        const formData = new FormData();
        formData.append("patternNum", patternNum);
        formData.append("image", fileUpdates[patternNum]);
        
        try {
            const res = await axios.post("http://localhost:5000/patterns/update", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert(`Pattern ${patternNum} updated successfully!`);
            // Update the image URL by appending a timestamp query to bypass cache
            setPatternImages((prev) => ({
                ...prev,
                [patternNum]: res.data.filePath + `?t=${new Date().getTime()}`,
            }));
        } catch (error) {
            console.error("Error updating pattern:", error);
            alert("Error updating pattern.");
        }
    };

    return (
        <div>
            <NewNavbar />
            <OwnerSidebar />
            <div className="update-patterns-container">
                <h2>Update Tire Pattern Images</h2>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                    <div key={num} className="pattern-update-item">
                        <img
                            src={
                                patternImages[num]
                                    ? patternImages[num]
                                    : require(`../assets/pattern/pattern${num}.jpg`)
                            }
                            alt={`Pattern ${num}`}
                            className="pattern-image"
                        />
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleFileChange(e, num)} 
                        />
                        <button 
                            type="button" 
                            onClick={() => handleUpload(num)}
                            className="upload-btn"
                        >
                            Upload
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpdateTirePatterns;