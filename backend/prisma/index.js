// create a prisma client and export it to use it everywhere in the application
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default prisma