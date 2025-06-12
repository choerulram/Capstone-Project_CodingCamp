import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../../utils/api";
import EditProfileModal from "./EditProfileModal";

const ProfileContent = () => {
  const { token } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const calculateBMI = (weight, height) => {
    if (!weight || !height) return null;
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };
  const getBMICategory = (bmi) => {
    if (!bmi) return null;
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5)
      return { category: "Underweight", color: "bg-blue-600" };
    if (bmiValue < 25) return { category: "Normal", color: "bg-green-600" };
    if (bmiValue < 30)
      return { category: "Overweight", color: "bg-yellow-600" };
    return { category: "Obese", color: "bg-red-600" };
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const data = await api.getProfile(token);
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-xl">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  const bmi = calculateBMI(userData?.bb, userData?.tinggi);
  const bmiStatus = getBMICategory(bmi);

  return (
    <div className="space-y-8">
      {/* Profile Header - Updated with modern design */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transform hover:shadow-xl transition-all duration-300">
        <div className="relative">
          {" "}
          <div className="h-28 bg-gradient-to-r from-main via-main/90 to-main/80 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="relative text-white/90 text-sm flex items-center gap-3">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                {userData?.role === "Premium"
                  ? "Premium Member"
                  : "Free Member"}
              </span>
              {userData?.created_at && (
                <span className="text-white/60">
                  Member since {new Date(userData.created_at).getFullYear()}
                </span>
              )}
            </div>
          </div>
          <div className="relative px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="relative -mt-20 group">
                <div className="w-36 h-36 bg-gradient-to-br from-white to-gray-50 text-main rounded-full flex items-center justify-center text-5xl font-bold shadow-2xl transform group-hover:scale-105 transition-all duration-300 border-4 border-white">
                  {userData?.nama?.[0] || "?"}
                </div>
              </div>
              <div className="text-gray-800 text-center sm:text-left flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold mb-2 text-gray-800">
                      {userData?.nama || "-"}
                    </h2>
                    <p className="text-gray-600 flex items-center justify-center sm:justify-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-main/70"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      {userData?.email || "-"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 justify-center sm:justify-end">
                    {userData?.role && (
                      <span className="px-4 py-2 bg-main/10 text-main rounded-full text-sm font-medium border border-main/20 transform hover:scale-105 transition-all duration-300">
                        {userData.role}
                      </span>
                    )}
                    <button
                      onClick={() => setIsEditModalOpen(true)}
                      className="px-6 py-2.5 bg-gradient-to-r from-main to-main/90 text-white rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 font-medium"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-2.207 2.207L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Data Grid - Updated with modern cards */}
        <div className="p-8 bg-gray-50/50">
          {/* Basic Information Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-main"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Basic Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Gender */}
              {userData?.gender && (
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <span className="p-3 bg-teal-500/10 rounded-xl group-hover:bg-teal-500/20 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-teal-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-gray-700 font-medium mb-1">Gender</h3>
                      <p className="text-gray-600">{userData.gender}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Age */}
              {userData?.umur && (
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <span className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-gray-700 font-medium mb-1">Age</h3>
                      <p className="text-gray-600">{userData.umur} years</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Body Measurements Section */}
          {(userData?.tinggi || userData?.bb) && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-main"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Body Measurements
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Height */}
                {userData?.tinggi && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                    <div className="flex items-start gap-4">
                      <span className="p-3 bg-green-500/10 rounded-xl group-hover:bg-green-500/20 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
                          />
                        </svg>
                      </span>
                      <div>
                        <h3 className="text-gray-700 font-medium mb-1">
                          Height
                        </h3>
                        <p className="text-gray-600">{userData.tinggi} cm</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Weight */}
                {userData?.bb && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                    <div className="flex items-start gap-4">
                      <span className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-purple-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                          />
                        </svg>
                      </span>
                      <div>
                        <h3 className="text-gray-700 font-medium mb-1">
                          Weight
                        </h3>
                        <p className="text-gray-600">{userData.bb} kg</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* BMI Information */}
                {userData?.bb && userData?.tinggi && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group col-span-1 sm:col-span-2 lg:col-span-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="p-2 bg-main/10 rounded-lg group-hover:bg-main/20 transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-main"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                        </span>
                        <h3 className="text-gray-700 font-medium">BMI</h3>
                      </div>{" "}
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${bmiStatus?.color.replace(
                          "bg-",
                          "bg-"
                        )}/10 text-${bmiStatus?.color.split("-")[1]}-600`}
                      >
                        {bmiStatus?.category}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600">BMI Value</span>
                        <span className="text-2xl font-bold text-gray-800">
                          {bmi}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${bmiStatus?.color} rounded-full transition-all duration-500 ease-out`}
                          style={{
                            width: `${Math.min(
                              (parseFloat(bmi) / 40) * 100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>{"Underweight (<18.5)"}</span>
                        <span>{"Normal (18.5-24.9)"}</span>
                        <span>{"Overweight (>25)"}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Health Status Section */}
          {(userData?.hamil || userData?.menyusui) && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-main"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Health Status
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Pregnancy Status */}
                {userData?.hamil && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                    <div className="flex items-start gap-4">
                      <span className="p-3 bg-pink-500/10 rounded-xl group-hover:bg-pink-500/20 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-pink-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      </span>
                      <div>
                        <h3 className="text-gray-700 font-medium mb-1">
                          Pregnancy Status
                        </h3>
                        <p className="text-gray-600">
                          {userData.usia_kandungan
                            ? `${userData.usia_kandungan} months`
                            : "Pregnant"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Nursing Status */}
                {userData?.menyusui && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                    <div className="flex items-start gap-4">
                      <span className="p-3 bg-yellow-500/10 rounded-xl group-hover:bg-yellow-500/20 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-yellow-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </span>
                      <div>
                        <h3 className="text-gray-700 font-medium mb-1">
                          Nursing Status
                        </h3>
                        <p className="text-gray-600">
                          {userData.umur_anak
                            ? `Child age: ${userData.umur_anak} months`
                            : "Currently nursing"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={userData}
        onUpdate={() => {
          setIsEditModalOpen(false);
          const fetchProfile = async () => {
            try {
              setIsLoading(true);
              const data = await api.getProfile(token);
              setUserData(data);
            } catch (err) {
              setError(err.message);
            } finally {
              setIsLoading(false);
            }
          };
          fetchProfile();
        }}
      />
    </div>
  );
};

export default ProfileContent;
