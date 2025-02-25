import React from 'react';

function Card({ person, onDelete }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{person.firstName} {person.lastName}</h3>
        <button className="delete-btn" onClick={onDelete}>×</button>
      </div>
      
      <div className="card-body">
        {person.profileImage && (
          <div className="card-image">
            <img src={person.profileImage} alt={`${person.firstName} ${person.lastName}`} />
          </div>
        )}
        
        <div className="card-details">
          <p><strong>Phone:</strong> {person.phoneNumber}</p>
          <p><strong>Email:</strong> {person.email}</p>
          <p><strong>Address:</strong> {person.address}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;