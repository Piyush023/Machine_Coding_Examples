import React, { useCallback, useState } from 'react';
import ProfileForm from './ProfileForm';
import InterestForm from './InterestForm';
import SettingForm from './SettingForm';

const Form = () => {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: 0,
    addressLine1: '',
    addressLine2: '',
    habits: '',
    fav_Game: [''],
    notification: true,
    privacy: true,
  });

  const pageContent = [
    {
      title: 'Profile',
      content: <ProfileForm formData={formData} setFormData={setFormData} />,
    },
    {
      title: 'Interest',
      content: <InterestForm formData={formData} setFormData={setFormData} />,
    },
    {
      title: 'Setting',
      content: <SettingForm formData={formData} setFormData={setFormData} />,
    },
  ];
  console.log(pageContent.length - page);

  const progressBarLength = useCallback(() => {
    const progressPercentage = ((page + 1) / pageContent.length) * 100;
    return `${Math.min(progressPercentage, 100)}%`;
  }, [pageContent.length, page]);

  console.log(progressBarLength());
  return (
    <div className='form'>
      {/* Progress Bar */}
      <h1>{pageContent[page].title}</h1>
      {/* Form */}
      <div className='form-cont'>
        {/* Header  */}
        <div className='header'></div>
        <div
          style={{
            backgroundColor: 'red',
            width: '100%',
            height: '20px',
            alignSelf: 'center',
            alignContent: 'center',
            margin: 'auto',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              backgroundColor: 'yellow',
              width: progressBarLength(),
              height: '100%',
              display: 'flex',
              position: 'absolute',
              left: 0,
              top: 0,
            }}
          ></div>
        </div>
        {/* Content  */}
        <div className='content'>{pageContent[page].content}</div>
        {/* Footer For the Buttons */}
        <div className='footer'>
          <button
            disabled={page === 0}
            onClick={() => {
              setPage((prev) => prev - 1);
            }}
          >
            Prev
          </button>
          <button
            disabled={page === pageContent.length - 1}
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
