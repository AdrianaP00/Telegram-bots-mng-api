import { Request, Response, NextFunction } from 'express';
import { verifySign } from '../utils/jwt';
import User from '../api/models/UserMdl';

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({ message: "no estas autorizado" });
        }
        const token = authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "el token es invalido o no existe" });
        }
        const tokenVerified = verifySign(token);
        if (!tokenVerified.id) {
            return res.status(401).json(tokenVerified);
        }
        const userLogged = await User.findById(tokenVerified.id);
        req.user = userLogged;
        if (userLogged.role !== "admin") {
            return res.status(401).json({ message: "no eres administrador" });
        }
        next();

    } catch (error) {
        return res.status(500).json(error);
    }
};

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({ message: "no estas autorizado como coach" });
        }
        const token = authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "el token es invalido o no existe" });
        }
        const tokenVerified = verifySign(token);
        if (!tokenVerified.id) {
            return res.status(401).json(tokenVerified);
        }
        const userLogged = await User.findById(tokenVerified.id);
        req.user = userLogged;
        if (userLogged.role !== "user") {
            return res.status(401).json({ message: "no eres user" });
        }
        next();

    } catch (error) {
        return res.status(500).json(error);
    }
};

export { isAdmin, isAuth };
