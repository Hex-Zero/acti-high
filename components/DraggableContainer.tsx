import * as React from "react";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { getListData, removeItems } from "../hooks/useLocalMemory";
import { ActivityCard } from "./ActivityCard";
export interface IDraggableContainerProps {}

export interface IListItem {
  id: string;
  content: string;
}

export interface IActivityItem extends IListItem {
  priority: number;
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

interface IDraggableProps {
  shouldReload: boolean;
  isRemoveActive: boolean;
  onRemove: () => void;
}

export function DraggableContainer(props: IDraggableProps) {
  const { shouldReload, isRemoveActive, onRemove } = props;
  const [items, setItems] = useState<IListItem[]>([]);
  const [itemsToRemove, setItemsToRemove] = useState<IListItem[]>([]);

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
    console.log(
      `🦉 ~ setItems(getListData("ActivityList"));`,
      getListData("ActivityList")
    );
  }, [shouldReload]);

  const handleRemoveSelected = (item: IListItem) => {
    const newItemsToRemove = [...itemsToRemove, item];
    setItemsToRemove(newItemsToRemove);
  };

  const handleRemoveDeselected = (item: IListItem) => {
    const newItemsToRemove = itemsToRemove.filter((i) => i.id !== item.id);
    setItemsToRemove(newItemsToRemove);
  };

  const handleRemoveItems = () => {
    setItems(removeItems("ActivityList", itemsToRemove));
    onRemove();
  };

  return (
    <>
      <div className="draggable-container">
        {isRemoveActive && (
          <div>
            Remove Selected
            <button onClick={handleRemoveItems}>Yes</button>
          </div>
        )}
        <DragDropContext onDragEnd={(e) => handleDragEnd(e)}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.map((item, index) => (
                  <ActivityCard
                    onRemoveSelected={handleRemoveSelected}
                    onRemoveDeselected={handleRemoveDeselected}
                    removeActive={isRemoveActive}
                    key={item.id}
                    item={item}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}
