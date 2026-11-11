import { events } from "../data/events.js";

// Tüm etkinlikleri listele
export function getEvents(req, res) {
  const { category } = req.query;

  const eventList = category
    ? events.filter((event) => event.category === category)
    : events;

  res.json(eventList);
}

// ID'ye göre etkinlik getir
export function getEventById(req, res) {
  const event = events.find((item) => item.id === req.params.id);

  if (!event) {
    return res.status(404).json({
      error: {
        message: "Event not found"
      }
    });
  }

  res.json(event);
}

// Yeni etkinlik oluştur
export function createEvent(req, res) {
  const {
    title,
    category,
    date,
    capacity,
    time,
    location,
    description
  } = req.body ?? {};

  if (!title || !category || !date) {
    return res.status(400).json({
      error: {
        message: "title, category and date are required"
      }
    });
  }

  const newEvent = {
    id: `event-${Date.now()}`,
    title,
    category,
    date,
    capacity: Number(capacity) || 0,
    time: time ?? "",
    location: location ?? "",
    description: description ?? ""
  };

  events.push(newEvent);

  res.status(201).json(newEvent);
}