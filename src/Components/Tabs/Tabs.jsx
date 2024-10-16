// For the 3 Tabs Ques Need To Add Context API for data flow in between different pages.
import React, { useState } from 'react';
import Form from './Form';

const Tabs = () => {
  const tabsData = [
    { id: 0, title: 'Profile' },
    { id: 1, title: 'Settings' },
    { id: 2, title: 'Messages' },
  ];

  const [activeTab, setActiveTab] = useState(tabsData[0]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {tabsData.map((item) => {
          return (
            <div
              onClick={() => {
                console.log('Click', item.id);
                setActiveTab({ id: item.id, title: item.title });
              }}
              style={{
                display: 'flex',
                flexDirection: 'row',
                height: '50px',
                width: '100px',
                padding: '10px',
                border: '2px',
                borderRadius: '50%',
                alignItems: 'center',
                justifyContent: 'center',
                background: item.id === activeTab.id ? 'red' : 'white',
              }}
            >
              {item.title}
            </div>
          );
        })}
      </div>
      {activeTab?.id ? <Form /> : null}
    </div>
  );
};

export default Tabs;
