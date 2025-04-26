import { hashSync } from 'bcrypt';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
    // Create sample users
    const user1 = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: hashSync('password', 10),
            phoneNumber: '1234567890',
            loanType: 'BUSINESS',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            name: 'Sugiono Tobat',
            email: 'sugiono@gmail.com',
            password: hashSync('password', 10),
            phoneNumber: '124236134123',
            loanType: 'PERSONAL',
        },
    });
}

main()
    .then(() => {
        console.log('Seeding completed.');
    })
    .catch((e) => {
        console.error('Error while seeding:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });