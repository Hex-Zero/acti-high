import * as React from "react";
export interface IDraggableContainerProps {}

const actionList = [
  {
    id: "1",
    title: "Draggable 1",
    content: "Draggable 1 content",
  },
  {
    id: "2",
    title: "Draggable 2",
    content: "Draggable 2 content",
  },
  {
    id: "3",
    title: "Draggable 3",
    content: "Draggable 3 content",
  },
];

export function DraggableContainer(props: IDraggableContainerProps) {
  const [draggableList, setDraggableList] = React.useState(actionList);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = draggableList.findIndex(
      (item) => item.id === source.droppableId
    );
    const finish = draggableList.findIndex(
      (item) => item.id === destination.droppableId
    );

    const draggable = draggableList[start];

    const newDraggableList = [...draggableList];
    newDraggableList.splice(start, 1);
    newDraggableList.splice(finish, 0, draggable);

    setDraggableList(newDraggableList);
  };

  return (
    <div className="draggable-container">
      <div className="draggable-container__header">
        <h1>Draggable Container</h1>
      </div>
      <div className="draggable-container__content">
        <div className="draggable-container__content__list">
          {draggableList.map((item) => (
            <DraggableItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="draggable-container__footer">
        <div className="draggable-container__footer__list">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided: any) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="draggable-container__footer__list__droppable"
                >
                  {draggableList.map((item, index) => (
                    <DraggableItem key={item.id} item={item} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export function DraggableItem(props: any) {
  const { item, index } = props;
  return (
    <div className="draggable-container__footer__list__droppable__item">
      <div className="draggable-container__footer__list__droppable__item__title">
        {item.title}
      </div>
      <div className="draggable-container__footer__list__droppable__item__content">
        {item.content}
      </div>
    </div>
  );
}

export function DragDropContext(props: any) {
  return (
    <div className="draggable-container__footer__list__droppable__item">
      {props.children}
    </div>
  );
}

export function Droppable(props: any) {
  return (
    <div className="draggable-container__footer__list__droppable__item">
      {props.children}
    </div>
  );
}
