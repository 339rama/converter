import React from "react";

const TextInput = ({name, value, changeHandler}) => {
    let area = (value.split(' ').length > 4) ? true : false;
    if(area){
      return (
        <div className='field'>
          <label>{name} : </label>
          <textarea 
            name={name}
            onChange={(event) => changeHandler(event)}
            defaultValue={value}
            ></textarea>
        </div>
      );
    }
    return (
      <div className="field">
        <label>{name} : </label>
        <input
          onChange={(event) => changeHandler(event)}
          type="text"
          name={name}
          defaultValue={value}
        />
      </div>
    );
}

export default TextInput;