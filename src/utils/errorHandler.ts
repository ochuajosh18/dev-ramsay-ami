import { AxiosResponse } from "axios";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../store";
import { setSnackbar } from "../store/system/actions";

interface ValidationError {
  property: string;
  value: string;
  message: string;
}
interface GenericError {
  message?: string;
}
const errorHandler = (
  e: unknown,
  dispatch: ThunkDispatch<AppState, unknown, AnyAction>,
  autoHide: boolean = true
) => {
  const err = e as {
    response?: AxiosResponse<{ data: Array<ValidationError> | GenericError }>;
  };
  if (err.response && err.response.data) {
    const { data } = err.response;
    if (Array.isArray(data)) {
      dispatch(
        setSnackbar({ open: true, type: "error", message: data[0].message })
      );
    } else if (typeof data === "string") {
      // generic error
      dispatch(
        setSnackbar({
          open: true,
          type: "error",
          message: "Unknown error. Please contact the administrator",
        })
      );
    } else {
      dispatch(
        setSnackbar({
          open: true,
          type: "error",
          message: (data as GenericError).message,
        })
      );
    }

    if (!autoHide) return;

    setTimeout(() => {
      dispatch(setSnackbar(null));
    }, 3000);
  }
};
export default errorHandler;
