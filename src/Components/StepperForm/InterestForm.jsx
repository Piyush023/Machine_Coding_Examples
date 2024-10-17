import React, { useState } from 'react';

const InterestForm = ({ formData, setFormData }) => {
  const [selectedVal, setSelectedVal] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (e) => {
    console.log(e.target.value);
    setSelectedVal(e.target.value);
    setFormData({ ...formData, habits: e.target.value });
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setFormData({
      ...formData,
      fav_Game: [...formData.fav_Game, e.target.value],
    });
  };

  const dropDownOptions = [
    { value: 'Football', label: 'Football' },
    { value: 'Cricket', label: 'Cricket' },
    { value: 'Other', label: 'Other' },
  ];

  const checkBoxOptions = [
    { value: 'Football', label: 'Football' },
    { value: 'Cricket', label: 'Cricket' },
    { value: 'Other', label: 'Other' },
  ];

  return (
    <div>
      <h1>InterestForm</h1>
      <div style={{ flexDirection: 'column' }}>
        <h4>Hobbies</h4>
        <select value={formData.habits} onChange={(e) => handleChange(e)}>
          {dropDownOptions.map((item, index) => {
            return <option value={item.value}>{item.label}</option>;
          })}
        </select>
      </div>
      <div style={{ flexDirection: 'column' }}>
        <h4>Fav Game</h4>
        {checkBoxOptions.map((item) => {
          return (
            <>
              <label htmlFor={item.label}>{item.label}</label>
              <input
                value={formData.fav_Game}
                type={'checkbox'}
                name={item.label}
                id={item.label}
                onChange={(e) => {
                  handleOptionChange(e);
                }}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default InterestForm;
