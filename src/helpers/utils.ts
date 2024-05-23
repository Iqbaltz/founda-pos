const isLoggedIn = async () => {};

export const Utils = {};

export const formatCurrency = (value: number) => {
  return `Rp. ${value.toLocaleString("id-ID")},-`;
};

export const formatBoolean = (value: boolean) => {
  if (value) return "Ya";
  return "Tidak";
};
