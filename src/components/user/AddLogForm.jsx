import { useState, useMemo } from 'react';
import './AddLogForm.css';

function AddLogForm({ onSubmit, onCancel, multiplier, loading }) {
  const [type, setType] = useState('overtime');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [hours, setHours] = useState('');
  const [comment, setComment] = useState('');

  const creditedPreview = useMemo(() => {
    if (!hours || isNaN(parseFloat(hours))) return '';
    const factHours = parseFloat(hours);
    const credited = type === 'overtime' ? factHours * multiplier : -factHours;
    return `Credited: ${credited > 0 ? '+' : ''}${credited.toFixed(1)} hrs`;
  }, [hours, type, multiplier]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hours || parseFloat(hours) < 0.25) {
      return;
    }
    onSubmit(date, type, hours, comment);
  };

  return (
    <div className="card">
      <form className="add-log-form" onSubmit={handleSubmit}>
        <h3>New Entry</h3>
        
        <div className="form-group">
          <label>Type</label>
          <div className="type-selector">
            <button
              type="button"
              className={`type-btn ${type === 'overtime' ? 'active' : ''}`}
              onClick={() => setType('overtime')}
            >
              Overtime
            </button>
            <button
              type="button"
              className={`type-btn ${type === 'timeoff' ? 'active' : ''}`}
              onClick={() => setType('timeoff')}
            >
              Time Off
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="logDate">Date</label>
          <input
            type="date"
            id="logDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="logHours">Hours</label>
          <input
            type="number"
            id="logHours"
            step="0.25"
            min="0.25"
            max="24"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            required
            placeholder="e.g., 4.5"
            title="Enter hours worked (0.25 to 24)"
          />
          {creditedPreview && <p className="credited-preview">{creditedPreview}</p>}
          <small style={{ color: 'var(--gray-500)', fontSize: '12px', marginTop: '4px', display: 'block' }}>
            Minimum: 0.25 hours (15 min)
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="logComment">
            Comment <span style={{ color: 'var(--gray-400)', fontWeight: 'normal' }}>(optional)</span>
          </label>
          <input
            type="text"
            id="logComment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="e.g., Project X, urgent task"
            maxLength="200"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button type="button" onClick={onCancel} className="btn btn-secondary" disabled={loading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddLogForm;

