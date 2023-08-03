import React, { useState } from 'react';
import './styles.css';

const criteria = {
  "Location": "",
  "Age": "",
  "SquareFootage": "",
  "Bedrooms": "",
  "Bathrooms": "",
  "Kitchen": "",
  "Basement": "",
  "Roof": {
    "options": ["Shingle", "Tile", "Slate"],
    "Shingle": { "Low": 1000, "Medium": 5000, "High": 10000 },
    "Tile": { "Low": 2000, "Medium": 6000, "High": 12000 },
    "Slate": { "Low": 3000, "Medium": 7000, "High": 15000 },
    "value": ""
  },
  "Floor": {
    "options": ["Tile", "Hardwood", "Carpet"],
    "Tile": { "Low": 500, "Medium": 2000, "High": 4000 },
    "Hardwood": { "Low": 800, "Medium": 3000, "High": 5000 },
    "Carpet": { "Low": 300, "Medium": 1000, "High": 2000 },
    "value": ""
  },
  "Siding": {
    "options": ["Vinyl", "Wood", "Brick"],
    "Vinyl": { "Low": 1000, "Medium": 3000, "High": 5000 },
    "Wood": { "Low": 2000, "Medium": 4000, "High": 8000 },
    "Brick": { "Low": 3000, "Medium": 6000, "High": 12000 },
    "value": ""
  },
  "Countertops": {
    "options": ["Laminate", "Granite", "Marble"],
    "Laminate": { "Low": 500, "Medium": 1500, "High": 2500 },
    "Granite": { "Low": 800, "Medium": 2000, "High": 4000 },
    "Marble": { "Low": 1000, "Medium": 3000, "High": 5000 },
    "value": ""
  },
  "Garage": "",
  "Fireplace": "",
  "Patio": "",
  "Pool": "",
  "SecuritySystem": "",
  "HVAC": "",
  "Electrical": "",
  "Plumbing": "",
};

const Modal = ({ total, closeModal, squareFootage }) => (
  <div className="modal">
    <div className="modal-content">
      <h2>Estimated Total</h2>
      <p>The total estimated price of the home is: ${total}</p>
      <p>The price per square foot is: ${total / squareFootage}</p>
      <button onClick={closeModal}>Close</button>
    </div>
  </div>
);

const App = () => {
  const [state, setState] = useState(criteria);
  const [isModalOpen, setModalOpen] = useState(false);
  const [totalEstimation, setTotalEstimation] = useState(0);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (state[name]?.hasOwnProperty(value)) {
      setState((prevState) => ({
        ...prevState,
        [name]: { ...prevState[name], value },
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let total = 0;
    for (let key in state) {
      if (typeof state[key] === 'object') {
        total += state[key][state[key].value]?.Medium || 0;
      } else {
        total += Number(state[key]) || 0;
      }
    }
    setTotalEstimation(total);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="App">
      <h1>House Appraisal Estimator</h1>
      <form onSubmit={handleSubmit}>
        {Object.entries(state).map(([key, value]) => (
          <label key={key}>
            {key}:
            {typeof value === 'object' ? (
              <select name={key} value={value.value} onChange={handleChange}>
                <option value="">Select an option</option>
                {value.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input type="number" name={key} value={value} onChange={handleChange} />
            )}
          </label>
        ))}
        <button type="submit">Submit</button>
      </form>
      {isModalOpen && <Modal total={totalEstimation} closeModal={closeModal} squareFootage={state.SquareFootage} />}
    </div>
  );
};

export default App;