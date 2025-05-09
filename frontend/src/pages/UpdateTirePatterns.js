import React, { useState, useEffect } from "react";
import {getAllPatterns, updatePatternImage} from "../services/ownerServices"; // Importing the service to fetch patterns
//import NewNavbar from "../components/Navbars/OwnerRegiNavBar"; // Owner's Navbar
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
        const fetchPatterns = async () => {
            try {
                const data = await getAllPatterns();
                const images = {};
                data.forEach((pattern) => {
                    images[pattern.id] = `${pattern.imageUrl}?t=${new Date().getTime()}`; // prevent caching
                });
                setPatternImages(images);
            } catch (error) {
                console.error("Error fetching patterns:", error);
            }
        };


        useEffect(() => {
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

    try {
        await updatePatternImage(patternNum, fileUpdates[patternNum]);
        alert(`Pattern ${patternNum} updated successfully!`);
        await fetchPatterns();


    } catch (error) {
        console.error("Error updating pattern:", error);
        alert("Error updating pattern.");
    }
};

    return (
        <div>
            {/*<Navbar />*/}
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