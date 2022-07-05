import React from "react";
import styles from "./CardForm.module.scss";
import { CardState, ReducerAction } from "../../pages";

interface CardFormProps extends CardState {
  dispatch: React.Dispatch<ReducerAction>;
  isInputFocused: boolean;
  focusSection: string;
  handleSetFocusSection: (section: string) => void;
  handleSetCardSide: (side: string) => void;
  handleSetIsInputFocused: (bool: boolean) => void;
}

type CardFormItemRefs = {
  [index: string]: React.MutableRefObject<HTMLInputElement | HTMLSelectElement>;
};

export const CardForm: React.FC<CardFormProps> = ({
  focusSection,
  handleSetFocusSection,
  handleSetCardSide,
  handleSetIsInputFocused,
  isInputFocused,
  dispatch,
  ...props
}) => {
  const inputFocusedRef = React.useRef(isInputFocused);
  inputFocusedRef.current = isInputFocused;

  const ccNumberRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const ccNameRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const ccExpMonthRef =
    React.useRef() as React.MutableRefObject<HTMLSelectElement>;
  const ccExpYearRef =
    React.useRef() as React.MutableRefObject<HTMLSelectElement>;
  const ccCvcRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const cardFormItemRefs: CardFormItemRefs = React.useMemo(
    () => ({
      ccNumberRef,
      ccNameRef,
      ccExpMonthRef,
      ccExpYearRef,
      ccCvcRef,
    }),
    [ccNumberRef, ccNameRef, ccExpMonthRef, ccExpYearRef, ccCvcRef]
  );

  const handleOnBlur = () => {
    handleSetIsInputFocused(false);

    setTimeout(() => {
      if (!inputFocusedRef.current) {
        handleSetFocusSection("");
      }
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(props);
    e.preventDefault();
  };

  React.useEffect(() => {
    if (focusSection === "") return;
    cardFormItemRefs[`${focusSection}Ref`].current.focus();
  }, [focusSection, cardFormItemRefs]);

  return (
    <form onSubmit={handleSubmit} action="">
      <div className={styles["cardForm-box"]}>
        <div className={styles["form-group"]}>
          <label htmlFor="ccn">Card Number</label>
          <input
            className={styles["form-input"]}
            ref={ccNumberRef}
            id="ccn"
            type="tel"
            inputMode="numeric"
            pattern="[0-9\s]{13,19}"
            autoComplete="cc-number"
            maxLength={16}
            value={props.cardNumber}
            placeholder="################"
            onFocus={() => {
              handleSetFocusSection("ccNumber");
              handleSetCardSide("front");
              handleSetIsInputFocused(true);
            }}
            onBlur={handleOnBlur}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const regex = /^[0-9\s]*$/;
              if (!regex.test(e.target.value)) return;
              dispatch({ type: "updateCardNumber", payload: e.target.value });
            }}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="holder">Card Hodler</label>
          <input
            ref={ccNameRef}
            className={styles["form-input"]}
            id="holder"
            maxLength={16}
            onFocus={() => {
              handleSetFocusSection("ccName");
              handleSetCardSide("front");
              handleSetIsInputFocused(true);
            }}
            onBlur={handleOnBlur}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch({ type: "updateCardHolder", payload: e.target.value });
            }}
          />
        </div>
        <div className={`${styles["form-group"]} ${styles["flex"]}`}>
          <div className={styles["w-70"]}>
            <label htmlFor="date">Expiration Date</label>
            <div className={`${styles.flex} ${styles["sp-bwt"]}`}>
              <select
                className={`${styles["form-input"]} ${styles["w-48"]} `}
                id="date"
                defaultValue={"Month"}
                ref={ccExpMonthRef}
                onFocus={() => {
                  handleSetFocusSection("ccExpMonth");
                  handleSetCardSide("front");
                  handleSetIsInputFocused(true);
                }}
                onBlur={handleOnBlur}
                onChange={(e) => {
                  dispatch({
                    type: "updateCardMonth",
                    payload: e.target.value,
                  });
                }}
              >
                <option value={"Month"} disabled>
                  Month
                </option>
                {Array.from({ length: 12 }, (v, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                className={`${styles["form-input"]} ${styles["w-48"]}`}
                id="date"
                defaultValue={"Year"}
                ref={ccExpYearRef}
                onFocus={() => {
                  handleSetFocusSection("ccExpYear");
                  handleSetCardSide("front");
                  handleSetIsInputFocused(true);
                }}
                onBlur={handleOnBlur}
                onChange={(e) => {
                  dispatch({ type: "updateCardYear", payload: e.target.value });
                }}
              >
                <option value={"Year"} disabled>
                  Year
                </option>
                {Array.from({ length: 12 }, (v, i) => (
                  <option key={i * 1 + 2021} value={i * 1 + 2021}>
                    {i * 1 + 2021}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={`${styles["w-30"]} ${styles["ml-20"]}`}>
            <label htmlFor="cvc">CVC</label>
            <input
              ref={ccCvcRef}
              className={styles["form-input"]}
              maxLength={3}
              id="cvc"
              value={props.cardCVC}
              onFocus={() => {
                handleSetFocusSection("ccCvc");
                handleSetCardSide("back");
                handleSetIsInputFocused(true);
              }}
              onBlur={handleOnBlur}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const regex = /^[0-9\s]*$/;
                if (!regex.test(e.target.value)) return;
                dispatch({ type: "updateCardCVC", payload: e.target.value });
              }}
            />
          </div>
        </div>
        <div>
          <button className={styles[`submit-btn`]} type="submit">
            Submmit
          </button>
        </div>
      </div>
    </form>
  );
};
