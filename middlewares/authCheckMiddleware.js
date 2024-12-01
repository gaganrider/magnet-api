import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import dotenv from "dotenv";
import { ApiResponse } from "../utils/apiResponse.js";
dotenv.config({ path: "../env" });

const blacklist = new Set();

export const addToBlacklist = (token) => {
  blacklist.add(token);
};

const authCheck = asyncHandler(async (req, res, next) => {
  let token;
  if (req.cookies) console.log("cookie", req.cookies);
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    if (req.cookies.authToken) {
      token = req.cookies.authToken;
    } else {
      return res
        .status(401)
        .json(
          new ApiResponse(
            401,
            null,
            "Authorization token is missing or expired"
          )
        );
    }
  } else {
    token = authHeader.split(" ")[1];
  }
  console.log("token", token);
  if (blacklist.has(token)) {
    res.status(401).json(new ApiResponse(401, null, "Authorization token is missing or expired"));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
});

export default authCheck;
