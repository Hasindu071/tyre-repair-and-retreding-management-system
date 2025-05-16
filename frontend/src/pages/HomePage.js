import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import background from '../assets/background.png';
import Navbar from '../components/NavBar';
import mainImage from '../assets/mainImage.jpg'; 
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import processImg1 from '../assets/processImg1.jpg'; 
import processImg2 from '../assets/processImg2.jpg'; 
import processImg3 from '../assets/processImg3.jpg'; 
import Logo from '../assets/Logo.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faLinkedin, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

import imageurl1 from '../assets/Owner.jpg';
import imageurl2 from '../assets/Woker1.jpeg';
import imageurl3 from '../assets/Woker2.jpeg';
import '../styles/HomePage.css';

const slideInFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

const HomePage = () => {
  const navigate = useNavigate();
  const [hasScrolled, setHasScrolled] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const reviews = [
{
  feedback: "Always maintains professionalism under pressure!",
  name: "Charith Malaka",
  designation: "Business Worker",
  photo: imageurl2 ,
},
{
  feedback: "Excellent service and quality!",
  name: "Mohan Liyanapathirana",
  designation: "Business Owner",
  photo: imageurl1 , 
},
{
  feedback: "Highly committed and quick to learn new processes!",
  name: "Ajith Liyanapathirana",
  designation: "Business Worker",
  photo: imageurl3 , 
},
];

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
    console.log("Previous review clicked");
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <Navbar />
      <header 
        className="hero-section d-flex align-items-center text-center text-md-start"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="overlay"></div>
        <div className="container-home">
          <div className="row align-items-center">
            {/* Left Side - Hero Text */}
            <div className="col-md-6">
              <h1 className="hero-title">Trusted Tire Repair & Retreading Experts</h1>
              <p className="hero-subtitle">
                Providing high-quality and reliable services for all your tire needs.
              </p>
            </div>
            {/* Right Side - Register Card */}
            <div className="col-md-6 d-flex justify-content-md-end">
              <div className="register-card-home">
                <h2>Join Us Today</h2>
                <p>Become a part of our trusted team.</p>
                <button className="btn btn-dark btn-lg rounded-pill" onClick={() => navigate("/RoleRegisterSelection")}>
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <br />
      <br />

      <motion.div
  initial="hidden"
  animate={hasScrolled ? "visible" : "hidden"}
  transition={{ duration: 0.8 }}
  variants={slideInFromRight}
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "800px",
    margin: "0 auto"
  }}
>
  <div style={{ flex: 1, backgroundColor:"white", paddingRight: "20px" }}>
    <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "10px" }}>
    Repair,Retread, Drive
    </h1>
    <p style={{ fontSize: "24px", color: "#555" }}>
    Extend your tire's life with precision. Inspect for safety, retread with quality, and drive with confidence.
    </p>
  </div>
  <div style={{ flex: 1, textAlign: "right" }}>
    <img 
      src={mainImage} 
      alt="Main Feature" 
      style={{ maxWidth: "700px", height: "300px", borderRadius: "8px" }} 
    />
  </div>
</motion.div>
<br />
<br />

<motion.div
  initial="hidden"
  animate={hasScrolled ? "visible" : "hidden"}
  transition={{ duration: 0.8 }}
  variants={slideInFromRight}
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "1000px",
    margin: "0 auto",
    textAlign: "center",
    flexWrap: "wrap"
  }}
>
  <div style={{ flex: 1, padding: "20px", backgroundColor:"white", marginTop: "20px", minWidth: "250px" }}>
    <img 
      src={processImg1} 
      alt="process" 
      style={{ maxWidth: "300px", height: "300px", marginBottom: "10px" }}
    />
    <h1 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px", color: "#333" }}>
    Inspection & Buffing
    </h1>
    <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.5" }}>
    The old tire is thoroughly inspected for damages.
    </p>
  </div>
  <div style={{ flex: 1, padding: "20px", backgroundColor:"white",marginTop: "20px", minWidth: "250px" }}>
    <img 
      src={processImg2} 
      alt="process" 
      style={{ maxWidth: "300px", height: "300px", marginBottom: "10px" }}
    />
    <h1 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px", color: "#333" }}>
    Tread Application
    </h1>
    <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.5" }}>
    A new tread is applied using either the pre-cured or mold-cure method.
    </p>
  </div>
  <div style={{ flex: 1, padding: "20px",backgroundColor:"white",marginTop: "20px", minWidth: "250px" }}>
    <img 
      src={processImg3} 
      alt="process" 
      style={{ maxWidth: "300px", height: "300px", marginBottom: "10px" }}
    />
    <h1 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px", color: "#333" }}>
    Curing & Final Inspection
    </h1>
    <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.5" }}>
    The tire undergoes a curing process to bond the new tread permanently.
    </p>
  </div>
</motion.div>
<br />
<br />
<div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "40px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "900px",
    margin: "0 auto",
  }}
>
  <div style={{ marginBottom: "20px" }}>
    <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>
    Trusted by Professionals in the Tire Industry
    </h1>
    <p style={{ fontSize: "16px", color: "#555", maxWidth: "600px", margin: "0 auto" }}>
    Whether you're a small workshop or a large tire retreading business, our system is designed to enhance efficiency and ensure top-quality service.
    </p>
  </div>

  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
    <button
      onClick={prevReview}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "20px",
        color: "#555",
      }}
    >
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>

    <div
      style={{
        display: "flex",
        gap: "20px",
        overflow: "hidden",
        maxWidth: "600px",
      }}
    >
      {reviews.slice(currentIndex, currentIndex + 3).map((review, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#fff",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            minWidth: "180px",
            textAlign: "center",
          }}
        >
          <div style={{ color: "#f5c518", marginBottom: "5px" }}>
          </div>
          <p style={{ fontSize: "14px", color: "#333", fontStyle: "italic" }}>
            &quot;{review.feedback}&quot;
          </p>
          <div style={{ marginTop: "10px" }}>
            <div
              style={{
                width: "50px",
                height: "50px",
                overflow: "hidden",
                borderRadius: "50%",
                margin: "0 auto",
              }}
            >
              <img
                src={review.photo}
                alt={review.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <h3 style={{ fontSize: "16px", margin: "5px 0", color: "#333" }}>
              {review.name}
            </h3>
            <span style={{ fontSize: "12px", color: "#777" }}>
              {review.designation}
            </span>
          </div>
        </div>
      ))}
    </div>

    <button
      onClick={nextReview}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "20px",
        color: "#555",
      }}
    >
      <FontAwesomeIcon icon={faChevronRight} />
    </button>
  </div>
</div>
<br />
<br />

<div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderTop: "2px solid #ddd",
  }}
>
  <img
    src={Logo}
    alt="Ryak Tires Logo"
    style={{ maxWidth: "150px", marginBottom: "10px" }}
  />

  <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
    <a
      href="https://www.facebook.com/share/18xvyjdA2r/"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#1877f2", fontSize: "20px" }}
    >
      <FontAwesomeIcon icon={faFacebook} />
    </a>
    <a
      href="https://github.com/Hasindu071"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#0a66c2", fontSize: "20px" }}
    >
      <FontAwesomeIcon icon={faLinkedin} />
    </a>
    <a
      href="https://www.instagram.com/___.hasindu.___?igsh=YW96cXYzNzY3bTJ2"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#c32aa3", fontSize: "20px" }}
    >
      <FontAwesomeIcon icon={faInstagram} />
    </a>
    <a
      href="http://www.youtube.com/@hasinduthirasara2449"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#ff0000", fontSize: "20px" }}
    >
      <FontAwesomeIcon icon={faYoutube} />
    </a>
  </div>
  <p style={{ fontSize: "16px", color: "#555", marginBottom: "10px" }}>
    Your trusted partner in tire repair and retreading.
  </p>
  <footer style={{ fontSize: "14px", color: "#555" }}>
    <p>&copy; 2023 Ryak Tires. All rights reserved.</p>
  </footer>
</div>
    </div>
  );
}

export default HomePage;