import bcrypt from 'bcryptjs';
export const hashing={
    SALT:10,
    passwordHash(plainpwd)
    {
        return bcrypt.hash(plainpwd,this.SALT);
    },
    matchPassword(plainpwd,dbpwd)
    {
        return bcrypt.compare(plainpwd,dbpwd);
    }
}
