export const ERROR_404 = {
  status: 404,
  title: "Endpoint not found",
  message: "The requested endpoint was not found. It may have been moved or deleted.",
};

export const ERROR_500 = {
  status: 500,
  title: "Internal server error",
  message: "An unexpected error occurred. Please try again later.",
};

export function processError(error, next) {
  if (error.name === "ValidationError") {
    return next({
      status: 400,
      title: "Validation failed",
      message: `Please correct the following error(s): [${Object.values(error.errors)
        .map((i) => i.message)
        .join(", ")}]`,
    });
  }

  next(ERROR_500);
}
