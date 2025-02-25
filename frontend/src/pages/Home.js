import React, { useState, useEffect } from 'react';
import Form from '../components/Form';
import Card from '../components/Card';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [persons, setPersons] = useState([]);
  
  // Load saved persons from localStorage when component mounts
  useEffect(() => {
    const savedPersons = localStorage.getItem('collegeIdPersons');
    if (savedPersons) {
      setPersons(JSON.parse(savedPersons));
    }
  }, []);
  
  // Save persons to localStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem('collegeIdPersons', JSON.stringify(persons));
  }, [persons]);
  
  const handleAddPerson = (newPerson) => {
    setPersons(prevPersons => [...prevPersons, newPerson]);
  };
  
  const handleDeletePerson = (id) => {
    setPersons(prevPersons => prevPersons.filter(person => person.id !== id));
  };

  return (
    <div className="home-container">
      <Form onAddPerson={handleAddPerson} setIsLoading={setIsLoading} />
      
      {isLoading && <div className="loading">Loading...</div>}
      
      <div className="cards-container">
        <h2>Submitted Entries</h2>
        {persons.length === 0 ? (
          <p>No entries yet. Fill the form to create a new ID.</p>
        ) : (
          persons.map(person => (
            <Card 
              key={person.id} 
              person={person} 
              onDelete={() => handleDeletePerson(person.id)} 
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;