import { useState } from "react";

import Input from "../ToDoInput/todo-input.component";
import ToDoList from "../ToDoList/toDoList.component";
import ToDoFilter from "../ToDoFilter/ToDoFilter.component";

import { useLocalStorage } from "../../hooks/useLocalStorage";

import mainImg from "../../images/bg-desktop-light.jpg";
import moonIcon from "../../images/icon-moon.svg";
import sunIcon from "../../images/icon-sun.svg";

import "./todo.styles.css";

export type ToDoType = {
  text: string;
  id: string;
  completed: boolean;
};

const ToDo = () => {
  const [toDoArr, setToDoArr] = useLocalStorage<ToDoType[]>("toDoArr", []);
  const [toDoArrDisplayed, setToDoArrDisplayed] = useLocalStorage<ToDoType[]>(
    "toDoArrDisplayed",
    []
  );
  const [isDarkTheme, setisDarkTheme] = useLocalStorage("isDarkTheme", false);
  const [currentFilter, setCurrentFilter] = useState("all");

  const completed = toDoArr.filter((item) => item.completed);
  const uncompleted = toDoArr.filter((item) => !item.completed);
  const uncompletedAmount = uncompleted.length;

  const handleClearCompleted = () => {
    setToDoArr(uncompleted);
    setToDoArrDisplayed(uncompleted);
    setCurrentFilter("all");
  };

  const handleFilter = (option: string) => {
    if (option === "all") {
      setToDoArrDisplayed(toDoArr);
      setCurrentFilter("all");
    } else if (option === "active") {
      setToDoArrDisplayed(uncompleted);
      setCurrentFilter("active");
    } else if (option === "completed") {
      setToDoArrDisplayed(completed);
      setCurrentFilter("completed");
    }
  };

  const handleThemeChange = () => {
    setisDarkTheme((prev) => !prev);
  };

  const theme = isDarkTheme ? "dark-mode" : "";

  return (
    <>
      <div className={`background ${theme}`}>
        <img alt="" className="bg-image" src={mainImg} />
        <div className="container">
          <div className={`toDoContainer`}>
            <div className="title-and-toggle flex-apart">
              <h1 className="title">TODO</h1>
              <button onClick={handleThemeChange} className="btn theme-btn">
                <img
                  src={isDarkTheme ? sunIcon : moonIcon}
                  alt="toggle theme"
                />
              </button>
            </div>

            <Input
              setToDoArr={setToDoArr}
              setToDoArrDisplayed={setToDoArrDisplayed}
            />

            <div className="list-and-bar">
              <ToDoList
                toDoArr={toDoArr}
                toDoArrDisplayed={toDoArrDisplayed}
                setToDoArr={setToDoArr}
                setToDoArrDisplayed={setToDoArrDisplayed}
              />

              <div className="left-and-clear flex-apart">
                <p className="left txt-fix">{uncompletedAmount} items left</p>

                <ToDoFilter
                  handleFilter={handleFilter}
                  currentFilter={currentFilter}
                />

                <button
                  className="clear-btn btn txt-fix"
                  onClick={handleClearCompleted}
                >
                  Clear Completed
                </button>
              </div>
            </div>
          </div>

          <p className="drag-and-drop">Drag and drop to reorder list</p>
        </div>
      </div>
    </>
  );
};

export default ToDo;

//DONE -items left (not completed todos)
//DONE all, active, complited filter
//DONE delete all completed
//DONE drag and drop
//DONE light and dark mode
//DONE small mobile fixes
//DONE box shadow fix
//DONE filter part of container upper it on desktop
//DONE add ts
//DONE favicon
//DONE persist data
//DONE hover state for checkbox

//TODO
// Prevent from adding to much or give a scroll
// hold shift
// fix code architecture ?
