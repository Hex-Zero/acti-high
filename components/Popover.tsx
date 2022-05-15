import * as React from "react";

export interface IPopoverProps {
  targetNode: React.ReactNode;
  popoverContent: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
}

export function Popover(props: IPopoverProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [targetNode, setTargetNode] = React.useState<HTMLElement | null>(null);

  const openPopover = (node: HTMLElement) => {
    setTargetNode(node);
    setIsOpen(true);
  };

  const closePopover = () => {
    setTargetNode(null);
    setIsOpen(false);
  };

  const handleClick = () => {
    if (isOpen) {
      closePopover();
    } else {
      openPopover(targetNode as HTMLElement);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (isOpen && targetNode && !targetNode.contains(event.target as Node)) {
      closePopover();
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return (
    <div className="popover-container">
      {props.targetNode}
      {isOpen && (
        <div className="popover">
          <div className="popover-content">{props.popoverContent}</div>
        </div>
      )}
    </div>
  );
}
