function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal confirm">
        <p>{message}</p>

        <div className="modal-actions">
          <button className="yes" onClick={onConfirm}>
            Yes
          </button>
          <button className="no" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
