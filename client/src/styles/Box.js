import styled from "styled-components";
import bg01 from '../assets/image/bg-01.jpg';
import bg02 from '../assets/image/bg-02.jpg';

export const BgBox = styled.div`
    background: url(${bg01});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: grid;
    justify-content: center;
    align-content: center;
    height: 100vh;
    width: 100vw;
`;
export const Container = styled.div`
    background: white;
    border-radius: 1em;
    padding: 2em;
    width: 37vw;
    @media screen and (max-width: 850px) {
        width: 55vw;
    }
    @media screen and (max-width: 530px) {
        width: 75vw;
    }
`;

export const HomeBg = styled(BgBox)`
    background: url(${bg02});
    position: relative;
    z-index: 1;
    &:before {
        content: "";
        display: block;
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(255,255,255,0.85);
    }
`;

export const HomeContainer = styled(Container)`
    background: #9152f8;
    background: linear-gradient(to bottom right, #7F00FF, #E100FF);
    color: white;
`;

export const Line = styled.div`
    background: white;
    height: 1.7px;
    width: 100%;
    margin: 10px 0 22px 0;
`;