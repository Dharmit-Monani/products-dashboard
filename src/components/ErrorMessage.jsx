import { MdErrorOutline, MdRefresh } from "react-icons/md";

// ErrorMessage — shown when API call fails
const ErrorMessage = ({ message = "Something went wrong.", onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-icon">
        <MdErrorOutline />
      </div>
      <p className="error-title">Oops! An error occurred</p>
      <p className="error-message">{message}</p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry} style={{ marginTop: "0.5rem" }}>
          <MdRefresh /> Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
