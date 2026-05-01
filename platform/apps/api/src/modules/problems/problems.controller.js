import * as problemsService from './problems.service.js';
import { ok, created, notFound, badRequest } from '../../utils/response.js';

export async function getAll(req, res) {
  const problems = await problemsService.getAll(req.query);
  ok(res, problems);
}

export async function getBySlug(req, res) {
  const problem = await problemsService.getBySlug(req.params.slug);
  if (!problem) return notFound(res, 'Problem not found');
  ok(res, problem);
}

export async function create(req, res) {
  try {
    const problem = await problemsService.create(req.body);
    created(res, problem);
  } catch (err) {
    badRequest(res, err.message);
  }
}
