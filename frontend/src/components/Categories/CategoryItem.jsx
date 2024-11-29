import PropTypes from "prop-types";
import "./CategoryItem.css";

const CategoryItem = ({ category }) => {
  return (
    <li className="category-item">
      <a href="#">
        <span className="category-title">{category.name}</span>
      </a>
    </li>
  );
};

export default CategoryItem;

CategoryItem.propTypes = {
  category: PropTypes.object,
};
