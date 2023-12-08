import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }
  jwt.verify(token, process.env.APP_JWT, (err, user) => {
    if (err) return next(createError(401, "Token is not valid!"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      next(createError(403, "Your are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      next(createError(403, "Your are not authorized!"));
    }
  });
};
// export const verifyAgent = (req, res, next) => {
//   verifyToken(req, res,next, () => {
//     if (req.user.isAgent) {
//       next();
//     } else {
//       if (err) return next(createError(403, "Your are not authorized!"));
//     }
//   });
// };

// export const verifyAdmin = (req, res, next) => {
//   verifyToken(req, res, async () => {
//     try {
//       console.log(req.params.userrole)
//       // Assuming verifyToken sets user details in req.user
//       if (req.role === 'admin') {
//         console.log(req.role)
//         next(); // Allow access for agents
//       } else {

//         throw createError(403, "You are not authorized!");
//       }
//     } catch (err) {
//       next(err);
//     }
//   });
// };
export const verifyAgent = (req, res, next) => {
  verifyToken(req, res, () => {
    try {
      // Assuming verifyToken sets user details in req.user
      if (req.user.isStaff) {
        next(); // Allow access for agents
      } else {
        next(createError(403, "Your are not authorized!"));
      }
    } catch (err) {
      next(err);
    }
  });
};
export const verifyStaff = (req, res, next) => {
  verifyToken(req, res, () => {
    try {
      // Assuming verifyToken sets user details in req.user
      if (req.userrole === "agent") {
        next(); // Allow access for agents
      } else {
        throw createError(403, "You are not authorized!");
      }
    } catch (err) {
      next(err);
    }
  });
};

export const authorizeRoles = (requiredRoles) => (req, res, next) => {
  verifyToken(req, res, () => {
    const { roles } = req.user;

    if (roles.some((role) => requiredRoles.includes(role))) {
      next();
    } else {
      next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmins = authorizeRoles(["admin"]);
export const verifyAgents = authorizeRoles(["agent"]);
export const verifyStaffs = authorizeRoles(["staff"]);
// export const authenticateStaff = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized: Missing token' });
//   }

//   // Verify the token
//   jwt.verify(token.split(' ')[1], 'your-secret-key', (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Unauthorized: Invalid token' });
//     }
//      // Attach staff information to the request for further use in controllers
//      req.staff = decoded.staff;
//      next();
//    });
//   // verifyToken(req, res, async () => {
//   //   try {
//   //     // Assuming verifyToken sets user details in req.user
//   //     if (req.userrole === 'agent') {
//   //       next(); // Allow access for agents
//   //     } else {
//   //       throw createError(403, "You are not authorized!");
//   //     }
//   //   } catch (err) {
//   //     next(err);
//   //   }
//   // });
// };
