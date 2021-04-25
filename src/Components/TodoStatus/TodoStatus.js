import { Form, Select } from "antd";

const TodoStatus = (props) => {
  console.log(props.status);
  return (
    <div>
      <Form>
        <Form.Item name="status" label="status">
          <Select defaultValue={props.status} onChange={props.changed}>
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="postponed">Postponed</Select.Option>
            <Select.Option value="completed">Completed</Select.Option>
            <Select.Option value="rejected">Rejected</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};
export default TodoStatus;
