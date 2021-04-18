import { Button, Col, Input, Row } from "antd";
import { CloseSquareFilled } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import NoteModal from "../Note/NoteModal";
import SingleTodo from "../TodoList/SingleTodo";
import { DragDropContext } from "react-beautiful-dnd";

const Todo = (props) => {
  const initialList = () => JSON.parse(window.localStorage.getItem("NoteList"));
  const [modalState, setModalState] = useState({ visible: false });
  const [noteState, setNoteState] = useState({ id: "", data: "", date: "" });
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
      id: new Date(),
      data: event.target.value,
      date: new Date().toDateString(),
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

  const saveAfterEditHandler = (inputValue, index) => {
    const note = { ...noteList[index] };
    console.log("note", note);
    // note.data = inputValue;
    // console.log("note.data", note.data);
    // const newList = [...noteList];
    // console.log("newList1", newList);
    // newList[index] = note;
    // console.log("newList", newList);
    // setNoteList(newList);
    console.log("inputValue", inputValue);

    // const note = {...noteState};
    // note.data = event.target.value;
    // console.log(note);
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
                key={noteState.id + Math.random(index * 1000).toString()}
                info={note}
                deleted={() => deleteNoteHandler(index)}
                saved={(inputValue) => saveAfterEditHandler(inputValue, index)}
              />
            );
          })}
        </div>
      ) : (
        noteList.map((note, index) => {
          return (
            <SingleTodo
              key={noteState.id + Math.random(index * 1000).toString()}
              info={note}
              deleted={() => deleteNoteHandler(index)}
              saved={(inputValue) => saveAfterEditHandler(inputValue, index)}
            />
          );
        })
      )}
    </div>
  );
};
export default Todo;
