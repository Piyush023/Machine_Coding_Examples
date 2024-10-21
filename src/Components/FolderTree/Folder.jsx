import React, { useState } from 'react';
import explorer from './FolderData';
import FolderStruc from './FolderStruc';
import useTreeTraverse from '../../hooks/useTreeTraversal';

const Folder = () => {
  const [data, setData] = useState(explorer);

  const { insertNode } = useTreeTraverse();

  const handleTreeNodeInsertion = (folderId, item, isFolder) => {
    const newTree = insertNode(data, folderId, item, isFolder);
    setData(newTree);
  };

  return (
    <div style={{ marginLeft: 10 }}>
      <FolderStruc
        handleTreeNodeInsertion={handleTreeNodeInsertion}
        data={data}
      />
    </div>
  );
};

export default Folder;
