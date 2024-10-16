import React from 'react';
import { format, register } from "timeago.js";
// import { Container } from './styles';

function TimeAgo({value}) {
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
      register("pt-br", localeFunc);

     
  return (
    <p>{format(value, "pt-br")}</p>
  )
}

export default TimeAgo;