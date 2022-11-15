export function ok(data: AnyObj) {
  return {
    status: "success",
    data,
  };
}

export function fail(data: AnyObj) {
  return {
    status: "fail",
    data,
  };
}

export function err(message: string) {
  return {
    status: "error",
    message,
  };
}
