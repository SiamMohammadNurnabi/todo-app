import { Button, Card, Col, Input, Row } from "antd";
import { useState, useRef, useEffect } from "react";
import TodoStatus from "../TodoStatus/TodoStatus";
import { StarOutlined, StarFilled } from "@ant-design/icons";

const SingleTodo = (props) => {
  const inputValueRef = useRef();
  const [editState, setEditState] = useState(false);
  const [importantState, setImportantState] = useState({
    isImportant: true,
    background: "grey",
  });
  useEffect(() => {});
  const editHandler = () => {
    setEditState(true);
  };

  const importantStateOnHandler = () => {
    setImportantState({ isImportant: false, background: "green" });
  };

  const importantStateOffHandler = () => {
    setImportantState({ isImportant: true, background: "grey" });
  };

  const cancelHandler = () => {
    setEditState(false);
  };

  return (
    <div
      className="singleTodo"
      style={{
        margin: 10,
      }}
    >
      <Row>
        <Col span={24}>
          <Card
            bordered={true}
            style={{
              background: importantState.background,
              position: "relative",
            }}
          >
            {editState ? (
              <div>
                <Input.TextArea
                  defaultValue={props.info.data}
                  ref={inputValueRef}
                />
                {/* <p>siam:{inputValueRef.current.value}</p> */}
                <Button
                  key="back"
                  type="primary"
                  style={{ margin: 10 }}
                  onClick={cancelHandler}
                >
                  Cancel
                </Button>
                <Button
                  key="submit"
                  type="primary"
                  onClick={() => {
                    props.saved(inputValueRef.current.value);
                    console.log("inputValueRef", inputValueRef);
                  }}
                >
                  Save
                </Button>
              </div>
            ) : (
              <div>
                <p>{props.info.data}</p>
                <p>{props.info.date}</p>
                {importantState.isImportant ? (
                  <p onClick={importantStateOnHandler}>
                    <StarOutlined />
                  </p>
                ) : (
                  <p onClick={importantStateOffHandler}>
                    <StarFilled />
                  </p>
                )}
                <TodoStatus
                  style={{ position: "absolute", top: 10, left: 600 }}
                />
                <Button
                  type="primary"
                  style={{ margin: 10 }}
                  onClick={editHandler}
                >
                  Edit
                </Button>
                <Button type="danger" onClick={props.deleted}>
                  Delete
                </Button>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SingleTodo;
