import { IActivityItem } from "../components/DraggableContainer";

export function getListData(ListId: string): any[] {
  const data: IActivityItem[] = JSON.parse(
    window.localStorage?.getItem(ListId) || "[]"
  );
  return data.sort(
    (a: IActivityItem, b: IActivityItem) => b.priorityTotal - a.priorityTotal
  );
}

export function setListData(listId: string, list: any[]) {
  window.localStorage?.setItem(listId, JSON.stringify(list));
}

export function removeItems(listId: string, items: any[]) {
  const list = getListData(listId);
  const newList: any[] = [];

  if (list.length === items.length) {
    setListData(listId, []);
    return newList;
  }

  list.forEach((item) => {
    if (!items.find((i) => i.id === item.id)) {
      newList.push(item);
    }
  });
  setListData(listId, newList);
  return newList;
}

export function addItems(listId: string, items: any[]) {
  const list = getListData(listId);
  const newList = list.concat(items);
  setListData(listId, newList);
  return newList;
}

export function updatePriorityTotals(listId: string, multiplier: number) {
  if (!multiplier) {
    return;
  }
  const list = getListData(listId);
  list.map((item: IActivityItem) => {
    item.priorityTotal += item.priority * (multiplier + 1);
    return item;
  });
  list.sort((a, b) => b.priorityTotal - a.priorityTotal);
  setListData(listId, list);
}

export function setLastCheckDate(date: Date = new Date()) {
  window.localStorage?.setItem("lastCheckDate", JSON.stringify(date));
}

export function getLastCheckDate(): Date {
  const getDate = JSON.parse(
    window.localStorage?.getItem("lastCheckDate") || "null"
  );
  const date = new Date(getDate);
  return date ? new Date(date) : new Date();
}

export function minuteSinceLastCheck(): number {
  const lastCheckDate = getLastCheckDate();
  const now = new Date();
  const diff = now.getTime() - lastCheckDate.getTime();
  const minute = Math.floor(diff / (1000 * 60 * 1));
  if (minute !== 0) {
    setLastCheckDate(now);
  }
  return minute;
}

export function resetActivityPriorityTotal(listId: string, itemId: string) {
  const list = getListData(listId);
  const item = list.find((i) => i.id === itemId);
  if (item) {
    item.priorityTotal = item.priority;
    setListData(listId, list);
  }
}
