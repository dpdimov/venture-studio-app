import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Vstudio@26", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@kineticthinking.com" },
    update: {},
    create: {
      email: "admin@kineticthinking.com",
      password: hashedPassword,
      name: "Admin",
      isAdmin: true,
    },
  });

  console.log("Admin user created:", admin.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
