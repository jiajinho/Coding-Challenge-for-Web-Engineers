import { User } from "api/user";
import config from "config";

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