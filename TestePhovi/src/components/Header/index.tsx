import React from "react";

import "./styles.css";
import phoviLogo from "../../assets/images/phoviLogo.svg";
import { useAuth } from "../../hooks/auth";

interface HeaderProps {
  openModal: boolean;
  setOpenModal: Function;
}

const Header: React.FC<HeaderProps> = ({ openModal, setOpenModal }) => {
  const { signOut } = useAuth();

  return (
    <header className="App-header">
      <div className="logo-container">
        <img src={phoviLogo} alt="phovi logo" />
        <h3>Trivia Maker</h3>
      </div>
      <button
        type="button"
        className="button"
        onClick={() => setOpenModal(!openModal)}
      >
        Load Trivias
      </button>
      <button type="button" className="button" onClick={signOut}>
        Sign Out
      </button>
    </header>
  );
};

export default Header;
