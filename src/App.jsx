import Todo from "./components/Todo";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState([]);
  const handleSave = () => {
    addItemTodo({ text, value });
  };

  useEffect(() => {
    setTodoState();
  }, []);
  const setTodoState = () => {
    setTodo(
      localStorage.getItem("TODO")
        ? JSON.parse(localStorage.getItem("TODO"))
        : []
    );
  };
  const addItemTodo = async ({ text, value }) => {
    const item = {
      _id: uuidv4(),
      text,
      value,
      status: "Criado",
    };
    //add quantity conditional if item exist
    let newTodo;
    newTodo = [...(todo?.todoItems || []), item];
    localStorage.setItem("TODO", JSON.stringify({ todoItems: newTodo }));
    setTodoState();
  };
  const updateItemTodo = async (id, status, text, value) => {
    const item = {
      _id: id,
      text,
      value,
      status: status,
    };
    let newTodo;
    const isItemExist = todo?.todoItems?.find((i) => i._id === item._id);
    if (isItemExist) {
      newTodo = todo?.todoItems?.map((i) =>
        i._id === isItemExist._id ? item : i
      );
    }
    localStorage.setItem("TODO", JSON.stringify({ todoItems: newTodo }));
    setTodoState();
  };
  const deleteItemTodo = (id) => {
    const newTodo = todo?.todoItems?.filter((i) => i._id !== id);
    localStorage.setItem("TODO", JSON.stringify({ todoItems: newTodo }));
    setTodoState();
  };
  const [value, onChange] = useState(new Date());
  const [text, setText] = useState("");
  return (
    <div className="bg-slate-500 flex w-screen h-screen justify-center flex-col items-center ">
      <div className="flex justify-center items-center w-2/4">
        <div className="flex flex-col justify-center mx-12 w-full">
          <label className="text-white" htmlFor="todo">
            Tarefa
          </label>
          <input
            type="text"
            id="todo"
            className="h-10"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <label className="text-white" htmlFor="tododate">
            Data da Tarefa
          </label>
          <DatePicker
            id="tododate"
            onChange={onChange}
            value={value}
            className="h-10"
          />
          <div className="bg-green-500 w-24 p-1 m-1 rounded-lg text-white text-base flex flex-row items-center justify-center">
            <button
              className="mr-1"
              onClick={() => addItemTodo({ text, value })}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full h-96 my-2">
        <div className="flex w-3/4 text-white flex-col overflow-y-scroll my-2 gap-2">
          {todo.todoItems?.map((todo, index) => (
            <div>
              <Todo
                todo={todo}
                key={index}
                update={updateItemTodo}
                deleteItemTodo={deleteItemTodo}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
