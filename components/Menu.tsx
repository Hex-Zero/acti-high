import * as React from "react";
import style from "../styles/Menu.module.scss";

export interface IMenuProps {
  onReload: () => void;
}

export function Menu(props: IMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className={style.menuWrapper}>
      <div
        onClick={(e) => setIsOpen(!isOpen)}
        className={`${style.menuButton} ${isOpen ? style.active : ""}`}
      >
        <div className={style.menuButtonLine}></div>
      </div>
      <div
        onClick={(e) => setIsOpen(!isOpen)}
        className={`${style.menuOverlay} ${isOpen ? style.active : ""}`}
      ></div>
      <div className={`${style.menuContainer} ${isOpen ? style.active : ""}`}>
        <span
          onClick={(e) => setIsOpen(!isOpen)}
          className={style.closeButton}
        />

        <div
          onClick={(e) => props.onReload()}
          className={style.addButtonContainer}
        >
          Add new item
        </div>
      </div>
    </div>
  );
}
