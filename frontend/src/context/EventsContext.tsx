
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { CampusEvent } from "../types/campus-event";
import { events as initialEvents } from "../data/events";

interface EventsContextType {
  events: CampusEvent[];
  addEvent: (event: CampusEvent) => void;
  updateEvent: (id: string, updatedEvent: CampusEvent) => void;
  deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

interface EventsProviderProps {
  children: ReactNode;
}

export function EventsProvider({ children }: EventsProviderProps) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  const addEvent = (event: CampusEvent) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  const updateEvent = (id: string, updatedEvent: CampusEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? updatedEvent : event
      )
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== id)
    );
  };

  return (
    <EventsContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);

  if (!context) {
    throw new Error("useEvents must be used within EventsProvider");
  }

  return context;
}
