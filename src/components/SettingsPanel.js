import React from 'react';
import { Collapse, Segmented, InputNumber, Button } from 'antd';

const { Panel } = Collapse;

const justifyOptions = [
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
];
const alignOptions = ['flex-start', 'center', 'flex-end', 'stretch'];

const SettingsPanel = ({ boxes, addBox, deleteBox, updateBox }) => {
  const renderBoxSettings = (box) => (
    <Panel
      header={`Flex Box ${box.id}`}
      key={box.id}
      extra={
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            size="small"
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
              addBox(box.id); // Add child box
            }}
          >
            Add Child
          </Button>
          <Button
            size="small"
            danger
            onClick={(e) => {
              e.stopPropagation();
              deleteBox(box.id); // Delete current box
            }}
          >
            Delete
          </Button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Flex Justification */}
        <div>
          <p>Justify Content:</p>
          <Segmented
            options={justifyOptions}
            value={box.justify}
            onChange={(value) => updateBox(box.id, 'justify', value)}
            style={{ maxWidth: '100%' }}
            getPopupContainer={(trigger) => trigger.parentNode}
          />
        </div>

        {/* Flex Alignment */}
        <div>
          <p>Align Items:</p>
          <Segmented
            options={alignOptions}
            value={box.align}
            onChange={(value) => updateBox(box.id, 'align', value)}
            style={{ maxWidth: '100%' }}
            getPopupContainer={(trigger) => trigger.parentNode}
          />
        </div>

        {/* Box Width */}
        <div>
          <p>Width (%):</p>
          <InputNumber
            min={0}
            max={100}
            value={box.width}
            onChange={(value) => updateBox(box.id, 'width', value)}
            style={{ width: '100%' }}
          />
        </div>

        {/* Box Height */}
        <div>
          <p>Height (%):</p>
          <InputNumber
            min={0}
            max={100}
            value={box.height}
            onChange={(value) => updateBox(box.id, 'height', value)}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Nested Children */}
      {box.children.length > 0 && (
        <Collapse style={{ marginTop: '16px' }}>
          {box.children.map((childBox) => renderBoxSettings(childBox))}
        </Collapse>
      )}
    </Panel>
  );

  return (
    <div>
      <Button
        type="primary"
        onClick={() => addBox(null)}
        style={{ marginBottom: '16px', width: '100%' }}
      >
        Add Flex Box
      </Button>
      <Collapse accordion>
        {boxes.length > 0 ? (
          boxes.map((box) => renderBoxSettings(box))
        ) : (
          <p style={{ textAlign: 'center', marginTop: '16px' }}>
            No flex boxes yet! Use the button above to add one.
          </p>
        )}
      </Collapse>
    </div>
  );
};

export default SettingsPanel;
