import React, { useState } from 'react';
import SettingsPanel from './components/SettingsPanel';

const App = () => {
  const [boxes, setBoxes] = useState([]);

  const addBox = (boxId = null, siblingType = null) => {
    const newBox = {
      id: Date.now(),
      parentId: null,
      justify: 'flex-start',
      align: 'flex-start',
      width: 100,
      height: 100,
      direction: 'column', // Default direction for new flexboxes
      children: [],
    };

    if (boxId) {
      // Helper function to add a child
      const insertChild = (boxList) => {
        return boxList.map((box) => {
          if (box.id === boxId) {
            newBox.parentId = box.id;
            return { ...box, children: [...box.children, newBox] };
          } else if (box.children.length > 0) {
            return { ...box, children: insertChild(box.children) };
          } else {
            return box;
          }
        });
      };

      // Helper function to add a sibling
      const insertSibling = (boxList) => {
        return boxList.map((box) => {
          if (box.children.length > 0) {
            const idx = box.children.findIndex((child) => child.id === boxId);
            if (idx !== -1) {
              // Found the parent of the box
              newBox.parentId = box.id;
              const newChildren = [...box.children];
              newChildren.splice(idx + 1, 0, newBox); // Insert newBox after the current box
              const direction = siblingType === 'column' ? 'row' : 'column';
              return { ...box, direction, children: newChildren };
            } else {
              // Recursively search in children
              return { ...box, children: insertSibling(box.children) };
            }
          }
          return box;
        });
      };

      if (siblingType) {
        // Add as a sibling
        const updatedBoxes = insertSibling(boxes);
        setBoxes(updatedBoxes);
      } else {
        // Add as a child
        const updatedBoxes = insertChild(boxes);
        setBoxes(updatedBoxes);
      }
    } else {
      // Add a root-level box
      setBoxes([...boxes, newBox]);
    }
  };

  const deleteBox = (id) => {
    const deleteRecursive = (boxList) =>
      boxList
        .filter((box) => box.id !== id)
        .map((box) => {
          if (box.children.length) {
            return { ...box, children: deleteRecursive(box.children) };
          }
          return box;
        });
    setBoxes(deleteRecursive(boxes));
  };

  const updateBox = (id, key, value) => {
    const updateRecursive = (boxList) =>
      boxList.map((box) => {
        if (box.id === id) {
          return { ...box, [key]: value };
        }
        if (box.children.length) {
          return { ...box, children: updateRecursive(box.children) };
        }
        return box;
      });
    setBoxes(updateRecursive(boxes));
  };

  const renderFlexBoxes = (boxList) =>
    boxList.map((box) => (
      <div
        key={box.id}
        style={{
          width: `${Math.max(box.width, 0)}%`,
          height: `${Math.max(box.height, 0)}%`,
          border: '1px solid #d9d9d9',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: box.direction, // Set the flex direction
          justifyContent: box.justify,
          alignItems: box.align,
          boxSizing: 'border-box',
          minWidth: 0,
          minHeight: 0,
        }}
      >
        {box.children.length > 0 && renderFlexBoxes(box.children)}
      </div>
    ));

  return (
    <div style={{ display: 'flex', height: '100vh', margin: 0, padding: 0 }}>
      {/* Sidebar */}
      <div
        style={{
          width: '300px',
          backgroundColor: '#f0f2f5',
          borderRight: '1px solid #d9d9d9',
          overflowY: 'auto',
          padding: '10px',
        }}
      >
        <SettingsPanel
          boxes={boxes}
          addBox={addBox}
          deleteBox={deleteBox}
          updateBox={updateBox}
        />
      </div>

      {/* Simulated Screen */}
      <div style={{ flex: 1, padding: 0, margin: 0 }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            border: '1px solid #40a9ff',
            overflow: 'auto',
            position: 'relative',
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column', // Root-level stacking is vertical by default
          }}
        >
          {renderFlexBoxes(boxes)}
        </div>
      </div>
    </div>
  );
};

export default App;
