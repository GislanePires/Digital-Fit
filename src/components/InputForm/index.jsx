import React from 'react';
import './style.scss';

const InputForm = ({ text, type, name, value, onChange }) => {
  return (
    <div className='div-input'>

      <div className="form__group field">
        <input type={type} className="form__field" value={value}
          onChange={onChange} placeholder={text} name={name} id={name} required />
        <label htmlFor={name} className="form__label">{text}</label>
      </div>

      {/* <label className="label">
        <div dangerouslySetInnerHTML={{ __html: text }} />
        <input
          className="input"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required
        />
        <span className="error-message" style={{ display: 'none' }}>
          Esse campo é obrigatório
        </span>
      </label> */}
    </div >
  );
};

export default InputForm;
