import { formatInTimeZone } from "date-fns-tz";
import { parseISO } from "date-fns";
import { id } from "date-fns/locale";

// Fungsi untuk mengkonversi waktu UTC ke waktu lokal Indonesia (WIB)
export const convertToLocalTime = (utcDateString) => {
  if (!utcDateString) return "";

  try {
    // Parse ISO date string dan format langsung ke timezone Jakarta
    return formatInTimeZone(
      parseISO(utcDateString),
      "Asia/Jakarta",
      "dd MMMM yyyy HH:mm:ss",
      { locale: id }
    );
  } catch (error) {
    console.error("[DateUtils] Error converting date:", error);
    return "";
  }
};

// Fungsi untuk memformat waktu ke format ISO dengan timezone yang benar
// Fungsi untuk memformat waktu ke UTC
export const formatToUTC = (date) => {
  if (!date) return "";
  return new Date(date).toISOString();
};

// Fungsi untuk mendapatkan waktu sekarang dalam timezone Indonesia
export const getCurrentLocalTime = () => {
  return formatInTimeZone(new Date(), "Asia/Jakarta", "dd MMMM yyyy HH:mm:ss", {
    locale: id,
  });
};

// Fungsi untuk memvalidasi format waktu
export const isValidDate = (dateString) => {
  if (!dateString) return false;
  try {
    const date = parseISO(dateString);
    return date instanceof Date && !isNaN(date);
  } catch {
    return false;
  }
};
