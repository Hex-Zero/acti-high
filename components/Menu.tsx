import * as React from "react";
import style from "../styles/Menu.module.scss";

export interface IMenuProps {}

export function Menu(props: IMenuProps) {
  return (
    <div className={style.menuWrapper}>
      <div className={style.menuOverlay}></div>
      <div className={style.menuContainer}></div>
    </div>
  );
}
