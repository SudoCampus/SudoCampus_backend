import * as bcrypt from 'bcrypt';

export class BcryptHanlder {
  static async hashPassword(userPw: string): Promise<string> {
    return await bcrypt.hash(userPw, 10);
  }

  static async comparePassword(userPw: string, hashedPw: string) {
    return await bcrypt.compare(userPw, hashedPw);
  }
}
