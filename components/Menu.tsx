import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { addItems } from "../hooks/useLocalMemory";
import style from "../styles/Menu.module.scss";

export interface IMenuProps {
  onReload: () => void;
  onRemove: () => void;
}

export function Menu(props: IMenuProps) {
  const { onReload, onRemove } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  const handleRemoveClick = () => {
    onRemove();
  };

  const handleAddClick = () => {
    setIsOpen(false);
    addItems("ActivityList", [
      {
        id: uuidv4(),
        content: uuidv4(),
      },
    ]);
    onReload();
  };
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
      <div
        className={[style.menuContainer, isOpen ? style.active : ""].join(" ")}
      >
        <span
          onClick={(e) => setIsOpen(!isOpen)}
          className={style.closeButton}
        />

        <div onClick={handleAddClick} className={style.addButtonContainer}>
          Add new item
        </div>

        <div
          onClick={handleRemoveClick}
          className={style.removeButtonContainer}
        >
          Remove item
        </div>
      </div>
    </div>
  );
}
