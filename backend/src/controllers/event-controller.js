import mongoose from "mongoose";
import { Event } from "../models/event-model.js";
import { todayStart } from "../utils/date.js";

// Hata yardımcı fonksiyonu
function notFound(res) {
  return res.status(404).json({
    error: { message: "Event not found" }
  });
}

// Regex özel karakterlerini güvenli hâle getir
function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Tüm etkinlikleri listele
export async function getEvents(req, res, next) {
  try {
    const { category, search } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (typeof search === "string" && search.trim()) {
      filter.title = {
        $regex: escapeRegex(search.trim()),
        $options: "i"
      };
    }

    const eventList = await Event.find(filter).sort({ date: 1 });

    res.json(eventList);
  } catch (err) {
    next(err);
  }
}

// Yaklaşan etkinlikleri listele
export async function getUpcomingEvents(req, res, next) {
  try {
    const eventList = await Event.find({
      date: { $gte: todayStart() }
    }).sort({ date: 1 });

    res.json(eventList);
  } catch (err) {
    next(err);
  }
}

// ID'ye göre etkinlik getir
export async function getEventById(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return notFound(res);
    }

    const event = await Event.findById(id);

    if (!event) {
      return notFound(res);
    }

    res.json(event);
  } catch (err) {
    next(err);
  }
}

// Yeni etkinlik oluştur
export async function createEvent(req, res, next) {
  try {
    const newEvent = await Event.create(req.body ?? {});

    res.status(201).json(newEvent);
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      return res.status(400).json({
        error: { message: err.message }
      });
    }

    next(err);
  }
}

// Etkinliği güncelle
export async function updateEvent(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body ?? {};

    if (!mongoose.isValidObjectId(id)) {
      return notFound(res);
    }

    if (
      typeof updates !== "object" ||
      Array.isArray(updates) ||
      Object.keys(updates).length === 0
    ) {
      return res.status(400).json({
        error: { message: "Request body cannot be empty" }
      });
    }

    const protectedFields = [
      "_id",
      "createdAt",
      "updatedAt",
      "__v"
    ];

    const forbiddenField = Object.keys(updates).find(
      (field) => protectedFields.includes(field)
    );

    if (forbiddenField) {
      return res.status(400).json({
        error: { message: `${forbiddenField} cannot be changed` }
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      updates,
      {
        returnDocument: "after",
        runValidators: true
      }
    );

    if (!updatedEvent) {
      return notFound(res);
    }

    res.json(updatedEvent);
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      return res.status(400).json({
        error: { message: err.message }
      });
    }

    next(err);
  }
}

// Etkinliği sil
export async function deleteEvent(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return notFound(res);
    }

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return notFound(res);
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
}