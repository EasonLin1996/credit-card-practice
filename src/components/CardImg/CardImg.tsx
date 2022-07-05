import React from "react";
import styles from "./CardImg.module.scss";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { CardState } from "../../pages";

interface CardImgProps extends CardState {
  cardSide: string;
  focusSection: string;
  handleSetFocusSection: (section: string) => void;
  handleSetCardSide: (side: string) => void;
}

type CardItemRefs = {
  [index: string]: React.MutableRefObject<HTMLDivElement>;
};

export const CardImg: React.FC<CardImgProps> = ({
  focusSection,
  cardSide,
  handleSetFocusSection,
  handleSetCardSide,
  ...props
}) => {
  const [focusBoxStyle, setFocusBoxStyle] = React.useState({
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  });

  const ccNumberRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const ccNameRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const ccExpRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const ccCvcRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  const cardItemRefs: CardItemRefs = React.useMemo(
    () => ({
      ccNumberRef,
      ccNameRef,
      ccExpRef,
      ccCvcRef,
    }),
    [ccNumberRef, ccNameRef, ccExpRef, ccCvcRef]
  );

  React.useEffect(() => {
    if (focusSection === "") return;

    const formatSection = (section) => {
      if (/ccExpMonth|ccExpYear/.test(section)) {
        return "ccExp";
      }
      return section;
    };

    setTimeout(() => {
      const target = cardItemRefs[`${formatSection(focusSection)}Ref`].current;
      setFocusBoxStyle({
        width: `${target.offsetWidth}px`,
        height: `${target.offsetHeight}px`,
        top: target.offsetTop,
        left: target.offsetLeft,
      });
    }, 100);
  }, [focusSection, cardItemRefs]);

  return (
    <div
      className={`${styles["card_box"]} ${
        cardSide === "front" ? styles["show-front"] : styles["show-back"]
      }`}
    >
      <div className={styles["card-front"]}>
        <div
          className={`${styles["card-focus-box"]} ${
            !!focusSection &&
            cardSide === "front" &&
            styles["card-focus-box-active"]
          }`}
          style={focusBoxStyle}
        />
        <div className={styles["card_background"]}>
          <img src="https://i.imgur.com/5XHCjPT.jpg" alt="" />
        </div>
        <div className={styles["card_wrapper"]}>
          <div className={styles["card-front-top"]}>
            <img
              className={styles["card-front-top-icon"]}
              src="https://i.imgur.com/7xhP2ZA.png"
              alt=""
            />
            <img
              className={styles["card-front-top-visa"]}
              src="https://i.imgur.com/lokBLnp.png"
              alt=""
            />
          </div>
          <div
            ref={ccNumberRef}
            className={styles["card-number"]}
            onClick={(e) => {
              handleSetFocusSection("ccNumber");
              console.log("cc");
            }}
          >
            {Array.from({ length: 4 }, (v, i) => (
              <div key={i}>
                {Array.from({ length: 4 }, (v, subI) => (
                  <SwitchTransition key={i + subI}>
                    <CSSTransition
                      key={props.cardNumber[`${i * 4 + subI}`] || "#"}
                      classNames="slide-up"
                      addEndListener={(node, done) =>
                        node.addEventListener("transitionend", done, false)
                      }
                    >
                      <span>{props.cardNumber[`${i * 4 + subI}`] || "#"}</span>
                    </CSSTransition>
                  </SwitchTransition>
                ))}
              </div>
            ))}
          </div>
          <div className={styles["card-bottom"]}>
            <div
              ref={ccNameRef}
              className={styles["card-bottom-content"]}
              onClick={(e) => {
                handleSetFocusSection("ccName");
              }}
            >
              <h4>Card Holder</h4>
              <p>
                {props.cardHolder.length > 0 ? props.cardHolder : "FULL NAME"}
              </p>
            </div>
            <div
              ref={ccExpRef}
              className={styles["card-bottom-content"]}
              onClick={(e) => {
                handleSetFocusSection("ccExpMonth");
              }}
            >
              <h4>Expires</h4>
              <p>
                {props.cardExpirationMonth.length > 0
                  ? props.cardExpirationMonth.toString().padStart(2, "0")
                  : "MM"}
                /
                {props.cardExpirationYear.length > 0
                  ? props.cardExpirationYear.toString().slice(2, 4)
                  : "YY"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["card-back"]}>
        <div
          className={`${styles["card-focus-box"]} ${
            !!focusSection &&
            cardSide === "back" &&
            styles["card-focus-box-active"]
          }`}
          style={focusBoxStyle}
        />
        <div className={styles["card_background"]}>
          <img src="https://i.imgur.com/5XHCjPT.jpg" alt="" />
        </div>
        <div className={styles["card-back-top"]}></div>
        <div className={styles["card-back-cvc"]}>
          <span
            ref={ccCvcRef}
            onClick={(e) => {
              handleSetFocusSection("ccCvc");
            }}
          >
            {props.cardCVC.length > 0 ? props.cardCVC : "CVC"}
          </span>
        </div>
        <div className={styles["card-back-middle"]}></div>
        <div className={styles["card-back-img"]}>
          <img src="https://i.imgur.com/lokBLnp.png" alt="" />
        </div>
      </div>
    </div>
  );
};
