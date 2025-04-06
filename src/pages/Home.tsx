import { useEffect, useState } from "react";

import { useLocation, Link } from "react-router-dom";

import "../styles/Home.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import CategoryRow from "../components/CategoryRow";

import { fetchProducts, Product } from "../services/productService";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const query = useQuery();
  const search = query.get("search")?.toLowerCase() || "";
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search);
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <Header />

      <CategoryRow
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />

      <section className="product-section">
        <h2 className="section-title">Produtos</h2>
        <main className="product-grid">
          {filteredProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="product-link"
            >
              <div className="product-card">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-info">
                  <h2 className="product-title">{product.name}</h2>
                  <p className="product-description">{product.description}</p>
                  {/* <span className="product-price">R$ {product.price.toFixed(2)}</span> */}
                </div>
              </div>
            </Link>
          ))}
        </main>
      </section>

      <Footer />
    </div>
  );
}
