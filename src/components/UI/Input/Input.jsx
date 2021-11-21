import React, { useImperativeHandle, useRef } from "react";

import classNames from "classnames";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(
    ref,
    () => {
      return { focus: activate };
    },
    []
  );

  return (
    <div
      className={classNames(classes.control, classes[props.className], {
        [classes.invalid]: props.valid === false,
      })}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
});

export default Input;
