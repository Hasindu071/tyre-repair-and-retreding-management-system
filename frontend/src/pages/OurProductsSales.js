import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/NavBar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/OurProductsSales.css";

const OurProductsSales = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

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
              1024: { slidesPerView: 4 }
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
                    onClick={() => handleImageClick(product)}
                    style={{cursor: "pointer"}}
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

      {showModal && selectedProduct && (
        <div className="modal show fade" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedProduct.productName}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <img
                  src={`http://localhost:5000${selectedProduct.image}`}
                  alt={selectedProduct.productName}
                  className="img-fluid mb-3"
                />
                <p>{selectedProduct.description}</p>
                <p><strong>Price:</strong> {selectedProduct.price} LKR</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={handleCloseModal}></div>
        </div>
      )}
    </div>
  );
};

export default OurProductsSales;