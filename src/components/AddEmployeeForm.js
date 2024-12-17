import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import './style.css';

const AddEmployeeForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      employeeId: "",
      email: "",
      phone: "",
      department: "",
      dateOfJoining: "",
      role: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      employeeId: Yup.string()
        .max(10, "Employee ID must be 10 characters or less")
        .required("Employee ID is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
      department: Yup.string().required("Department is required"),
      dateOfJoining: Yup.date()
        .max(new Date(), "Date of joining cannot be in the future")
        .required("Date of joining is required"),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/employees",
          values
        );
        alert(response.data.message); // Display success message
        resetForm();
      } catch (error) {
        alert(error.response?.data?.error || "An error occurred");
      }
    },
  });

  return (
    <div className="container mt-5">
      <h1>Add Employee</h1>
      <form onSubmit={formik.handleSubmit}>
        {/* Input Fields */}
        {["name", "employeeId", "email", "phone", "role"].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label">{field}</label>
            <input
              type="text"
              name={field}
              className={`form-control ${
                formik.touched[field] && formik.errors[field]
                  ? "is-invalid"
                  : ""
              }`}
              value={formik.values[field]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched[field] && formik.errors[field] && (
              <div className="invalid-feedback">{formik.errors[field]}</div>
            )}
          </div>
        ))}

        {/* Department Dropdown */}
        <div className="mb-3">
          <label className="form-label">Department</label>
          <select
            name="department"
            className={`form-control ${
              formik.touched.department && formik.errors.department
                ? "is-invalid"
                : ""
            }`}
            value={formik.values.department}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
          </select>
          {formik.touched.department && formik.errors.department && (
            <div className="invalid-feedback">
              {formik.errors.department}
            </div>
          )}
        </div>

        {/* Date Picker */}
        <div className="mb-3">
          <label className="form-label">Date of Joining</label>
          <input
            type="date"
            name="dateOfJoining"
            className={`form-control ${
              formik.touched.dateOfJoining && formik.errors.dateOfJoining
                ? "is-invalid"
                : ""
            }`}
            value={formik.values.dateOfJoining}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.dateOfJoining && formik.errors.dateOfJoining && (
            <div className="invalid-feedback">
              {formik.errors.dateOfJoining}
            </div>
          )}
        </div>

        {/* Buttons */}
        <button type="submit" className="btn btn-primary me-2">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={formik.handleReset}
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
