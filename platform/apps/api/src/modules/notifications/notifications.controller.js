import * as notificationsService from './notifications.service.js';
import { ok } from '../../utils/response.js';

export async function getAll(req, res) {
  const notifications = await notificationsService.getForUser(req.userId);
  ok(res, notifications);
}

export async function markRead(req, res) {
  const notification = await notificationsService.markRead(req.params.id);
  ok(res, notification);
}
