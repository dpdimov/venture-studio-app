import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@venture-studio.co.uk" },
    update: {},
    create: {
      email: "admin@venture-studio.co.uk",
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
