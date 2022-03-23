import { AppThunk } from "..";
import { axiosInstance } from "../../utils/api";
import errorHandler from "../../utils/errorHandler";
import { setAuthUser } from "../auth/actions";
import { showSuccessSnackbar } from "../system/actions";
import {
  ADD_USER,
  CALL_USERS_API,
  CALL_USERS_API_FAILED,
  CALL_USERS_API_SUCCESS,
  DELETE_USER,
  SET_USERS,
  UPDATE_USER,
  User,
  UsersAction,
} from "./types";

const url = "users";

export const callUsersApi = (): UsersAction => {
  return {
    type: CALL_USERS_API,
  };
};

export const callUsersApiSuccess = (): UsersAction => {
  return {
    type: CALL_USERS_API_SUCCESS,
  };
};

export const callUsersApiFailed = (err: string | null): UsersAction => {
  return {
    type: CALL_USERS_API_FAILED,
    payload: err,
  };
};

export function setUsers(users: User[]): UsersAction {
  return {
    type: SET_USERS,
    payload: users,
  };
}

export function addUser(user: User): UsersAction {
  return {
    type: ADD_USER,
    payload: user,
  };
}

export function updateUserSync(id: string, updatedUser: User): UsersAction {
  return {
    type: UPDATE_USER,
    payload: {
      id,
      updatedUser,
    },
  };
}

export function deleteUserSync(id: string): UsersAction {
  return {
    type: DELETE_USER,
    payload: {
      id,
    },
  };
}

// ASYNC ACTIONS

/**
 *
 * @description Fetches all users
 */
export const getUsers = (): AppThunk => async (dispatch) => {
  dispatch(callUsersApi());
  try {
    const response = await axiosInstance.request({ url });
    dispatch(setUsers(response.data));
    dispatch(callUsersApiSuccess());
  } catch (err: any) {
    dispatch(callUsersApiFailed(err.message));
    errorHandler(err, dispatch);
  }
};

/**
 *
 * @param data the newly created User
 * @description creates a new User
 */
export const createUser =
  (data: User): AppThunk =>
  async (dispatch) => {
    dispatch(callUsersApi());
    try {
      const response = await axiosInstance.request({
        url,
        data,
        method: "POST",
      });

      dispatch(addUser(response.data));
      dispatch(callUsersApiSuccess());
      dispatch(showSuccessSnackbar("Successfully saved!"));
    } catch (err: any) {
      dispatch(callUsersApiFailed(err.message));
      errorHandler(err, dispatch);
    }
  };

/**
 *
 * @param id the id of the user to be updated
 * @param data the updated user
 * @description updates an existing user
 */
export const updateUser =
  (id: string, data: User, originalEmail?: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(callUsersApi());
    const _url = `${url}/${id}`;

    try {
      const response = await axiosInstance.request({
        url: _url,
        data,
        method: "PUT",
      });
      const updatedUserId = response.data;
      dispatch(updateUserSync(updatedUserId, data));

      // if the updated user is the auth user, update the displayed name and email as well
      const authUser = getState().auth.authUser;
      if (originalEmail === authUser?.email) {
        const { email, firstname, lastname } = data;
        const updatedAuthUser = {
          ...authUser,
          email,
          firstname,
          lastname,
        } as typeof authUser;
        dispatch(setAuthUser(updatedAuthUser));
      }

      dispatch(callUsersApiSuccess());
      dispatch(showSuccessSnackbar("Successfully updated!"));
    } catch (err: any) {
      dispatch(callUsersApiFailed(err.message));
      errorHandler(err, dispatch);
    }
  };

/**
 *
 * @param id the id of the user to be deleted
 * @description deletes an existing user
 */
export const deleteUser =
  (id: string): AppThunk =>
  async (dispatch) => {
    dispatch(callUsersApi());
    const _url = `${url}/${id}`;
    try {
      const response = await axiosInstance.request({
        url: _url,
        method: "DELETE",
      });
      const deletedUserId = response.data;
      dispatch(deleteUserSync(deletedUserId));
      dispatch(callUsersApiSuccess());
      dispatch(showSuccessSnackbar("The user was deleted successfully!"));
    } catch (err: any) {
      dispatch(callUsersApiFailed(err.message));
      errorHandler(err, dispatch);
    }
  };
