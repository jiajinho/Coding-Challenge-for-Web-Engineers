import config from "config";
import { User } from "api/user";
import { Validation } from "types";

export function applyStyleIf(predicate: boolean, css: string) {
  if (predicate) return css;
  return '';
}

export function toBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (e) => reject(e);
  });
}

export function writeUserLocal(user: User) {
  localStorage.setItem(config.localStorage.key.authToken, user.authToken);
  localStorage.setItem(config.localStorage.key.email, user.email);
  localStorage.setItem(config.localStorage.key.username, user.username);
}

export function verifyUserLocal() {
  if (!localStorage.getItem(config.localStorage.key.authToken)) return false;
  if (!localStorage.getItem(config.localStorage.key.email)) return false;
  if (!localStorage.getItem(config.localStorage.key.username)) return false;

  return true;
}

export function validateForm<T extends Object>(form: T, validations: { [k in keyof T]?: Validation[] }): { [k in keyof T]?: string } {
  const errMessages: { [k in keyof T]?: string } = {};

  for (const [k, v] of Object.entries(form)) {
    const key = k as keyof T;

    if (!validations[key]) continue;

    for (let i = 0; i < validations[key]!.length; i++) {
      if (!validations[key]![i].regex.test(v)) {
        errMessages[key] = validations[key]![i].errMessage;
        break;
      }
    }
  }

  return errMessages;
}

export function escapeSpecialChar(regex: string) {
  const whitelist = /[\.\+\*\?\^\$\(\)\[\]\{\}\|\\]/;

  const list = [];

  for (let i = 0; i < regex.length; i++) {
    const char = regex.charAt(i);
    const isSpecial = whitelist.test(char);

    isSpecial ? list.push(`\\${char}`) : list.push(char);
  }

  return list.join('');
}