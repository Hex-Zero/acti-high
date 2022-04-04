import * as React from "react";
import { useState } from "react";
import {
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import style from "../styles/ActivityCard.module.scss";
import { IActivityItem, IListItem } from "./DraggableContainer";
export interface IActivityCardProps {
  item: IActivityItem;
  index: number;
  onRemoveSelected: (item: IListItem) => void;
  onRemoveDeselected: (item: IListItem) => void;
  removeActive: boolean;
}

const grid = 8;

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
): any => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",

  // styles we need to apply on draggables
  ...draggableStyle,
});

export function ActivityCard(props: IActivityCardProps) {
  const { item, index, onRemoveSelected, onRemoveDeselected, removeActive } =
    props;
  const [shouldRemove, setShouldRemove] = useState(false);

  const handleItemClick = () => {
    setShouldRemove(!shouldRemove);
    if (shouldRemove) {
      onRemoveDeselected(item);
    } else {
      onRemoveSelected(item);
    }
  };
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          onClick={() => removeActive && handleItemClick()}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
          className={[
            style.activityCard,
            shouldRemove ? style.remove : "",
            snapshot.isDragging ? style.dragging : "",
          ].join(" ")}
        >
          {item.content} <span> {item?.priorityTotal}</span>
          <div className={[style.checkMark].join(" ")}></div>
        </div>
      )}
    </Draggable>
  );
}
