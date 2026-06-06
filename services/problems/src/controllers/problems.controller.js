import { badRequest, created, notFound, ok } from "@devpractice/shared";
import * as problemsService from "../services/problems.service.js";

export async function getAll(req, res) {
  const { page, limit, difficulty, tags, search, sortBy, order } = req.query;
  const result = await problemsService.getAll({
    page,
    limit,
    difficulty,
    tags,
    search,
    sortBy,
    order,
  });
  ok(res, result);
}

export async function getBySlug(req, res) {
  const problem = await problemsService.getBySlug(req.params.slug);
  if (!problem) return notFound(res, "Problem not found");
  ok(res, problem);
}

export async function create(req, res) {
  try {
    const problem = await problemsService.create(req.validated);
    created(res, problem);
  } catch (err) {
    badRequest(res, err.message);
  }
}
