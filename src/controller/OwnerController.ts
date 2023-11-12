import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class OwnerController {

    static async getAllOrder(req: Request, res: Response) {
        try {
          const allPesanan = await prisma.pesanan.findMany({
            include: { kasir: true, menu: true }, // Include related tables if needed
          });
    
          res.json(allPesanan);
        } catch (error) {
          console.error("Error getting all pesanan:", error);
          res.status(500).send("Internal Server Error");
        }
    }

    static async getOrderById(req: Request, res: Response) {
        try {
          const pesananId = parseInt(req.params.id, 10);
    
          const pesanan = await prisma.pesanan.findUnique({
            where: { id: pesananId },
            include: { kasir: true, menu: true }, 
          });
    
          if (!pesanan) {
            return res.status(404).send("Pesanan not found");
          }
    
          res.json(pesanan);
        } catch (error) {
          console.error("Error getting pesanan by ID:", error);
          res.status(500).send("Internal Server Error");
        }
    }

    static async createOrder(req: Request, res: Response) {
        try {
        const {
            username_kasir,
            id_menu,
            jenis_minuman,
            harga,
            jumlah,
            jenis_pembayaran,
            status,
            nama,
            kode_pesanan,
            waktu_pesan,
            bayar,
            tanggal,
        } = req.body;

        const pesanan = await prisma.pesanan.create({
            data: {
            username_kasir,
            id_menu,
            jenis_minuman,
            harga,
            jumlah,
            jenis_pembayaran,
            status,
            nama,
            kode_pesanan,
            waktu_pesan,
            bayar,
            tanggal,
            },
        });

        res.json(pesanan);
        } catch (error) {
        console.error("Error creating pesanan:", error);
        res.status(500).send("Internal Server Error");
        }
    }

    static async updateOrder(req: Request, res: Response) {
        try {
            const pesananId = parseInt(req.params.id, 10);
        
            const {
                username_kasir,
                id_menu,
                jenis_minuman,
                harga,
                jumlah,
                jenis_pembayaran,
                status,
                nama,
                kode_pesanan,
                waktu_pesan,
                bayar,
                tanggal,
            } = req.body;
        
            const updatedPesanan = await prisma.pesanan.update({
                where: { id: pesananId },
                data: {
                username_kasir,
                id_menu,
                jenis_minuman,
                harga,
                jumlah,
                jenis_pembayaran,
                status,
                nama,
                kode_pesanan,
                waktu_pesan,
                bayar,
                tanggal,
                },
            });
        
            res.json(updatedPesanan);
        } catch (error) {
            console.error("Error updating pesanan:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    static async deleteOrder(req: Request, res: Response) {
        try {
          const pesananId = parseInt(req.params.id, 10);
    
          await prisma.pesanan.delete({
            where: { id: pesananId },
          });
    
          res.send("Pesanan deleted successfully");
        } catch (error) {
          console.error("Error deleting pesanan:", error);
          res.status(500).send("Internal Server Error");
        }
      }
}
