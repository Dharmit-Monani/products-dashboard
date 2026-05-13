// Loader — shown while API call is in progress
const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p className="loader-text">{text}</p>
    </div>
  );
};

// Skeleton card — shown as placeholder while data loads
export const SkeletonCard = () => (
  <div className="skeleton-card">
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div className="skeleton" style={{ height: 20, width: "60%" }} />
      <div className="skeleton" style={{ height: 20, width: "20%" }} />
    </div>
    <div className="skeleton" style={{ height: 14, width: "100%" }} />
    <div className="skeleton" style={{ height: 14, width: "80%" }} />
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
      <div className="skeleton" style={{ height: 28, width: "30%" }} />
      <div className="skeleton" style={{ height: 28, width: "40%" }} />
    </div>
  </div>
);

export default Loader;
