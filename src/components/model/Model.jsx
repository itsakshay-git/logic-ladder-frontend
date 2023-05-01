import React, { useState } from "react";
import "./Model.scss";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      vendorName: "",
      pickupDate: "",
      status: "Shipped<",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.vendorName && formState.pickupDate && formState.status) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="page">vendorName</label>
            <input name="page" onChange={handleChange} value={formState.vendorName} />
          </div>
          <div className="form-group">
            <label htmlFor="description">pickupDate</label>
            <input
              name="description"
              onChange={handleChange}
              value={formState.pickupDate}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formState.status}
            >
              <option value="Shipped">Shipped</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn --btn --btn-primary " onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
