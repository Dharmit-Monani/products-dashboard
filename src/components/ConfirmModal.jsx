import { motion, AnimatePresence } from "framer-motion";
import { MdWarning } from "react-icons/md";

// ConfirmModal — shown before deleting a product
const ConfirmModal = ({ isOpen, onConfirm, onCancel, title, message, loading }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            className="modal"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()} // prevent overlay click
          >
            {/* Icon */}
            <div className="modal-icon">
              <MdWarning />
            </div>

            {/* Text */}
            <h3>{title || "Are you sure?"}</h3>
            <p>{message || "This action cannot be undone."}</p>

            {/* Actions */}
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={onCancel}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={onConfirm}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
