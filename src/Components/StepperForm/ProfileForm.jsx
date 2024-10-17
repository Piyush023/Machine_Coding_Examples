import React from 'react';

const ProfileForm = ({ formData, setFormData }) => {
  console.log(formData, 'data');
  return (
    <div>
      <h1>Profile</h1>
      <div style={{ flexDirection: 'column' }}>
        <label htmlFor={'name'}>Name:</label>
        <input
          value={formData.name}
          type={'text'}
          name={'name'}
          id={'name'}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
        />
      </div>
      <div style={{ flexDirection: 'column' }}>
        <label htmlFor={'email'}>Email:</label>
        <input
          value={formData.email}
          type={'text'}
          name={'email'}
          id={'email'}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
      </div>
      <div style={{ flexDirection: 'column' }}>
        <label htmlFor={'address1'}>Address1:</label>
        <input
          value={formData.address1}
          type={'text'}
          name={'address1'}
          id={'address1'}
          onChange={(e) => {
            setFormData({ ...formData, address1: e.target.value });
          }}
        />
      </div>
      <div style={{ flexDirection: 'column' }}>
        <label htmlFor={'address2'}>Address2:</label>
        <input
          value={formData.address2}
          type={'text'}
          name={'address2'}
          id={'address2'}
          onChange={(e) => {
            setFormData({ ...formData, address2: e.target.value });
          }}
        />
      </div>
    </div>
  );
};

export default ProfileForm;
