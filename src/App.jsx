import { useState } from "react";

import initialData from "./data/initialData";

import FileTree from "./components/FileTree";

import "./styles.css";

function App() {

  const [tree, setTree] =
    useState(initialData);

  const [showCount, setShowCount] =
    useState(false);

  // ADD NODE
  const addNode = (
    tree,
    folderId,
    newNode
  ) => {

    return tree.map((node) => {

      if (
        node.id === folderId &&
        node.type === "folder"
      ) {

        return {
          ...node,
          children: [
            ...node.children,
            newNode,
          ],
        };
      }

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
  const deleteNode = (
    tree,
    nodeId
  ) => {

    return tree
      .filter(
        (node) => node.id !== nodeId
      )
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

      if (node.id === nodeId) {

        return {
          ...node,
          name: newName,
        };
      }

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

  const countItems = (nodes) => {
    let files = 0;
    let folders = 0;
    const traverse = (items) => {
      items.forEach((item) => {

        if (item.type === "file") {
          files++;
        }
        if (item.type === "folder") {
          folders++;
        }
        if (item.children) {
          traverse(item.children);
        }
      });
    };

    traverse(nodes);

    return { files, folders };
  };

  const { files, folders } =
    countItems(tree);

  return (
    <div className="app">

      {/* HEADER */}
      <div className="explorer-header">

        <div className="title">
          FILE EXPLORER
        </div>

      </div>

      {/* BUTTONS */}
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
        <button
          className="count-btn"
          onClick={() =>
            setShowCount(!showCount)
          }>
          Show Count
        </button>
      </div>

      {/* COUNT OUTPUT */}
      {showCount && (
        <div className="count-output">

          <p>
            Total Files:
            <span> {files}</span>
          </p>

          <p>
            Total Folders:
            <span> {folders}</span>
          </p>

        </div>
      )}

      {/* EMPTY STATE */}
      {tree.length === 0 && (
        <p className="empty-text">
          No files or folders yet
        </p>
      )}

      {/* FILE TREE */}
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