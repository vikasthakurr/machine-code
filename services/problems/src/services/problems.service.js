import { Problem } from "../models/problem.model.js";

export async function getAll({
  page = 1,
  limit = 20,
  difficulty,
  tags,
  search,
  sortBy = "createdAt",
  order = "desc",
} = {}) {
  const filter = { isPublished: true };

  // Filter by difficulty
  if (difficulty) {
    filter.difficulty = difficulty;
  }

  // Filter by tags (comma-separated or array)
  if (tags) {
    const tagList = Array.isArray(tags)
      ? tags
      : tags.split(",").map((t) => t.trim());
    filter.tags = { $in: tagList };
  }

  // Search by title or description
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (Math.max(1, Number(page)) - 1) * Number(limit);
  const sortOrder = order === "asc" ? 1 : -1;

  const [problems, total] = await Promise.all([
    Problem.find(filter)
      .select("-testCases")
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(Number(limit)),
    Problem.countDocuments(filter),
  ]);

  return {
    problems,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
      hasNext: skip + problems.length < total,
      hasPrev: Number(page) > 1,
    },
  };
}

export const getBySlug = (slug) => Problem.findOne({ slug, isPublished: true });
export const create = (data) => Problem.create(data);
