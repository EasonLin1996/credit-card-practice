import React from "react";
import { CardImg, CardForm } from "../../components";

export interface CardState {
  cardNumber: string;
  cardHolder: string;
  cardExpirationMonth: string;
  cardExpirationYear: string;
  cardCVC: string;
}

export interface ReducerAction {
  type: string;
  payload: any;
}

const reducer = (state: CardState, action: ReducerAction) => {
  switch (action.type) {
    case "updateCardNumber":
      return { ...state, cardNumber: action.payload };
    case "updateCardHolder":
      return { ...state, cardHolder: action.payload };
    case "updateCardMonth":
      return { ...state, cardExpirationMonth: action.payload };
    case "updateCardYear":
      return { ...state, cardExpirationYear: action.payload };
    case "updateCardCVC":
      return { ...state, cardCVC: action.payload };
    default:
      return state;
  }
};

export const CardPage = () => {
  const initCardState: CardState = {
    cardNumber: "",
    cardHolder: "",
    cardExpirationMonth: "",
    cardExpirationYear: "",
    cardCVC: "",
  };

  const [cardState, dispatch] = React.useReducer(reducer, initCardState);
  const [cardSide, setCardSide] = React.useState("front");
  const [focusSection, setFocusSection] = React.useState("ccNumber");
  const [isInputFocused, setIsInputFocused] = React.useState(true);

  const handleSetCardSide = (side: string) => {
    setCardSide(side);
  };

  const handleSetFocusSection = (section: string) => {
    setFocusSection(section);
  };

  const handleSetIsInputFocused = (bool: boolean) => {
    setIsInputFocused(bool);
  };

  const cardImgProps = {
    cardSide,
    focusSection,
    handleSetFocusSection,
    handleSetCardSide,
    ...cardState,
  };

  const cardFromProps = {
    focusSection,
    handleSetFocusSection,
    handleSetCardSide,
    handleSetIsInputFocused,
    isInputFocused,
    dispatch,
    ...cardState,
  };

  return (
    <>
      <CardImg {...cardImgProps} />
      <CardForm {...cardFromProps} />
    </>
  );
};
