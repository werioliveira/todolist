"use client";
import React from "react";
import Botoes from "./Botoes";
import { useState } from "react";

import { format, register } from "timeago.js";

const Todo = ({ todo, update, deleteItemTodo }) => {
  const localeFunc = (number, index, totalSec) => {
    return [
      ["agora mesmo", "agora"],
      ["há %s segundos", "em %s segundos"],
      ["há um minuto", "em um minuto"],
      ["há %s minutos", "em %s minutos"],
      ["há uma hora", "em uma hora"],
      ["há %s horas", "em %s horas"],
      ["há um dia", "em um dia"],
      ["há %s dias", "em %s dias"],
      ["há uma semana", "em uma semana"],
      ["há %s semanas", "em %s semanas"],
      ["há um mês", "em um mês"],
      ["há %s meses", "em %s meses"],
      ["há um ano", "em um ano"],
      ["há %s anos", "em %s anos"],
    ][index];
  };
  const handleDelete = (id) => {
    deleteItemTodo(id);
  };
  register("pt-br", localeFunc);
  const [status, setStatus] = useState("Criado");

  const handleStatus = (inputStatus) => {
    if (inputStatus === "start" && status != "Iniciado") {
      setStatus("Iniciado");
      update(todo._id, "Iniciado", todo.text, todo.value);
    }
    if (inputStatus === "finish" && status != "Concluido") {
      setStatus("Concluido");
      update(todo._id, "Concluido", todo.text, todo.value);
    }
    if (inputStatus === "restart" && status === "Concluido") {
      setStatus("Criado");
      update(todo._id, "Criado", todo.text, todo.value);
    }
  };
  return (
    <div
      className={
        todo.status === "Concluido"
          ? "bg-green-600 flex py-1 px-8 w-full justify-between rounded-lg items-center"
          : "" || todo.status === "Iniciado"
          ? "bg-sky-600 flex  py-1 px-8 w-full justify-between rounded-lg items-center"
          : "bg-slate-600 flex  py-1 px-8 w-full justify-between rounded-lg items-center"
      }
    >
      <div>
        <p>#{todo._id.substring(0, 5)}</p>
      </div>
      <div>
        <p>{todo.text}</p>
      </div>
      <div className=" flex flex-col">
        <p>{format(todo.value, "pt-br")}</p>
      </div>
      <div>
        <span>
          <Botoes
            status={handleStatus}
            value={todo.status}
            deleteItemTodo={deleteItemTodo}
            todoId={todo._id}
          />
        </span>
      </div>
    </div>
  );
};

export default Todo;
