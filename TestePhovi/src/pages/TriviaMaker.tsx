import React, { useEffect, useRef, useState } from "react";
import "../assets/styles/TriviaMaker.css";
import "../assets/styles/global.css";

import { firestore } from "../firebase";
import triviaTypeOptions from "../utils/triviaTypeOptions";

import Header from "../components/Header/index";
import ModalLoadTrivia from "../components/ModalLoadTrivia/index";
import Form from "../components/Form/index";
import GenerateTrivia from "../components/GenerateTrivia/index";
import ButtonGroup from "../components/ButtonGroup/index";

interface TriviaQuestions {
  question: string;
  answers: string;
  correct_answer: string;
  image_url: string;
}

interface TriviaDeck {
  title: string;
  photoUrl: string;
  type: string;
  deck: Array<TriviaQuestions>;
}

interface TriviaProportion {
  trueAnswers: number;
  falseAnswers: number;
}

function TriviaMaker() {
  const [triviaType, setTriviaType] = useState<string>("multipleChoice");
  const [triviaTitle, setTriviaTitle] = useState<string>("");
  const [triviaPhotoUrl, setTriviaPhotoUrl] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [generatedTrivia, setGeneratedTrivia] = useState<string>("");
  const [triviaProportion, setTriviaProportion] = useState<TriviaProportion>({
    trueAnswers: 0,
    falseAnswers: 0,
  });
  const [triviaQuestions, setTriviaQuestions] = useState<
    Array<TriviaQuestions>
  >([]);
  const [data, setData] = useState<Array<TriviaDeck>>([]);

  const textAreaRef = useRef<any>(null);

  useEffect(() => {
    if (triviaType === "singleChoice" && triviaQuestions.length) {
      let trueAnswers = 0;
      let falseAnswers = 0;

      triviaQuestions.map((trivia) => {
        if (trivia.correct_answer === "true") {
          trueAnswers += 1;
        } else if (trivia.correct_answer === "false") {
          falseAnswers += 1;
        }
      });

      const total = trueAnswers + falseAnswers;

      setTriviaProportion({
        trueAnswers: Math.round((trueAnswers / total) * 100),
        falseAnswers: Math.round((falseAnswers / total) * 100),
      });
    } else {
      setTriviaProportion({
        trueAnswers: 0,
        falseAnswers: 0,
      });
    }

    firestore
      .collection("games")
      .doc("trivias")
      .collection("singleChoice")
      .get()
      .then((snapshot) => {
        const response = [] as any;
        snapshot.forEach((doc) => {
          const docData = doc.data();
          response.push(docData);
        });
        setData(response);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, [triviaType, generatedTrivia, triviaQuestions]);

  function copyToClipboard(event: React.ChangeEvent<HTMLInputElement>) {
    if (textAreaRef) {
      textAreaRef.current.select();
      document.execCommand("copy");
      event.target.focus();
    }
  }

  const handleDelete = (questionIndex: number) => {
    setTriviaQuestions(
      triviaQuestions.filter((trivia, index) => index !== questionIndex)
    );
  };

  const handleAddQuestion = () => {
    setTriviaQuestions([
      ...triviaQuestions,
      { question: "", answers: "", correct_answer: "", image_url: "" },
    ]);
  };

  const handleChangeTriviaData = (
    parameter: string,
    data: string,
    index: number
  ) => {
    const updatedTrivia = triviaQuestions.map((question, questionIndex) =>
      questionIndex === index ? { ...question, [parameter]: data } : question
    );
    setTriviaQuestions(updatedTrivia);
  };

  const handleGenerateTrivia = () => {
    const parsedData = triviaQuestions.map((question) => {
      if (question.answers && question.answers.length !== 0) {
        const answersArray = question.answers.split("\n");
        return { ...question, answers: answersArray };
      }
      return question;
    });
    const dataString = JSON.stringify({
      title: triviaTitle,
      photoUrl: triviaPhotoUrl,
      deck: parsedData,
    });
    setGeneratedTrivia(dataString);
  };

  const handleResetTrivias = () => {
    const confirmReset = window.confirm("Are you sure ?");
    if (confirmReset) {
      const easterEggConfirmation = window.confirm(
        "I mean,really really sure?"
      );
      if (easterEggConfirmation) {
        setTriviaQuestions([]);
        setGeneratedTrivia("");
        setTriviaPhotoUrl("");
        setTriviaTitle("");
        setTriviaProportion({
          trueAnswers: 0,
          falseAnswers: 0,
        });
      }
    }
  };

  const loadTriviaData = async (selectedTrivia: string) => {
    await firestore
      .collection("games")
      .doc("trivias")
      .collection("singleChoice")
      .doc(selectedTrivia)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const docData = doc.data();
          setTriviaQuestions(docData?.deck);
          setTriviaTitle(docData?.title);
          setTriviaPhotoUrl(docData?.photoUrl);
          setTriviaType(docData?.type);
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  const handleSendToFirebase = async () => {
    const data = {
      title: triviaTitle,
      photoUrl: triviaPhotoUrl,
      deck: triviaQuestions,
      type: triviaType,
    };

    await firestore
      .collection("games")
      .doc("trivias")
      .collection(triviaType)
      .doc(triviaTitle)
      .set(data)
      .catch((err: any) => {
        console.error(err);
      });

    await firestore
      .collection("trivias")
      .get()
      .then((snapshot) => {
        const response = [] as any;
        snapshot.forEach((doc) => {
          const docData = doc.data();
          response.push(docData);
        });
        setData(response);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  return (
    <div className="App">
      <Header openModal={openModal} setOpenModal={setOpenModal} />
      <ModalLoadTrivia
        openModal={openModal}
        setOpenModal={setOpenModal}
        data={data}
        loadTriviaData={loadTriviaData}
      />
      <Form
        triviaType={triviaType}
        triviaTypeOptions={triviaTypeOptions}
        triviaTitle={triviaTitle}
        triviaPhotoUrl={triviaPhotoUrl}
        triviaQuestions={triviaQuestions}
        triviaProportion={triviaProportion}
        setTriviaTitle={setTriviaTitle}
        setTriviaPhotoUrl={setTriviaPhotoUrl}
        setTriviaType={setTriviaType}
        handleChangeTriviaData={handleChangeTriviaData}
        handleDelete={handleDelete}
        handleAddQuestion={handleAddQuestion}
      />

      {triviaQuestions.length > 0 && (
        <>
          <ButtonGroup
            handleGenerateTrivia={handleGenerateTrivia}
            handleResetTrivias={handleResetTrivias}
            handleSendToFirebase={handleSendToFirebase}
          />
          <GenerateTrivia
            textAreaRef={textAreaRef}
            generatedTrivia={generatedTrivia}
            copyToClipboard={copyToClipboard}
            rows={triviaQuestions.length + 2}
          />
        </>
      )}
    </div>
  );
}

export default TriviaMaker;
