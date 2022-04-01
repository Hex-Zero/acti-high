import * as React from "react";
import style from "../styles/Menu.module.scss";

export interface IMenuProps {}

export function Menu(props: IMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className={style.menuWrapper}>
      <div
        onClick={(e) => setIsOpen(!isOpen)}
        className={style.menuOverlay}
      ></div>
      <div className={`${style.menuContainer} ${isOpen ? style.active : ""}`}>
        <span
          onClick={(e) => setIsOpen(!isOpen)}
          className={style.closeButton}
        />
      </div>
    </div>
  );
}
