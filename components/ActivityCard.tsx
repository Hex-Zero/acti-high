import * as React from "react";
import { useState } from "react";
import {
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import style from "./ActivityCard.module.scss";
import { IListItem } from "./DraggableContainer";
export interface IActivityCardProps {
  item: IListItem;
  index: number;
}

const grid = 8;

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
): any => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "#ffc3a0",

  // styles we need to apply on draggables
  ...draggableStyle,
});

export function ActivityCard(props: IActivityCardProps) {
  const { item, index } = props;
  const [shouldRemove, setShouldRemove] = useState(false);
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
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
          ].join(" ")}
        >
          {item.content}
        </div>
      )}
    </Draggable>
  );
}
