import React, { useState } from "react";

function EditPostModal({ post, onClose, onSave }) {
  const [form, setForm] = useState({ ...post });

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Post</h3>

        <input
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <textarea
          value={form.content}
          onChange={(e) =>
            setForm({ ...form, content: e.target.value })
          }
        />

        <div className="modal-actions">
          <button onClick={() => onSave(form)}>Update</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditPostModal;
