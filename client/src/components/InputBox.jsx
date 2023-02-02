import React from "react";
import { Input } from "../styles/Input";

const InputBox = ({label, name, type, placeholder, icon, callback}) => {
    return (
        <div className="input-area">
            <span className="label">{label}</span>
            <span className="icon">
            {icon}
            </span>
            <Input className="input" type={type} name={name} placeholder={placeholder} autoComplete="off" onChange={callback} />
            <span className="focus-input" style={{gridColumn: '1 / span 2'}}></span>
        </div>
    );
}

export default InputBox;