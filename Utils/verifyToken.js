import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  // console.log('Req:', req);

  // const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NmFmYjQxNTgyYjQzZTg3YzExNDI1NiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwMTYwNjQ0NX0.u2e9p4NXb7p9zBuPJ_7fAdMy2sEtGCBDA2B1ID54bPc";
  const token =  req.cookies ? req.cookies.access_token : null;

  console.log('Decoded User:', token);

  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }
  jwt.verify(token, process.env.APP_JWT, (err, user) => {
    if (err) return next(createError(401, "Token is not valid!"));

    req.user = user;
    console.log('Decoded User:', user);

    next();
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'admin') {

      next();
    } else {
      next(createError(403, 'You are not authorized as an admin!'));
    }
  });
};

export const verifyStaff = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'staff') {
      next();
    } else {
      next(createError(403, 'You are not authorized as staff!'));
    }
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'user') {
      next();
    } else {
      next(createError(403, 'You are not authorized as a user!'));
    }
  });
};


export const protectedRoute = (req, res) => {
  res.json({ message: 'You have access to this protected route', user: req.user });
};