import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class AuthController {
    static async handleRegister(req: Request, res: Response) {
        try {
            const { username, password, nama } = req.body;

            const existingUser = await prisma.kasir.findUnique({
                where: { username },
            });

            if (existingUser) {
                return res.status(400).send("Username already exists");
            }

            // sesuaikan methodnya
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await prisma.kasir.create({
                data: {
                username,
                password: hashedPassword,
                nama,
                },
            });

            res.json(newUser);
        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).send("Internal Server Error");
        }
  }

  static async handleLogin(req: Request, res: Response) {
    try {
        const { username, password } = req.body;

        const user = await prisma.kasir.findUnique({
            where: { username },
        });

        if (!user) {
            return res.status(401).send("Invalid username or password");
        }

        //   sesuaikan method hashnya
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).send("Invalid username or password");
        }


        res.send("Login successful");
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send("Internal Server Error");
    }
  }

  static handleLogout(req: Request, res: Response) {
    // sesuaikan sama cara simpen sessionnya
    res.send("Logout successful");
  }
}
