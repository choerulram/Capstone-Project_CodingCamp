export const BASE_URL = "/api";

const defaultHeaders = {
  "Content-Type": "application/json",
  "Time-Zone": "Asia/Jakarta",
};

const handleApiError = (error) => {
  if (error.name === "TypeError" && error.message === "Failed to fetch") {
    throw new Error(
      "Tidak dapat terhubung ke server. Silakan cek koneksi internet Anda atau coba lagi nanti."
    );
  }
  throw error;
};

const fetchWithTimeout = async (url, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error("Request timeout setelah 45 detik. Silakan coba lagi.");
    }
    throw error;
  }
};

const timeout = 45000; // 45 detik timeout

const api = {
  login: async ({ email, password }) => {
    try {
      const response = await fetchWithTimeout(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          ...defaultHeaders,
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
      const response = await fetchWithTimeout(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          ...defaultHeaders,
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

  getDailyNutrition: async (token, timestamp = new Date().getTime()) => {
    try {
      const response = await fetchWithTimeout(
        `${BASE_URL}/daily-nutrition?_t=${timestamp}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            ...defaultHeaders,
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("[API] Error fetch daily nutrition:", errorData);
        throw new Error(errorData.detail || "Gagal mengambil data nutrisi");
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("[API] Caught error in getDailyNutrition:", error);
      handleApiError(error);
    }
  },
  uploadImage: async (file, token) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetchWithTimeout(`${BASE_URL}/upload/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: "Terjadi kesalahan saat mengunggah gambar",
        }));
        throw new Error(errorData.message || "Gagal mengunggah gambar");
      }

      return response.json();
    } catch (error) {
      handleApiError(error);
    }
  },
  getAllScanHistory: async (token) => {
    try {
      const response = await fetchWithTimeout(`${BASE_URL}/scan-history-all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil riwayat pemindaian");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },
  getTodayScanHistory: async (token) => {
    try {
      const response = await fetchWithTimeout(`${BASE_URL}/scan-history`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil riwayat pemindaian hari ini");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },
  getProfile: async (token) => {
    try {
      const response = await fetchWithTimeout(`${BASE_URL}/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          detail: "Terjadi kesalahan pada server",
        }));
        console.error("[API] Error fetching profile:", errorData);
        throw new Error(errorData.detail || "Gagal mengambil data profil");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },
  updateProfile: async (token, profileData) => {
    try {
      console.log("[API] Mengirim update profil:", profileData);
      const response = await fetchWithTimeout(`${BASE_URL}/me`, {
        method: "PUT",
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nama: profileData.nama,
          bb: profileData.bb ? Number(profileData.bb) : null,
          tinggi: profileData.tinggi ? Number(profileData.tinggi) : null,
          gender: profileData.gender,
          umur: profileData.umur ? Number(profileData.umur) : null,
          umur_satuan: profileData.umur_satuan || "tahun",
          hamil: profileData.hamil,
          usia_kandungan: profileData.usia_kandungan
            ? Number(profileData.usia_kandungan)
            : null,
          menyusui: profileData.menyusui,
          umur_anak: profileData.umur_anak
            ? Number(profileData.umur_anak)
            : null,
          timezone: profileData.timezone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("[API] Error update profil:", errorData);
        throw new Error(errorData.detail || "Gagal memperbarui profil");
      }

      const responseData = await response.json();
      console.log("[API] Response update profil:", responseData);
      return responseData;
    } catch (error) {
      console.error("[API] Caught error in updateProfile:", error);
      handleApiError(error);
    }
  },

  // Fungsi untuk mendapatkan rekomendasi produk
  getRecommendation: async (token, nutritionData) => {
    try {
      const response = await fetchWithTimeout(`${BASE_URL}/recommendation`, {
        method: "POST",
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nutritionData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: "Terjadi kesalahan saat mengambil rekomendasi",
        }));
        throw new Error(errorData.message || "Gagal mendapatkan rekomendasi");
      }

      return response.json();
    } catch (error) {
      handleApiError(error);
    }
  },

  // Fungsi untuk menyimpan rekomendasi
  saveRecommendation: async (token, nutritionData) => {
    try {
      const response = await fetchWithTimeout(
        `${BASE_URL}/recommendation/save`,
        {
          method: "POST",
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(nutritionData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: "Terjadi kesalahan saat menyimpan rekomendasi",
        }));
        throw new Error(errorData.message || "Gagal menyimpan rekomendasi");
      }

      return response.json();
    } catch (error) {
      handleApiError(error);
    }
  },

  // Fungsi untuk mendapatkan riwayat rekomendasi
  getRecommendationHistory: async (token) => {
    try {
      const response = await fetchWithTimeout(
        `${BASE_URL}/recommendation/history`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: "Terjadi kesalahan saat mengambil riwayat rekomendasi",
        }));
        throw new Error(
          errorData.message || "Gagal mendapatkan riwayat rekomendasi"
        );
      }

      return response.json();
    } catch (error) {
      handleApiError(error);
    }
  },

  // Fungsi untuk mengupdate kandungan gizi hasil OCR
  updateNutrition: async (token, id, nutritionData) => {
    try {
      const response = await fetchWithTimeout(
        `${BASE_URL}/update-nutrition/${id}`,
        {
          method: "PUT",
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(nutritionData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: "Terjadi kesalahan saat mengupdate kandungan gizi",
        }));
        throw new Error(errorData.message || "Gagal mengupdate kandungan gizi");
      }

      return response.json();
    } catch (error) {
      handleApiError(error);
    }
  },
};

export default api;
