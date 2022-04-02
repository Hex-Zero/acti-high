import * as React from "react";
import { useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { getListData } from "../hooks/useLocalMemory";
import { ActivityCard } from "./ActivityCard";
export interface IDraggableContainerProps {}

export interface IListItem {
  id: string;
  content: string;
}

// fake data generator
const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list: IListItem[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getListStyle = (isDraggingOver: Boolean) => ({
  background: "antiquewhite",
  padding: 8,
  width: 250,
});

export function DraggableContainer() {
  const [items, setItems] = React.useState<IListItem[]>([]);

  const handleDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const resultingItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(resultingItems);
  };

  useEffect(() => {
    setItems(getListData("ActivityList"));
  }, []);

  return (
    <div className="draggable-container">
      <DragDropContext onDragEnd={(e) => handleDragEnd(e)}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => (
                <ActivityCard key={item.id} item={item} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
