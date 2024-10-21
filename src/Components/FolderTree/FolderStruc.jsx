import React, { useState } from 'react';

const FolderStruc = ({ data, handleTreeNodeInsertion }) => {
  const [isExpand, setIsExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setIsExpand(true);
    setShowInput({
      visible: true,
      isFolder: isFolder,
    });
  };

  const handleAddFolder = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      // Add Folder - For Add folder we need to do the tree Traversal in the Object for the root directory.
      handleTreeNodeInsertion(data.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (data.isFolder) {
    return (
      <div style={{ marginTop: 10 }}>
        <div className='folder' onClick={() => setIsExpand(!isExpand)}>
          <span>🗃️ {data.name}</span>
          <div>
            <button
              onClick={(e) => {
                handleNewFolder(e, true);
              }}
            >
              Add Folder
            </button>
            <button
              onClick={(e) => {
                handleNewFolder(e, false);
              }}
            >
              Add File
            </button>
          </div>
        </div>
        <div style={{ display: isExpand ? 'block' : 'none', paddingLeft: 20 }}>
          {showInput.visible && (
            <div className='inputContainer'>
              <span>{showInput.isFolder ? '🗃️' : '📁'}</span>
              <input
                className='inputContainer_input'
                type={'text'}
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                onKeyDown={(e) => {
                  handleAddFolder(e);
                }}
              />
            </div>
          )}
          {/* This is the Data inside the Folder or the Object */}
          {data.items.map((item) => {
            // To Render the items inside the Object, Iterating through the items inside the Object
            return (
              <FolderStruc
                data={item}
                handleTreeNodeInsertion={handleTreeNodeInsertion}
                key={item.id}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div className='file'>📁 {data.name}</div>;
  }
};

export default FolderStruc;
