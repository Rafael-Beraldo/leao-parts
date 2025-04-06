import { useEffect, useState } from "react";

import "../styles/Product.css";

import { useParams } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { Product, fetchProducts } from "../services/productService";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts().then((data) => {
      const found = data.find((item) => item.id.toString() === id);
      setProduct(found || null);
    });
  }, [id]);

  if (!product) {
    return <p className="product-loading">Carregando item do catálogo...</p>;
  }

  return (
    <div>
      <Header />
      <div className="catalog-page">
        <div className="catalog-container">
          <div className="catalog-image-box">
            <img src={product.image_url} alt={product.name} />
          </div>

          <div className="catalog-details">
            <h1 className="catalog-title">{product.name}</h1>

            <div className="catalog-meta">
              <p>
                <strong>Marca:</strong> {product.category}
              </p>
              <p>
                <strong>ID da peça:</strong> #{product.id}
              </p>
              {/* <p><strong>Preço de referência:</strong> R$ {product.price.toFixed(2)}</p> */}
            </div>

            <div className="catalog-description">
              <h2>Descrição técnica</h2>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
