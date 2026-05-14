import FileNode from "./FileNode";

function FileTree({
  tree,
  setTree,
  addNode,
  deleteNode,
  renameNode,
}) {
  return (
    <div>
      {[...tree]
  .sort((a, b) => {

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
  })
  .map((node) => (
        <FileNode
          key={node.id}
          node={node}
          setTree={setTree}
          addNode={addNode}
          deleteNode={deleteNode}
          renameNode={renameNode}
        />
      ))}
    </div>
  );
}

export default FileTree;