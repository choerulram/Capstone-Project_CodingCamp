import api from "../../utils/api";

const ActionType = {
  SET_AUTH_USER: "SET_AUTH_USER",
  UNSET_AUTH_USER: "UNSET_AUTH_USER",
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    try {
      const loginResult = await api.login({ email, password });

      // Jika login berhasil, simpan token ke localStorage
      if (loginResult && loginResult.token) {
        localStorage.setItem("token", loginResult.token);
        if (loginResult.userId) {
          localStorage.setItem("userId", loginResult.userId);
        }
        dispatch(setAuthUserActionCreator(loginResult));
        return loginResult;
      } else {
        throw new Error("Login gagal: Data tidak valid");
      }
    } catch (error) {
      // Pastikan error memiliki response untuk error dari API
      if (error.response) {
        const errorMessage =
          error.response.data?.detail ||
          error.response.data?.message ||
          error.message;
        throw new Error(errorMessage);
      }
      // Untuk error lainnya, gunakan pesan error asli
      throw error;
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
