import { badRequest } from "./response.js";

/**
 * @param {import("zod").ZodSchema} schema
 * @param {"body" | "cookies" | "headers" | "params" | "query"} source
 */
export const validate =
  (schema, source = "body") =>
  (req, res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      const errors = result.error.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));
      return badRequest(res, errors);
    }
    req.validated = result.data;
    next();
  };
