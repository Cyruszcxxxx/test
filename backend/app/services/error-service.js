

const errorHandler = (
  err,
  req,
  res,
  next
) => {
  console.error(err.stack);

  if (err instanceof AuthenticationError) {
    return res
      .status(401)
      .json({ message: err.message || "You're not authorized" });
  } else if (err instanceof BadRequestError) {
    return res.status(400).json({ message: err.message || "Request failed" });
  } else {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  // next();
};

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
  }
}

export { errorHandler, AuthenticationError, BadRequestError };