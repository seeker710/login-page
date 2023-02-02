import React from "react";
import { RelBox, AbsBox, Button } from "../styles/Input";

const ButtonBox = ({text, callback}) => {
    return (
        <RelBox className="wrap">
            <AbsBox className="bg-btn"></AbsBox>
            <Button onClick={callback}>{text}</Button>
        </RelBox>
    );
}

export default ButtonBox;