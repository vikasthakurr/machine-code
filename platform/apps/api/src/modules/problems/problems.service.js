import { Problem } from './problems.model.js';

export const getAll    = (filters = {}) => Problem.find({ isPublished: true, ...filters }).select('-testCases');
export const getBySlug = (slug)         => Problem.findOne({ slug, isPublished: true });
export const create    = (data)         => Problem.create(data);
