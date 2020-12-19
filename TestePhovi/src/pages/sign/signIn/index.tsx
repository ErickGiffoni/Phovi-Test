import React, { useState } from "react";

import Input from "../../../components/Input";
import Button from "../../../components/theme/Button";
import phoviLogo from "../../../assets/images/phoviLogo.svg";
import { useAuth } from "../../../hooks/auth";

import { Container } from "./styles";

const SignIn: React.FC = () => {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (email !== "" && password !== "") {
      signIn({ email, password });
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Container>
      <img src={phoviLogo} alt="phovi logo" />

      <Input
        type="email"
        name="email"
        label="Digite seu e-mail"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        name="password"
        label="Digite sua senha"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" onClick={handleSignIn}>
        Login
      </Button>
    </Container>
  );
};

export default SignIn;
