import React, { useEffect, useState } from "react";
import { fetchProducts, Product } from "../services/productService";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center"
        >
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-48 object-cover rounded-xl mb-2"
          />
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-500">{product.description}</p>
          <span className="text-green-600 font-bold text-md mt-1">
            R$ {product.price.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
