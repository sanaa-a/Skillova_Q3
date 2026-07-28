import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    age: ''
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrors(null);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setFormData({ email: '', password: '', age: '' });
      } else {
        setStatus('error');
        setErrors(data);
      }
    } catch (err) {
      setStatus('error');
      setErrors({ detail: 'Cannot connect to backend. Is Django running?' });
    }
  };

  return (
    <div className="page">
      <div className="card">
        <p className="eyebrow">EVENT REGISTRATION</p>
        <h1>Reserve your spot</h1>
        <p className="subtext">
          Fill in your details below
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="username@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors?.email && <span className="field-error">{errors.email[0]}</span>}
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors?.password && <span className="field-error">{errors.password[0]}</span>}
          </label>

          <label>
            Age
            <input
              type="number"
              name="age"
              placeholder="Your age"
              value={formData.age}
              onChange={handleChange}
              required
            />
            {errors?.age && <span className="field-error">{errors.age[0]}</span>}
          </label>

          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Registering…' : 'Register'}
          </button>

          {errors?.detail && <p className="banner error">{errors.detail}</p>}
          {status === 'success' && (
            <p className="banner success">You're registered! Check your email for confirmation.</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;