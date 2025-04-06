import "../styles/CategoryRow.css";

import daf from "../assets/daf.jpg";
import iveco from "../assets/iveco.jpg";
import volvo from "../assets/volvo.jpg";
import scania from "../assets/scania.jpg";
import mercedes from "../assets/mercedes.jpg";
import volkswagen from "../assets/volkswagen.jpg";

type Props = {
  onCategoryClick?: (category: string | null) => void;
  selectedCategory?: string | null;
};

const categories = [
  { name: "Volkswagen", image: volkswagen },
  { name: "Iveco", image: iveco },
  { name: "DAF", image: daf },
  { name: "Mercedes", image: mercedes },
  { name: "Scania", image: scania },
  { name: "Volvo", image: volvo },
];

export default function CategoryRow({
  onCategoryClick,
  selectedCategory,
}: Props) {
  return (
    <div className="category-row">
      <h2 className="category-title">Categorias</h2>
      <div className="category-list">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.name;

          return (
            <div
              key={category.name}
              className={`category-card ${
                selectedCategory && !isSelected ? "faded" : ""
              }`}
              onClick={() => {
                if (onCategoryClick) {
                  onCategoryClick(isSelected ? null : category.name);
                }
              }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="category-image"
              />
              <div className="category-overlay">
                <h3>{category.name}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
