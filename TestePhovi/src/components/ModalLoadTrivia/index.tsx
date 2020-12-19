import React from "react";

import "./styles.css";

interface ModalProps {
  openModal: boolean;
  data: Array<{
    title: string;
  }>;
  setOpenModal: Function;
  loadTriviaData: Function;
}

const ModalLoadTrivia: React.FC<ModalProps> = ({
  openModal,
  setOpenModal,
  data,
  loadTriviaData,
}) => {
  const showHideClassName = openModal
    ? "modal display-block"
    : "modal display-none";
  return (
    <div className={showHideClassName} onClick={() => setOpenModal(false)}>
      <section className="modal-main">
        <div className="modalContainer">
          <h2>Select one trivia</h2>
          <div>
            {data.map((item) => (
              <button
                key={item.title}
                onClick={() => {
                  loadTriviaData(item.title);
                  setOpenModal(false);
                }}
                className="button button-default"
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModalLoadTrivia;
