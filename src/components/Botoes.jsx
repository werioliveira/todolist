import React from "react";
import { HiMiniCheck, HiMiniPlay } from "react-icons/hi2";
import { CgSearchLoading } from "react-icons/cg";
import { VscDebugRestart } from "react-icons/vsc";
import { MdDelete } from "react-icons/md";

const Botoes = ({ status, value, deleteItemTodo, todoId }) => {
  return (
    <div className="flex md:flex-row flex-col items-center">
      <div
        className={
          "bg-sky-400 w-24 p-1 m-1 rounded-lg text-white text-base flex flex-row items-center justify-center"
        }
      >
        <HiMiniPlay width={32} height={32} className="mx-1" />
        <button
          className={
            value === "Iniciado"
              ? "disabled opacity-50 cursor-default"
              : "" && "mr-1"
          }
          onClick={() => status("start")}
        >
          Iniciar
        </button>
      </div>
      {value === "Concluido" ? (
        <div className="bg-yellow-600 w-24 p-1 m-1 rounded-lg text-white text-base flex flex-row items-center justify-center">
          <VscDebugRestart width={32} height={32} className="mx-1" />
          <button className="mr-1" onClick={() => status("restart")}>
            Reiniciar
          </button>
        </div>
      ) : (
        <div className="bg-green-500 w-24 p-1 m-1 rounded-lg text-white text-base flex flex-row items-center justify-center">
          <HiMiniCheck width={32} height={32} className="mx-1" />
          <button className="mr-1" onClick={() => status("finish")}>
            Concluir
          </button>
        </div>
      )}

      <div className="bg-violet-500 w-24 p-1 m-1 rounded-lg text-white text-base flex flex-row items-center justify-center">
        <CgSearchLoading width={32} height={32} className="mr-1" />
        <span className="mr-1">{value}</span>
      </div>
      <div
        className="bg-red-500 w-10 p-1 m-1 rounded-lg text-white text-base flex flex-row items-center justify-center cursor-pointer"
        onClick={() => deleteItemTodo(todoId)}
      >
        <MdDelete width={32} height={32} className="mr-1" />
      </div>
    </div>
  );
};

export default Botoes;
