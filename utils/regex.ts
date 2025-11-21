export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneReqExp = /^\+?[0-9\s\-\(\)]{8,}$/;
export const alphanumericWithArabicRegex = /^[A-Za-z\u0621-\u064A0-9_ ]{5,}$/;
export const messageRegex = /^[\s\S]{20,}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
