import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const { authToken } = req.cookies.authToken;
  if (!authToken) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }
  try {
    const decodedSignature = jwt.verify(authToken, process.env.JWT_SECRET);

    if (!decodedSignature) {
      return res
        .status(401)
        .json({ message: "Unauthorized, invalid token provided" });
    }

    req.userId = decodedSignature.userId;
    next();
  } catch (error) {
    console.log(`An error occurred in the verifyToken function: ${error}`);
  }
};
