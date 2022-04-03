import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { addItems } from "../hooks/useLocalMemory";
import style from "../styles/AddItem.module.scss";

export interface IAddItemProps {
  isOpen: boolean;
  onClose: () => void;
  onReload: () => void;
}

export function AddItem(props: IAddItemProps) {
  const { isOpen, onClose, onReload } = props;
  const [value, setValue] = React.useState("");

  const handleAdd = () => {
    addItems("ActivityList", [
      {
        id: uuidv4(),
        content: value,
      },
    ]);
    onReload();
    onClose();
  };
  const handleClose = () => {
    onClose();
  };
  return (
    <div className={[style.addItemContainer].join(" ")}>
      <div
        onClick={handleClose}
        className={[style.overlay, isOpen ? style.isOpen : ""].join(" ")}
      ></div>
      <div
        className={[style.addItemModal, isOpen ? style.isOpen : ""].join(" ")}
      >
        <div
          onClick={handleClose}
          className={[style.closeButton].join(" ")}
        ></div>
        <label className={[style.nameLabel].join(" ")}>
          Activity name
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAdd();
              }
            }}
            className={[style.nameInput].join(" ")}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
        <div onClick={handleAdd} className={[style.addButton].join(" ")}></div>
      </div>
    </div>
  );
}
