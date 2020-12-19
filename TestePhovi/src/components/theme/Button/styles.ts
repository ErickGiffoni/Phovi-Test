import styled, { css } from "styled-components";

export const DefaultButton = styled.div`
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;

  margin: 10px 0px;
  border-radius: 5px;
  background-color: #b905e6;
  color: #fff;

  font-family: sans-serif;
  font-weight: 600;
  font-size: 18px;
  width: 100%;
  transition: background-color 0.2s;
  &:hover &:focus {
    background-color: #a404cc;
  }
`;

export const IconButton = styled.button`
  height: 45px;
  border: none;
  border-radius: 5px;
  background-color: #b905e6;
  color: #fff;
  font-weight: 600;
  font-size: 18px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover &:focus {
    background-color: #a404cc;
  }

  min-width: 150px;
  padding: 5px 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.primary &&
    css`
      background: white;
      color: black;
    `}

  svg > & {
    font-size: 24px;
    margin-left: 10px;
  }
`;
