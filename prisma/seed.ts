import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const gastoire = await prisma.user.upsert({
        where: {email: "gastonmm@gmail.com", username: "gastoire"},
        update: {},
        create: {
            email: "gastonmm@gmail.com",
            username: "gastoire",
            passwordHash: "1234"
        }
    })
    console.log({gastoire})
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })