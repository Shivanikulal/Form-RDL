import React, { useState } from 'react';

function Form({ onAddPerson, setIsLoading }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    email: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    try {
      setIsLoading(true);
      
      // Generate a unique ID for the person
      const id = Date.now().toString();
      
      // Create a new person object with the form data
      const newPerson = {
        id,
        ...formData,
        profileImage: previewImage
      };
      
      // Add the new person to the parent component's state
      onAddPerson(newPerson);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        email: '',
      });
      setProfileImage(null);
      setPreviewImage(null);
      
    } catch (err) {
      setError('An error occurred while saving the data');
      console.error('Error submitting form:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>College ID Form</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name*</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Enter first name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName">Last Name*</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Enter last name"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number*</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            placeholder="Enter phone number"
            pattern="[0-9]{10}"
            title="Phone number must be 10 digits"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter email address"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Address*</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Enter full address"
            rows="3"
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="profileImage">Profile Picture</label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            onChange={handleImageChange}
            accept="image/*"
          />
          {previewImage && (
            <div className="image-preview">
              <img src={previewImage} alt="Preview" />
            </div>
          )}
        </div>
        
        <button type="submit" className="btn-submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;