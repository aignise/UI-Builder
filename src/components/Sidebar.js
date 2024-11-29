import React from 'react';
import { Menu } from 'antd';

function Sidebar() {
  return (
    <Menu theme="dark" mode="inline">
      <Menu.Item key="1">Dashboard</Menu.Item>
      <Menu.Item key="2">Users</Menu.Item>
    </Menu>
  );
}

export default Sidebar;
