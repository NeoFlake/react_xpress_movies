import UsersRepository from "../repositories/users.repository";
import bcrypt from 'bcrypt';
import { ERROR_LIBELLE } from "../constantes/errors.js";

const saltRounds = 10;

const findAll = async () => {
    try {
        const users = UsersRepository.findAll();
        if (users.length > 0) {
            return users;
        } else {
            throw new Error("Aucun utilisateur n'a pu être retourné");
        }
    } catch (error) {
        throw Error(error.message);
    }
}

const findById = async (id) => {
    try {
        const user = UsersRepository.findById(id);
        if (user.length > 0) {
            return film;
        } else {
            throw new Error("Aucun utilisateur trouvé avec cet identifiant");
        }
    } catch (error) {
        throw Error(error.message);
    }
}

const login = async (credentials) => {
    try {
        const user = await UsersRepository.findByEmail(credentials.email);
        if (user === 0) {
            throw new Error(ERROR_LIBELLE.AUTHENTIFICATION_FAIL);
        } else {
            if (bcrypt.compareSync(credentials.password, user.password)) {
                return user;
            } else {
                throw new Error(ERROR_LIBELLE.AUTHENTIFICATION_FAIL);
            };
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const add = async (user) => {
    try {
        const emailUsed = await UsersRepository.findByEmail(user.email);
        if (emailUsed !== 0) {
            throw new Error(ERROR_LIBELLE.EMAIL_ALREADY_EXIST);
        } else {
            const passwordHashed = await bcrypt.hash(user.password, saltRounds);
            const newUser = {
                lastname: user.lastname,
                firstname: user.firstname,
                email: user.email,
                password: passwordHashed
            };
            await UsersRepository.add(newUser);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateById = async (user, id) => {
    try {
        if (user.id === id) {
            const emailAlreadyExist = await UsersRepository.findByEmail(user.email);
            const oldUser = await UsersRepository.findById(id);
            if (user.email !== oldUser.email && emailAlreadyExist.length > 0) {
                throw new Error(ERROR_LIBELLE.EMAIL_ALDREADY_EXIST);
            } else {
                if (bcrypt.compareSync(user.password, oldUser.password)) {
                    let updatedUser = {
                        lastname: user.lastname,
                        firstname: user.firstname,
                        email: user.email,
                        password: oldUser.password
                    };
                    if (user.newPassword.length > 0) {
                        if (user.newPassword === user.confirmPassword) {
                            updatedUser.password = await bcrypt.hash(user.newPassword, saltRounds);
                            const update = await UsersRepository.updateById(user.id, updatedUser);
                            if (update === 0) {
                                throw new Error(ERROR_LIBELLE.UPDATE_PROFILE_FAIL);
                            } else {
                                const userUpdated = await UsersRepository.findById(user.id);
                                return userUpdated;
                            }
                        } else {
                            throw new Error(ERROR_LIBELLE.UPDATE_PASSWORD_FAIL);
                        }
                    } else {
                        const update = await UsersRepository.updateById(user.id, updatedUser);
                        if (update === 0) {
                            throw new Error(ERROR_LIBELLE.UPDATE_PROFILE_DB_ERROR);
                        } else {
                            const userUpdated = await UsersRepository.findById(user.id);
                            return userUpdated;
                        }
                    }
                } else {
                    throw new Error(ERROR_LIBELLE.BAD_PASSWORD);
                }
            }
        } else {
            throw new Error(ERROR_LIBELLE.TECHNICAL_ERROR_WHEN_PROFILE_MODIFICATION);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const removeById = async (id) => {
    try {
        const remove = await UsersRepository.deleteById(id);
        if (remove > 0) {
            return "User remove";
        } else {
            throw new Error(ERROR_LIBELLE.REMOVE_PROFILE_FAIL);
        }
    } catch (error) {
        throw new Error(ERROR_LIBELLE.REMOVE_PROFILE_FAIL);
    }
}

export default { findAll, findById, login, add, updateById, removeById }