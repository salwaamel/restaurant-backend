import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function seed(){

    const owner = await prisma.owner.create({
        data: {
            username:'owner',
            password:'$2y$10$W4iQkSsSpEtZKXao8UM0T.6TuM9potlE7Q8YCnZzFXEqXEaSczkwi'
        }
    })

    const kasir = await prisma.kasir.createMany({
        data: [
            {
                username:'salwa@gmail.com',
                password:'$2y$10$xY0WS5R/5VmQ1zJbFzrgTOlXEE2aKIkSCEsGc.z/wNvkuy2ZJ9VHu',
                nama:'salwa amalia'
            },
            {
                username: 'salwaamel42@gmail.com',
                password: '$2y$10$h493rFXD5EVOyMw2ypI80u9w8XZLPDuhvQsHT889jrsULWIof6qQy',
                nama: 'salwa amalia irawati putri',
            },
        ]
    })

    const kategori = await prisma.kategori.createMany({
        data: [
            {
                nama:'Coffee'
            },
            {
                nama:'Non Coffee'
            },
            {
                nama:'Ricebowl'
            },
            {
                nama:'Dessert'
            }
        ]
    })

    const menu = await prisma.menu.createMany({
        data: [
          {
            id_kategori: 3,
            nama: 'chicken katsu',
            harga: 15000,
            gambar: '64377b47855ae.webp',
            jenis: 'Makanan',
          },
          {
            id_kategori: 1,
            nama: 'Espresso',
            harga: 20000,
            gambar: '64379933aef4f.jpg',
            jenis: 'Minuman',
          },
        ],
      });
      

    const pesanan = await prisma.pesanan.createMany({
        data: [
            {
                username_kasir: 'salwaamel42@gmail.com',
                id_menu: 1,
                jenis_minuman: null,
                harga: 15000,
                jumlah: 2,
                jenis_pembayaran: 'Tunai',
                status: 'Sukses',
                nama: null,
                kode_pesanan: '112SALWAAMEL42@GMAIL.COM130423135652',
                waktu_pesan: '13 April 2023 13:56',
                bayar: 100000,
                tanggal: new Date('2023-04-13'),
            },
            {
                username_kasir: 'salwaamel42@gmail.com',
                id_menu: 2,
                jenis_minuman: 'Dingin',
                harga: 20000,
                jumlah: 1,
                jenis_pembayaran: 'Tunai',
                status: 'Sukses',
                nama: null,
                kode_pesanan: '112SALWAAMEL42@GMAIL.COM130423135652',
                waktu_pesan: '13 April 2023 13:56',
                bayar: 100000,
                tanggal: new Date('2023-04-13'),
            },
        ],
    });
    
    console.log({
        owner,
        kasir,
        kategori,
        menu,
        pesanan
    })
}

seed()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})