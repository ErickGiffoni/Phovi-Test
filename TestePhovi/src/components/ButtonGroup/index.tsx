import React from "react";

import { MdSend, MdDeleteForever } from "react-icons/md";
import { SiFirebase } from "react-icons/si";

import { Container, Button } from "./styles";

interface ButtonGroupProps {
  handleGenerateTrivia: Function;
  handleResetTrivias: Function;
  handleSendToFirebase: Function;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  handleGenerateTrivia,
  handleResetTrivias,
  handleSendToFirebase,
}) => {
  return (
    <Container>
      <Button
        type="button"
        className="button-icon button-default"
        onClick={() => handleGenerateTrivia()}
      >
        Generate
        <MdSend />
      </Button>
      <Button
        type="button"
        className="button-icon button-default"
        onClick={() => handleResetTrivias()}
      >
        Reset All
        <MdDeleteForever />
      </Button>
      <Button
        type="button"
        className="button-icon button-default"
        onClick={() => handleSendToFirebase()}
      >
        Send to firebase
        <SiFirebase />
      </Button>
    </Container>
  );
};

export default ButtonGroup;
