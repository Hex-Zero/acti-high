import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { addItems } from "../hooks/useLocalMemory";
import style from "../styles/AddItem.module.scss";
import { IActivityItem } from "./DraggableContainer";

export interface IAddItemProps {
  isOpen: boolean;
  onClose: () => void;
  onReload: () => void;
}

export function AddItem(props: IAddItemProps) {
  const { isOpen, onClose, onReload } = props;
  const [value, setValue] = React.useState("");
  const [priority, setPriority] = React.useState(1);

  const handleAdd = () => {
    addItems("ActivityList", [
      {
        id: uuidv4(),
        content: value,
        priority: priority,
        priorityTotal: priority,
      } as IActivityItem,
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
          <input
            onChange={(e) => setPriority(Number(e.target.value))}
            value={priority}
            className={[style.priorityInput].join(" ")}
            type="number"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAdd();
              }
            }}
          />
        </label>
        <div onClick={handleAdd} className={[style.addButton].join(" ")}></div>
      </div>
    </div>
  );
}
