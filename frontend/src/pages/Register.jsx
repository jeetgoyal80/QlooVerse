import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    bio: '',
    gender: 'Other',
    dob: '',
    location: '',
    tastes: {
      music: '',
      movies: '',
      food: '',
      travel: '',
      hobbies: '',
      books: '',
      disliked: '',
    },
  });

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Auto-fetch location
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(async ({ coords }) => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`);
        const data = await res.json();
        setFormData((prev) => ({
          ...prev,
          location: data?.address?.city || data?.address?.town || '',
        }));
      } catch (err) {
        console.error("Location fetch failed:", err);
      }
    });
  }, []);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('tastes.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        tastes: { ...prev.tastes, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setPreview(URL.createObjectURL(file));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'tastes') {
          Object.entries(value).forEach(([tasteKey, tasteValue]) => {
            data.append(`tastes[${tasteKey}]`, tasteValue);
          });
        } else {
          data.append(key, value);
        }
      });
      if (profilePic) data.append("profileImage", profilePic);

      const res = await axios.post('/api/auth/register', data);
      alert("Registration successful!");
      console.log(res.data);
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={styles.title}
      >
        QlooVerse
      </motion.h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Create Your Account</h2>

        <label>Username <span style={styles.star}>*</span></label>
        <input name="username" value={formData.username} onChange={handleChange} required style={styles.input} />

        <label>Email <span style={styles.star}>*</span></label>
        <input name="email" type="email" value={formData.email} onChange={handleChange} required style={styles.input} />

        <label>Password <span style={styles.star}>*</span></label>
        <input name="password" type="password" value={formData.password} onChange={handleChange} required style={styles.input} />

        <label>Short Bio</label>
        <textarea name="bio" value={formData.bio} onChange={handleChange} style={styles.input} />

        <label>Profile Picture</label>
        <input type="file" accept="image/*" onChange={handleImageChange} style={styles.input} />
        {preview && <img src={preview} alt="Preview" style={styles.preview} />}

        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange} style={styles.input}>
          <option>Other</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <label>Date of Birth</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} style={styles.input} />

        <label>Location</label>
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Detected or type manually" style={styles.input} />

        <h3 style={styles.subHeading}>Your Taste Profile</h3>

        {["music", "movies", "food", "travel", "hobbies", "books", "disliked"].map((field) => (
          <div key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              name={`tastes.${field}`}
              value={formData.tastes[field]}
              onChange={handleChange}
              placeholder={`e.g. ${field === "music" ? "Jazz, Indie" : ""}`}
              style={styles.input}
            />
          </div>
        ))}

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

const styles = {
 wrapper: {
    minHeight: '100vh',
    padding: '30px 20px',
    background: 'linear-gradient(to bottom right, #0f0c29, #302b63, #24243e)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#fff'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textShadow: '0 0 10px rgba(255,255,255,0.3)',
    marginBottom: '20px',
  },
  form: {
    background: 'rgba(0,0,0,0.7)',
    padding: '30px',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '600px',
    boxShadow: '0 0 30px rgba(0,0,0,0.5)',
  },
  heading: {
    textAlign: 'center',
    fontSize: '1.6rem',
    marginBottom: '25px',
    fontWeight: '600',
  },
  input: {
    background: '#2e2e2e',
    color: '#fff',
    border: '1px solid #555',
    borderRadius: '6px',
    padding: '10px',
    marginBottom: '15px',
    width: '100%',
    fontSize: '14px'
  },
  preview: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '50%',
    marginBottom: '15px',
    border: '2px solid #00ffd1'
  },
  button: {
    backgroundColor: '#a855f7',
    color: '#fff',
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px',
  },
  subHeading: {
    marginTop: '20px',
    marginBottom: '10px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#d8b4fe'
  },
  star: {
    color: 'red',
    marginLeft: 4,
  }
};

export default Register;
