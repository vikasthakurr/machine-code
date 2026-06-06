import jwt from "jsonwebtoken";
import { unauthorized } from "./response.js";

export function authenticate(jwtSecret) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return unauthorized(res);

    try {
      const payload = jwt.verify(token, jwtSecret);
      req.userId = payload.sub;
      req.userRole = payload.role || "user";
      next();
    } catch {
      unauthorized(res, "Invalid token");
    }
  };
}
