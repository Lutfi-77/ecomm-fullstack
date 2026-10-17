export class AppError extends Error {
  constructor(message: string) {
    super(message); // Mengirim message ke constructor Error bawaan JS
    this.name = this.constructor.name;
  }
}
