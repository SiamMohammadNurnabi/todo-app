import { Button, Card, Col, Input, Row } from "antd";
import { useState, useRef,useEffect } from "react";
import TodoStatus from "../TodoStatus/TodoStatus";

const SingleTodo = (props) => {
  const inputValueRef = useRef();
  const [editState, setEditState] = useState(false);
  useEffect(()=>{

  })
  const editHandler = () => {
    setEditState(true);
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
            style={{ background: "grey", position: "relative" }}
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
                    console.log("inputValueRef",inputValueRef);  
                  }}
                >
                  Save
                </Button>
              </div>
            ) : (
              <div>
                <p>{props.info.data}</p>
                <p>{props.info.date}</p>
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
