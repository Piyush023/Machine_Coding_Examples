import React from 'react';

const SettingForm = ({ formData, setFormData }) => {
  return (
    <div>
      <h1>SettingForm</h1>
      <div style={{ flexDirection: 'column' }}>
        <label htmlFor={'address1'}>Notification: </label>
        <input
          value={formData.notification}
          type={'checkbox'}
          name={'notification'}
          id={'notification'}
          onChange={(e) => {
            // handleOptionChange(e);
          }}
        />
      </div>
      <div style={{ flexDirection: 'column' }}>
        <label htmlFor={'address2'}>Privacy: </label>
        <input
          value={formData.privacy}
          type={'checkbox'}
          name={'privacy'}
          id={'privacy'}
          onChange={(e) => {
            // handleOptionChange(e);
          }}
        />
      </div>
    </div>
  );
};

export default SettingForm;
