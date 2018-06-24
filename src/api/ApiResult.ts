import ApiError from "./ApiError";

class ApiResult<T> {
  public data?: T;
  public error: ApiError;
}

export default ApiResult;
