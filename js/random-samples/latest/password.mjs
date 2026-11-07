import { genString } from "./index.mjs";
const lower = "abcdefghijklmnopqrstuvwxyz";
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const digits = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
const all =
  lower + // 5 x lower
  lower +
  lower +
  lower +
  lower +
  upper + // 3 x upper
  upper +
  upper +
  digits + // 2 x digits
  digits +
  symbols; // 1 x symbols
const password = genString(all, 16);
console.log(password);
