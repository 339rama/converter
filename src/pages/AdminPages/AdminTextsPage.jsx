import React, { useState, useRef } from "react";
import TextInput from "../../components/AdminComponents/TextInput";
import Message from "../../components/AdminComponents/Message";
import { useHttp } from '../../hooks/http.hook';

const AdminTextsPage = ({ data }) => {
  const {loading, request, error } = useHttp();
  const [formState, setformState] = useState({});

  const changeHandler = (event) => {
    setformState({ ...formState, [event.target.name]: event.target.value });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    const data = await request(document.location.pathname, 'POST', formState);
    Message(container.current, 'afterBegin', data.message);
    setformState({});
  };

  const container = useRef();

  return (
    <div ref={container}>
      <h1>Перевод текстов на {data.language.name}</h1>
      {Object.keys(data.texts).map((key) => {
        if (typeof data.texts[key] === "object") {
          return Object.keys(data.texts[key]).map((nestedKey) => {
            return (
              <TextInput
                key={`${key}.${nestedKey}`}
                name={`${key}.${nestedKey}`}
                value={data.texts[key][nestedKey]}
                changeHandler={changeHandler}
              />
            );
          });
        }
        return (
          <TextInput key={key} name={key} value={data.texts[key]} changeHandler={changeHandler}/>
        );
      })}
      <button type="submit" onClick={(event) => submitHandler(event)}>Сохранить</button>
    </div>
  );
};

export default AdminTextsPage;
