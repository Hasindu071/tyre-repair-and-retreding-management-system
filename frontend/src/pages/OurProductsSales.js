import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/NavBar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/OurProductsSales.css"; // Regular CSS file

const OurProductsSales = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/OurProductOwner/getProducts");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
        <div>       
         <Navbar />
      <div className="loading-container-sale">
        <div className="loading-spinner-sale">Loading...</div>
      </div>
    </div>
    );
  }

  return (
    <div>
    <Navbar />
    <div className="main-container-sale">

      <div className="products-section-sale">
        <h1 className="section-title-sale">Recent Popular Products</h1>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          navigation
          className="swiper-container-sale"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="product-card-sale">
              <div className="card-content-sale">
                <img
                  src={`http://localhost:5000${product.image}`}
                  alt={product.productName}
                  className="product-image-sale"
                />
                <h2 className="product-title-sale">{product.productName}</h2>
                <p className="product-description-sale">{product.description}</p>
                <div className="price-rating-sale">
                  <span className="product-price-sale">{product.price} LKR</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
    </div>  
  );
};

export default OurProductsSales;
