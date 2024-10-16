import React from 'react';

const Form = () => {
  return (
    <div style={{ flexDirection: 'column' }}>
      <form action>
        <div>
          <label htmlFor={'first_name'}>
            First Name
            <input id={'first_name'} type={'text'} />
          </label>
        </div>
        <div>
          <label htmlFor={'last_name'}>
            Last Name
            <input id={'last_name'} type={'text'} />
          </label>
        </div>
        <div>
          <label htmlFor={'phone_number'}>
            Phone Number
            <input id={'phone_number'} type={'number'} />
          </label>
        </div>
        <div>
          <label htmlFor={'email'}>
            Email
            <input id={'email'} type={'email'} />
          </label>
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
