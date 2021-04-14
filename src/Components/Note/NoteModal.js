import { Input, Modal, Button } from "antd";

const NoteModal = (props) => {
  return (
    <div>
      <Modal
        title="Add Task"
        visible={props.visible}
        onCancel={props.canceled}
        footer={[
          <Button key="back" onClick={props.canceled}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={props.saved}>
            Save
          </Button>,
        ]}
      >
        <Input.TextArea value={props.dataValue} onChange={props.changed} />
      </Modal>
    </div>
  );
};
export default NoteModal;
