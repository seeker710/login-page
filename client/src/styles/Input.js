import styled from "styled-components";

export const Input = styled.input`
    border:none;
    display: inline-block;
    font-size: 1em;
    margin: 2px 0 12px 0;
    width: 80%;
    &:focus {
        outline: none;
    }
    @media screen and (max-width: 380px) {
        font-size: .9em;
    }
`;

export const RelBox = styled.div`
    border-radius: 4em;
    cursor: pointer;
    display: block;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    text-align: center;
    width: calc(100% - 2em);
    z-index: 1;
`;
export const AbsBox = styled.div`
    background: linear-gradient(to right, #fc00ff, #00dbde, #fc00ff, #00dbde);
    height: 100%;
    width: 305%;
    position: absolute;
    left: -100%;
    transition: all 0.5s;
    z-index: -1;
`;
export const Button = styled.button`
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1.4em;
    outline: none;
    padding: 8px 0;
    left: 0;
    width: 100%;
    @media screen and (max-width: 380px) {
        font-size: 1.2em;
    }
`;