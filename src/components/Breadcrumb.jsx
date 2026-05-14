import { Link } from "react-router-dom";
import { MdChevronRight, MdHome } from "react-icons/md";

// Breadcrumb — enhanced styled component
// Usage: <Breadcrumb items={[{ label: "Products", to: "/products" }, { label: "Edit" }]} />

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="breadcrumb-enhanced">
      {/* Home icon always first */}
      <Link to="/" className="breadcrumb-home">
        <MdHome size={15} />
      </Link>

      {items.map((item, index) => (
        <span key={index} className="breadcrumb-item">
          {/* Separator */}
          <MdChevronRight className="breadcrumb-sep" />

          {/* Last item = current page (no link) */}
          {item.to ? (
            <Link to={item.to} className="breadcrumb-link">
              {item.label}
            </Link>
          ) : (
            <span className="breadcrumb-current">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
