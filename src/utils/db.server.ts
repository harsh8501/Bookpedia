//------------Normal Create Prisma client----------------------
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient(); 
export default prisma;

//-------------In this we dont need to run server again if we load or use application------------

/* import { PrismaClient } from '@prisma/client';

let db: PrismaClient;

declare global {
    var __db: PrismaClient | undefined;
}

//if a conn does not exist it will create a new one 
if(!global.__db){  
    global.__db = new PrismaClient();
}

db = global.__db;

export default db; */




