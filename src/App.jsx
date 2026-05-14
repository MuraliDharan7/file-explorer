import { useState } from "react";
import initialData from "./data/initialData";
import FileTree from "./components/FileTree";
import "./styles.css";

function App() {
  const [tree, setTree] = useState(initialData);

  // ADD NODE
  const addNode = (tree, folderId, newNode) => {
    return tree.map((node) => {

      // MATCHED FOLDER
      if (
        node.id === folderId &&
        node.type === "folder"
      ) {
        return {
          ...node,
          children: [...node.children, newNode],
        };
      }

      // RECURSIVELY SEARCH CHILDREN
      if (node.children) {
        return {
          ...node,
          children: addNode(
            node.children,
            folderId,
            newNode
          ),
        };
      }

      return node;
    });
  };

  // DELETE NODE
  const deleteNode = (tree, nodeId) => {
    return tree
      .filter((node) => node.id !== nodeId)
      .map((node) => {

        if (node.children) {
          return {
            ...node,
            children: deleteNode(
              node.children,
              nodeId
            ),
          };
        }

        return node;
      });
  };

  // RENAME NODE
  const renameNode = (
    tree,
    nodeId,
    newName
  ) => {
    return tree.map((node) => {

      // MATCHED NODE
      if (node.id === nodeId) {
        return {
          ...node,
          name: newName,
        };
      }

      // SEARCH CHILDREN
      if (node.children) {
        return {
          ...node,
          children: renameNode(
            node.children,
            nodeId,
            newName
          ),
        };
      }

      return node;
    });
  };

  return (
  <div className="app">

    <div className="title">
      FILE EXPLORER
    </div>

    <div className="top-buttons">

  {/* NEW FILE */}
  <button
  onClick={() => {

    const newFile = {
      id: crypto.randomUUID(),
      name: "",
      type: "file",
      isNew: true,
    };

    setTree((prev) => [
      ...prev,
      newFile,
    ]);
  }}
>
  + New File
</button>

  {/* NEW FOLDER */}
  <button
  onClick={() => {

    const newFolder = {
      id: crypto.randomUUID(),
      name: "",
      type: "folder",
      children: [],
      isNew: true,
    };

    setTree((prev) => [
      ...prev,
      newFolder,
    ]);
  }}
>
  + New Folder
</button>

</div>
{tree.length === 0 && (
  <p className="empty-text">
    No files or folders yet
  </p>
)}
    <FileTree
      tree={tree}
      setTree={setTree}
      addNode={addNode}
      deleteNode={deleteNode}
      renameNode={renameNode}
    />
  </div>
);
}

export default App;