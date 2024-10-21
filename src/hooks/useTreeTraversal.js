const useTreeTraverse = () => {
  // This will contain another function - Insert Node - For adding of a folder or file in the Root folder.

  // Input for the insertNode func -
  // 1. Tree - It will take the whole tree. - Root Object Structure.
  // 2. folderId - It will take the id of the folder in which we need to add the folder or the file.
  // 3. item - The item which is going to be created.
  // 4. isFolder - This will be the type of the item it is - Folder or File
  function insertNode(tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      // unshift will push the item in the front of the tree - At the 0th Index
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
      });
      return tree;
    }
    // This is for the Nested Items in the Tree Structure. Will loop through the Nested Items using a map on the items of the tree - DFS on the Tree.
    let recursiveTreeRes = [];
    // This recursiveTreeRes will return a whole array of the subTree/Object we are traversing.
    recursiveTreeRes = tree.items.map((treeItem) => {
      // Here we need to iterate through each and every item of the tree, if we leave here then it will only be just for the 1st level of the tree. So for the whole tree we will use Recursion.
      return insertNode(treeItem, folderId, item, isFolder);
    });

    // This recursiveTreeRes will return a whole array of the subTree/Object we are traversing. so we need to save it in the initial tree by setting the items in the tree to recursiveTreeRes.
    return { ...tree, items: recursiveTreeRes };
  }

  // Implement these 2 -
  const updateNode = () => {};
  const deleteNode = () => {};

  return { insertNode, updateNode, deleteNode };
};

export default useTreeTraverse;
