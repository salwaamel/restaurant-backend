import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export class MenuController {
    static async viewMenu(req:Request, res:Response){
        try {
            const data = await prisma.menu.findMany({
                include: {
                    kategori:true
                }
            })
            res.status(200).send(data)
        } catch (error) {
            console.error('Error retrieving menu:', error)
            res.status(500).json({ message: 'Internal Server Error' })
        } 
    }
    
    static async createMenu(req: Request, res: Response) {
        try {
            const { id_kategori, nama, harga, gambar, jenis } = req.body
            const newData = await prisma.menu.create({
                data: {
                    id_kategori,
                    nama,
                    harga,
                    gambar,
                    jenis,
                },
            })
            res.status(200).json({ message: 'Menu created successfully', data: newData })
        } catch (error) {
            console.error('Error creating menu:', error)
            res.status(500).json({ message: 'Internal Server Error' })
        } 
    }

    static async updateMenu(req: Request, res: Response) {
        try {
            const { id } = req.params
            const existingMenu = await prisma.menu.findUnique({
                where: { id: parseInt(id) },
            })
        
            if (!existingMenu) {
                return res.status(404).json({ message: 'Menu not found' })
            }
        
            const { id_kategori, nama, harga, gambar, jenis } = req.body
            const updatedMenu = await prisma.menu.update({
                where: { id: parseInt(id) },
                data: {
                id_kategori: id_kategori || existingMenu.id_kategori,
                nama: nama || existingMenu.nama,
                harga: harga || existingMenu.harga,
                gambar: gambar || existingMenu.gambar,
                jenis: jenis || existingMenu.jenis,
                },
            })
        
            res.status(200).json({ message: 'Menu updated successfully', data: updatedMenu })
        } catch (error) {
            console.error('Error updating menu:', error)
            res.status(500).json({ message: 'Internal Server Error' })
        } 
    }

    static async deleteMenu(req: Request, res: Response) {
        try {
            const { id } = req.params
        
            const existingMenu = await prisma.menu.findUnique({
                where: { id: parseInt(id) },
            });
        
            if (!existingMenu) {
                return res.status(404).json({ message: 'Menu not found' })
            }
        
            const associatedPesanan = await prisma.pesanan.findFirst({
                where: { id_menu: parseInt(id) },
            });
        
            if (associatedPesanan) {
                return res.status(400).json({ message: 'Menu is associated with Pesanan and cannot be deleted' })
            }
        
            await prisma.menu.delete({
                where: { id: parseInt(id) },
            });
        
            res.status(204).json({ message: 'Menu deleted successfully' })
        } catch (error) {
            console.error('Error deleting menu:', error);
            res.status(500).json({ message: 'Internal Server Error' })
        } 
    }
}