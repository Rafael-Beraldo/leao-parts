import { Product } from "../services/productService";

interface Props {
  products: Product[];
}

export function ProductGrid({ products }: Props) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img
            src={product.image_url}
            alt={product.name}
            className="product-image"
          />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <strong>R$ {product.price.toFixed(2)}</strong>
        </div>
      ))}
    </div>
  );
}
