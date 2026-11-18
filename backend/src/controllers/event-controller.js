import mongoose from "mongoose";
import { Event } from "../models/event-model.js";

// Tüm etkinlikleri listele
export async function getEvents(req, res, next) {
  try {
    const { category } = req.query;

    const filter = category ? { category } : {};

    const eventList = await Event.find(filter).sort({ date: 1 });

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
      return res.status(404).json({
        error: { message: "Event not found" }
      });
    }

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        error: { message: "Event not found" }
      });
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
    if (err.name === "ValidationError") {
      return res.status(400).json({
        error: { message: err.message }
      });
    }

    next(err);
  }
}