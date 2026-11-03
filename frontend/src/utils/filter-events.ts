
import type { CampusEvent, Category } from "../types/campus-event";

export function searchEvents(
  eventList: CampusEvent[],
  query: string,
): CampusEvent[] {
  const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");

  if (!normalizedQuery) {
    return eventList;
  }

  return eventList.filter(
    (event) =>
      event.title.toLocaleLowerCase("tr-TR").includes(normalizedQuery) ||
      event.description.toLocaleLowerCase("tr-TR").includes(normalizedQuery),
  );
}

export function filterByCategory(
  eventList: CampusEvent[],
  category: Category | "",
): CampusEvent[] {
  if (category === "") {
    return eventList;
  }

  return eventList.filter((event) => event.category === category);
}

export function findEventById(
  eventList: CampusEvent[],
  id: string,
): CampusEvent | undefined {
  return eventList.find((event) => event.id === id);
}
