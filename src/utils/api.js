const BASE_URL = "http://54.151.129.129:8000";

const handleApiError = (error) => {
  if (error.name === "TypeError" && error.message === "Failed to fetch") {
    throw new Error(
      "Tidak dapat terhubung ke server. Silakan cek koneksi internet Anda atau coba lagi nanti."
    );
  }
  throw error;
};

const api = {
  login: async ({ email, password }) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ detail: "Terjadi kesalahan pada server" }));
        throw new Error(errorData.detail || "Login gagal");
      }

      const responseJson = await response.json();

      if (responseJson.error) {
        throw new Error(
          responseJson.detail || responseJson.message || "Login gagal"
        );
      }

      return responseJson;
    } catch (error) {
      handleApiError(error);
    }
  },

  register: async ({
    name,
    email,
    password,
    weight,
    height,
    gender,
    age,
    age_unit = "years",
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone,
    is_pregnant = false,
    pregnancy_age = null,
    is_nursing = false,
    child_age = null,
  }) => {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama: name,
          email,
          password,
          bb: Number(weight) || null,
          tinggi: Number(height) || null,
          gender,
          umur: Number(age) || null,
          umur_satuan: age_unit,
          hamil: is_pregnant,
          usia_kandungan: pregnancy_age ? Number(pregnancy_age) : null,
          menyusui: is_nursing,
          umur_anak: child_age ? Number(child_age) : null,
          timezone,
        }),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Terjadi kesalahan pada server" }));
        throw new Error(errorData.message || "Terjadi kesalahan pada server");
      }

      const responseJson = await response.json();

      if (responseJson.error) {
        throw new Error(responseJson.message);
      }

      return responseJson;
    } catch (error) {
      handleApiError(error);
    }
  },

  getDailyNutrition: async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/daily-nutrition`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil data nutrisi harian");
      }

      return response.json();
    } catch (error) {
      handleApiError(error);
    }
  },
};

export default api;
