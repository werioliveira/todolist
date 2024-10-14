"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PlayCircle, RotateCcw, CheckCircle, Trash2, Calendar } from "lucide-react"
import DatePicker from "react-date-picker";
import { v4 as uuidv4 } from "uuid";
import TimeAgo from "./components/TimeAgo";



export default function Component() {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    setTodoState();
  }, []);
  const [value, onChange] = useState(new Date());
  const [text, setText] = useState("");
  const setTodoState = () => {
    const storedTodo = localStorage.getItem("TODO")
    setTodo(storedTodo ? JSON.parse(storedTodo) : { todoItems: [] })
  }
  const addItemTodo = () => {
    if (text.trim()) {
      const item = {
        _id: uuidv4(),
        text,
        value,
        status: "pending",
      }
      const newTodo = { todoItems: [...(todo.todoItems || []), item] }
      localStorage.setItem("TODO", JSON.stringify(newTodo))
      setTodoState()
      setText("")
      onChange(new Date())
    }
  }
  const updateItemTodo = async (id, status, text, value) => {
        const nextStatus = {
          "pending": "in-progress",
          "in-progress": "completed",
          "completed": "pending"
        }
    const item = {
      _id: id,
      text,
      value,
      status: nextStatus[status],
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


  const getBackgroundColor = (status) => {
    switch (status) {
      case "pending": return "bg-gray-700"
      case "in-progress": return "bg-blue-700"
      case "completed": return "bg-green-700"
      default: return "bg-gray-700"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending": return <PlayCircle className="w-5 h-5" />
      case "in-progress": return <RotateCcw className="w-5 h-5 animate-spin" />
      case "completed": return <CheckCircle className="w-5 h-5" />
      default: return <PlayCircle className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Lista de Tarefas Futurista
        </h1>
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Nova tarefa..."
            className="flex-grow p-3 rounded-lg bg-gray-800 border-2 border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-2 border-2 border-gray-700 focus-within:border-blue-500 transition-colors">
            <label className="text-white whitespace-nowrap" htmlFor="tododate">
              <Calendar className="w-5 h-5" />
            </label>
            <DatePicker
              id="tododate"
              onChange={onChange}
              value={value}
              format="dd/MM/yyyy"
              clearIcon={null}
              calendarIcon={null}
              className="bg-transparent"
            />
          </div>
          <button
            onClick={() => addItemTodo({ text, value })}
            className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg transition-colors whitespace-nowrap"
          >
            Adicionar
          </button>
        </div>        

        <AnimatePresence>
          {todo.todoItems?.map(task => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`mb-4 p-4 rounded-lg shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between ${getBackgroundColor(task.status)} transition-colors duration-300`}
            >
              <div className="flex-grow mb-2 sm:mb-0">
                <span className="font-semibold">{task.text}</span>
                <div className="text-sm text-gray-300 flex items-center mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  <TimeAgo value={task.value}/>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm bg-black/30 px-2 py-1 rounded">{task.status}</span>
                <button
                  onClick={() => updateItemTodo(task._id, task.status, task.text, task.value)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  {getStatusIcon(task.status)}
                </button>
                <button
                  onClick={() => deleteItemTodo(task._id)}
                  className="p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

      </div>
    </div>
  )
}