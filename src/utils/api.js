export const BASE_URL = "/api";

const defaultHeaders = {
  "Content-Type": "application/json",
  "Time-Zone": "Asia/Jayapura",
};

const handleApiError = (error) => {
  if (error.name === "TypeError" && error.message === "Failed to fetch") {
    throw new Error(
      "Tidak dapat terhubung ke server. Silakan cek koneksi internet Anda atau coba lagi nanti."
    );
  }
  throw error;
};

// Tidak ada timeout, biarkan fetch berjalan selama apapun
const fetchWithTimeout = async (url, options = {}) => {
  return fetch(url, options);
};

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

        // Handle specific error cases
        if (response.status === 401) {
          if (errorData.detail === "Email not verified") {
            throw new Error("Email not verified");
          } else {
            throw new Error("Invalid credentials");
          }
        } else if (response.status === 404) {
          throw new Error("User not found");
        } else if (response.status === 403) {
          throw new Error("Account not verified");
        }

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
    age_unit = "tahun", // Default ke "tahun" sesuai format backend
    timezone = "Asia/Jakarta", // Default ke timezone Indonesia
    is_pregnant = false,
    pregnancy_age = null,
    is_nursing = false,
    child_age = null,
  }) => {
    try {
      // Validasi format data
      if (
        !name ||
        !email ||
        !password ||
        !weight ||
        !height ||
        !gender ||
        !age
      ) {
        throw new Error("Semua field wajib diisi");
      }

      // Konversi weight dan height ke number dan validasi
      const weightNum = Number(weight);
      const heightNum = Number(height);
      const ageNum = Number(age);

      if (isNaN(weightNum) || weightNum <= 0) {
        throw new Error("Berat badan harus berupa angka positif");
      }
      if (isNaN(heightNum) || heightNum <= 0) {
        throw new Error("Tinggi badan harus berupa angka positif");
      }
      if (isNaN(ageNum) || ageNum <= 0) {
        throw new Error("Umur harus berupa angka positif");
      }

      // Validasi gender
      if (gender !== "Laki-laki" && gender !== "Perempuan") {
        throw new Error('Gender harus "Laki-laki" atau "Perempuan"');
      }

      const response = await fetchWithTimeout(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          ...defaultHeaders,
        },
        body: JSON.stringify({
          nama: name,
          email,
          password,
          bb: weightNum,
          tinggi: heightNum,
          gender,
          umur: ageNum,
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

  verifyEmail: async (token) => {
    try {
      // Jika tidak ada token, kembalikan error
      if (!token) {
        throw new Error("Token verifikasi tidak ditemukan");
      }

      const response = await fetchWithTimeout(
        `${BASE_URL}/verify-email?token=${encodeURIComponent(token)}`,
        {
          method: "GET",
          headers: {
            ...defaultHeaders,
          },
        }
      );

      const data = await response.json();
      return { status: response.status, data };
    } catch (error) {
      handleApiError(error);
      throw error;
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
