import bcrypt from "bcryptjs";

export class ComparePassword {
  constructor() {}

  execute(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }
}
