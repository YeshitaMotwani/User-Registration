import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

function RegistrationForm() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', dob: '', address: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { name, email, phone, dob, address } = form;
    if (!name || !email || !phone || !dob || !address) {
      return 'All fields are required.';
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return 'Name should contain only letters and spaces.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Invalid email format.';
    }
    if (!/^\d{10}$/.test(phone)) {
      return 'Phone number must be 10 digits.';
    }
    if (address.length < 10) {
      return 'Address must be at least 10 characters long.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/users', form);
      setSuccess('User registered successfully!');
      setTimeout(() => navigate('/users'), 1000);
    } catch (err) {
      setError('Failed to register user.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
        <h3 className="text-center mb-3 text-primary">Register New User</h3>

        {error && <div className="alert alert-danger py-2">{error}</div>}
        {success && <div className="alert alert-success py-2">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label className="form-label">Full Name</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-person"></i></span>
              <input name="name" value={form.name} className="form-control" placeholder="Enter full name" onChange={handleChange} />
            </div>
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-envelope"></i></span>
              <input name="email" value={form.email} className="form-control" placeholder="Enter email" onChange={handleChange} />
            </div>
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Phone</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-telephone"></i></span>
              <input name="phone" value={form.phone} className="form-control" placeholder="10-digit phone number" onChange={handleChange} />
            </div>
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Date of Birth</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-calendar"></i></span>
              <input name="dob" value={form.dob} type="date" className="form-control" onChange={handleChange} />
            </div>
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Address</label>
            <textarea name="address" value={form.address} className="form-control" placeholder="Enter full address" rows="3" onChange={handleChange}></textarea>
          </div>

          <button className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
