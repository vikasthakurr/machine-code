import { Notification } from "../models/notification.model.js";

export const getForUser = (userId) =>
  Notification.find({ userId }).sort({ createdAt: -1 });
export const markRead = (id) =>
  Notification.findByIdAndUpdate(id, { read: true }, { new: true });
