import { useState } from 'react';
import './Modal.css';

function EditNameModal({ currentName, onSave, onCancel }) {
  const [name, setName] = useState(currentName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim());
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Edit Name</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nameInput">Name:</label>
            <input
              type="text"
              id="nameInput"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength="100"
              required
              autoFocus
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditNameModal;

