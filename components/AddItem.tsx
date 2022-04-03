import * as React from "react";
import style from "../styles/AddItem.module.scss";

export interface IAddItemProps {
  isOpen?: boolean;
  onAdd: () => void;
}

export function AddItem(props: IAddItemProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleAdd = () => {
    console.log("Add item");
  };
  const handleClose = () => {
    console.log("Close");
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
