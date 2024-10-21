// Have To Implement a Recursion Based Solution for this Question.
import { useState } from 'react';

const FolderStruc = () => {
  const root = [
    {
      name: 'RootFolder1',
      isFolder: true,
      isFile: false,
      nestedFiles: [
        {
          name: 'RootFolderNestedFolder1',
          isFolder: true,
          isFile: false,
          nestedFiles: [],
        },
        { name: 'folderFile1', isFile: true, isFolder: false },
        { name: 'folderFile2', isFile: true, isFolder: false },
      ],
    },
    {
      name: 'RootFolder2',
      isFolder: true,
      isFile: false,
      nestedFiles: [],
    },
  ];

  const [rootFolder, setRootFolder] = useState(root);

  const handleRootFileAdd = (index) => {
    const addedFile = {
      isFile: true,
      isFolder: false,
      name: `file${index}`,
    };
    setRootFolder((prevState) => {
      const updatedRoot = [...prevState];
      updatedRoot[index].nestedFiles = [
        ...updatedRoot[index].nestedFiles,
        addedFile,
      ];
      return updatedRoot;
    });
  };

  const handleRootFolderAdd = (index) => {
    const addedFolder = {
      isFile: false,
      isFolder: true,
      nestedFiles: [],
      name: `folder${index}`,
    };
    setRootFolder((prevState) => {
      const updatedRoot = [...prevState];
      updatedRoot[index].nestedFiles = [
        ...updatedRoot[index].nestedFiles,
        addedFolder,
      ];
      return updatedRoot;
    });
  };

  const handle0LvlFileAdd = () => {};
  const handle0LvlFolderAdd = () => {};

  const nestedFolderAdd = (index) => {
    // const addedFolder = {
    //   isFile: false,
    //   isFolder: true,
    //   nestedFiles: [],
    //   name: `NestedFolder${index}`,
    // };
    const updatedRoot = [...rootFolder];
    // setRootFolder((prevState) => {
    //   const updatedRoot = [...prevState];
    //   updatedRoot[index].nestedFiles = [
    //     ...updatedRoot[index].nestedFiles,
    //     addedFolder,
    //   ];
    //   return updatedRoot;
    // });
  };

  const nestedFileAdd = () => {};

  const deleteFile = (name) => {};

  return (
    <main style={{ marginLeft: '10px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h1>Root Folder</h1>
        <button onClick={() => handle0LvlFileAdd()}>Add File</button>
        {/* This will add file in the root */}
        <button onClick={() => handle0LvlFolderAdd()}>Add Folder</button>
        {/* This will add folder in the root */}
      </div>
      {/* This Reps the Root Folders */}
      {rootFolder.map((item, index) => {
        return (
          <div style={{ marginLeft: '20px' }}>
            <div>
              {item.name}
              <button onClick={(e) => handleRootFileAdd(index, e)}>
                Add File
              </button>
              {/* This will add file in the 1st Nested root */}
              <button onClick={(e) => handleRootFolderAdd(index, e)}>
                Add Folder
              </button>
              {/* This will add folder in the 1st Nested root */}
            </div>
            {item.isFolder ? (
              <div>
                {item.nestedFiles.map((nestedItem, nestedIndex) => {
                  return (
                    <div>
                      {nestedItem.isFile ? (
                        // This Reps the NestedFile.
                        <div
                          style={{
                            marginLeft: '10px',
                            marginTop: '5px',
                            marginBottom: '10px',
                          }}
                        >
                          {nestedItem.name}
                          <button
                            onClick={() => deleteFile(item.name, nestedIndex)}
                          >
                            Delete
                          </button>
                        </div>
                      ) : (
                        // This Reps the NestFolder.
                        <div
                          style={{
                            marginLeft: '10px',
                            marginTop: '5px',
                            marginBottom: '10px',
                          }}
                        >
                          {nestedItem.name}
                          <button onClick={() => nestedFileAdd(nestedIndex)}>
                            Add File
                          </button>
                          <button onClick={() => nestedFolderAdd(nestedIndex)}>
                            Add Folder
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </main>
  );
};

export default FolderStruc;
