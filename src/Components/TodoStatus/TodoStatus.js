import { Menu, Dropdown, Button } from "antd";

const TodoStatus = () => {
  const menu = (
    <Menu selectable>
      <Menu.Item key={1}>In progress</Menu.Item>
      <Menu.Item key={2}>Postponed</Menu.Item>
      <Menu.Item key={3}>Completed</Menu.Item>
      <Menu.Item key={4} danger>Rejected</Menu.Item>
    </Menu>
  );
  return (
    <div>
      <Dropdown overlay={menu} placement="topRight">
        <Button type="primary">status</Button>
      </Dropdown>
    </div>
  );
};
export default TodoStatus;
