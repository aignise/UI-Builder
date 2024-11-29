import React, { useState } from 'react';
import { Flex } from 'antd';
import SettingsPanel from './components/SettingsPanel';

const App = () => {
  const [boxes, setBoxes] = useState([]);

  const addBox = (parentId = null) => {
    const newBox = {
      id: Date.now(),
      parentId,
      justify: 'flex-start',
      align: 'flex-start',
      width: 100,
      height: 100,
      children: [],
    };
    if (parentId) {
      const updatedBoxes = boxes.map((box) =>
        box.id === parentId
          ? { ...box, children: [...box.children, newBox] }
          : box
      );
      setBoxes(updatedBoxes);
    } else {
      setBoxes([...boxes, newBox]);
    }
  };

  const deleteBox = (id) => {
    const deleteRecursive = (boxList) =>
      boxList.filter((box) => {
        if (box.children.length) {
          box.children = deleteRecursive(box.children);
        }
        return box.id !== id;
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
          box.children = updateRecursive(box.children);
        }
        return box;
      });
    setBoxes(updateRecursive(boxes));
  };

  const renderFlexBoxes = (boxList) =>
    boxList.map((box) => (
      <Flex
        key={box.id}
        style={{
          width: `${Math.max(box.width, 0)}%`,
          height: `${Math.max(box.height, 0)}%`,
          border: '1px solid #d9d9d9',
          margin: 0,
          padding: 0,
          display: 'flex',
          justifyContent: box.justify,
          alignItems: box.align,
          boxSizing: 'border-box',
          minWidth: 0,
          minHeight: 0,
        }}
      >
        {renderFlexBoxes(box.children)}
      </Flex>
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
        <Flex
          style={{
            width: '100%',
            height: '100%',
            border: '1px solid #40a9ff',
            overflow: 'auto',
            position: 'relative',
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
          }}
        >
          {renderFlexBoxes(boxes)}
        </Flex>
      </div>
    </div>
  );
};

export default App;
