import { Button, Col, Input, Row } from "antd";
import { CloseSquareFilled } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import NoteModal from "../Note/NoteModal";
import SingleTodo from "../TodoList/SingleTodo";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Todo = (props) => {
  const initialList = () => JSON.parse(window.localStorage.getItem("NoteList"));
  const [modalState, setModalState] = useState({ visible: false });
  const [noteState, setNoteState] = useState({
    id: "",
    data: "",
    date: "",
    status: "",
  });
  const [noteList, setNoteList] = useState(initialList || []);
  const [noteTempList, setTempNoteList] = useState([]);
  const [searchState, setsearchState] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("NoteList", JSON.stringify(noteList));
  }, [noteList]);

  const showModal = () => {
    setModalState({ visible: true });
  };

  const cancelModalHandler = () => {
    setModalState({ visible: false });
    setNoteState({ data: "" });
  };

  const inputValueHander = (event) => {
    setNoteState({
      id: new Date().toString(),
      data: event.target.value,
      date: new Date().toDateString(),
      status: "pending",
    });
  };

  const saveButtonHandler = () => {
    setNoteList(noteList.concat(noteState));
    setModalState({ visible: false });
    setNoteState({ data: "" });
  };

  const deleteNoteHandler = (listIndex) => {
    const newList = [...noteList];
    newList.splice(listIndex, 1);
    setNoteList(newList);
  };

  const clearAllNotesHandler = () => {
    window.localStorage.clear();
    setNoteList([]);
  };

  const editHandler = (event) => {
    setNoteState({
      id: noteState.id,
      data: event.target.value,
      date: noteState,
      status: noteState,
    });
  };

  const saveAfterEditHandler = (index) => {
    const newList = [...noteList];
    newList[index].data = noteState.data;
    newList[index].date = new Date().toDateString();
    setNoteList(newList);
    setNoteState({
      data: "",
    });
  };

  const onSearch = (value) => {
    setsearchState(true);
    const lowerCasedValue = value.toLowerCase();

    const newList = [...noteList];
    const filterData = newList.filter((el) =>
      el.data.toLowerCase().includes(lowerCasedValue)
    );
    console.log("newList", newList);
    setTempNoteList(filterData);
    console.log("filterData", filterData);
  };

  const searchCloseHandler = () => {
    setsearchState(false);
  };

  const onDragEndHandler = (result) => {
    const newList = [...noteList];
    const [reorderedItem] = newList.splice(result.source.index, 1);
    newList.splice(result.destination.index, 0, reorderedItem);
    setNoteList(newList);
  };

  const statusChangedHandler = (value, index) => {
    const newList = [...noteList];
    newList[index].status = value;
    setNoteList(newList);
  };

  return (
    <div className="Todo" style={{ padding: 10 }}>
      <Row style={{ margin: 10 }}>
        <Col span={8}>
          <Button type="primary" onClick={showModal}>
            Add new note
          </Button>
          <NoteModal
            visible={modalState.visible}
            canceled={cancelModalHandler}
            saved={saveButtonHandler}
            dataValue={noteState.data}
            changed={inputValueHander}
          />
        </Col>
        <Col span={8}>
          <Input.Search
            placeholder="Search Note Here"
            onSearch={onSearch}
            enterButton
          />
        </Col>
        <Col span={8}>
          <Button type="danger" onClick={clearAllNotesHandler}>
            Clear Notes
          </Button>
        </Col>
      </Row>
      {searchState ? (
        <div>
          <Button onClick={searchCloseHandler}>
            <CloseSquareFilled />
          </Button>
          {noteTempList.map((note, index) => {
            return (
              <SingleTodo
                key={note.id}
                info={note}
                deleted={() => deleteNoteHandler(index)}
                edited={editHandler}
                saved={() => saveAfterEditHandler(index)}
              />
            );
          })}
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEndHandler}>
          <Droppable droppableId="anything">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ listStyle: "none" }}
              >
                {noteList.map((note, index) => {
                  return (
                    <Draggable
                      key={note.id}
                      draggableId={note.id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <SingleTodo
                            info={note}
                            deleted={() => deleteNoteHandler(index)}
                            edited={editHandler}
                            saved={() => saveAfterEditHandler(index)}
                            statusChanged={(value) =>
                              statusChangedHandler(value, index)
                            }
                          />
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};
export default Todo;
