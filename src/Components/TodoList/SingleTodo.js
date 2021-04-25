import { Button, Card, Col, Input, Row } from "antd";
import { useState, useEffect } from "react";
import TodoStatus from "../TodoStatus/TodoStatus";
import { StarOutlined, StarFilled } from "@ant-design/icons";

const SingleTodo = (props) => {
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
            }}
          >
            {editState ? (
              <div>
                <Input.TextArea
                  name="data"
                  initialValue={props.info.data}
                  onChange={props.edited}
                />
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
                    props.saved();
                    cancelHandler();
                  }}
                >
                  Save
                </Button>
              </div>
            ) : (
              <>
                <Row>
                  <Col span={8}>
                    {importantState.isImportant ? (
                      <p onClick={importantStateOnHandler}>
                        <StarOutlined />
                      </p>
                    ) : (
                      <p onClick={importantStateOffHandler}>
                        <StarFilled />
                      </p>
                    )}
                  </Col>
                  <Col span={8} />
                  <Col span={8}>
                    <TodoStatus
                      changed={props.statusChanged}
                      status={props.info.status}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <p>{props.info.data}</p>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <p>{props.info.date}</p>
                  </Col>
                  <Col span={8} />
                  <Col span={8}>
                    <div>
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
                  </Col>
                </Row>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SingleTodo;
