import { useState } from "react";
import { v4 as uuid } from "uuid";

import {
  FaChevronRight,
  FaChevronDown,
  FaFolder,
  FaFile,
} from "react-icons/fa";

function FileNode({
  node,
  setTree,
  addNode,
  deleteNode,
  renameNode,
}) {
  const [expanded, setExpanded] = useState(true);

  const [isEditing, setIsEditing] =
    useState(node.isNew || false);

  const [inputValue, setInputValue] =
    useState(node.name);

  // CREATE FILE
  const handleAddFile = (e) => {

  e.stopPropagation();

  const newFile = {
    id: uuid(),
    name: "",
    type: "file",
    isNew: true,
  };

  setExpanded(true);

  setTree((prev) =>
    addNode(prev, node.id, newFile)
  );
};

  // CREATE FOLDER
  const handleAddFolder = (e) => {

  e.stopPropagation();

  const newFolder = {
    id: uuid(),
    name: "",
    type: "folder",
    children: [],
    isNew: true,
  };

  setExpanded(true);

  setTree((prev) =>
    addNode(prev, node.id, newFolder)
  );
};

  // DELETE
  const handleDelete = (e) => {
    e.stopPropagation();

    setTree((prev) =>
      deleteNode(prev, node.id)
    );
  };

  // START RENAME
  const handleRename = (e) => {
    e.stopPropagation();

    setIsEditing(true);
  };

  // SAVE RENAME
  const handleRenameSubmit = () => {

  // DELETE EMPTY NODES
  if (!inputValue.trim()) {

    setTree((prev) =>
      deleteNode(prev, node.id)
    );

    return;
  }

  setTree((prev) =>
    renameNode(
      prev,
      node.id,
      inputValue
    )
  );

  setIsEditing(false);
};

  const sortNodes = (nodes) => {
  return [...nodes].sort((a, b) => {

    // FOLDERS FIRST
    if (
      a.type === "folder" &&
      b.type !== "folder"
    ) {
      return -1;
    }

    if (
      a.type !== "folder" &&
      b.type === "folder"
    ) {
      return 1;
    }

    // ALPHABETICAL
    return a.name.localeCompare(b.name);
  });
};
  return (
    <div className="node">

      <div className="node-row">

        {/* LEFT SIDE */}
        <div
          className="node-left"
          onClick={() =>
            node.type === "folder" &&
            setExpanded(!expanded)
          }
        >

          {/* ARROW */}
          {node.type === "folder" ? (
            expanded ? (
              <FaChevronDown size={10} />
            ) : (
              <FaChevronRight size={10} />
            )
          ) : (
            <div style={{ width: "10px" }} />
          )}

          {/* ICON */}
          {node.type === "folder" ? (
            <FaFolder color="#dcb67a" />
          ) : (
            <FaFile color="#c5c5c5" />
          )}

          {/* NAME */}
          {isEditing ? (
            <input
              className="input-field"
              value={inputValue}
              autoFocus
              onChange={(e) =>
                setInputValue(e.target.value)
              }
              onBlur={handleRenameSubmit}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRenameSubmit();
                }
              }}
            />
          ) : (
            <span className="node-name">
              {node.name}
            </span>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="node-actions">

          {node.type === "folder" && (
            <>
              <button
                className="action-btn"
                onClick={handleAddFile}
              >
                +File
              </button>

              <button
                className="action-btn"
                onClick={handleAddFolder}
              >
                +Folder
              </button>
            </>
          )}

          <button
            className="action-btn"
            onClick={handleRename}
          >
            Rename
          </button>

          <button
            className="action-btn"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      {/* CHILDREN */}
      {expanded &&
        sortNodes(node.children || []).map((child) => (
          <div
            className="children"
            key={child.id}
          >
            <FileNode
              node={child}
              setTree={setTree}
              addNode={addNode}
              deleteNode={deleteNode}
              renameNode={renameNode}
            />
          </div>
        ))}
    </div>
  );
}

export default FileNode;