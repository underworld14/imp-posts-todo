import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const posts = Array.from({ length: 100 }).map(() => ({
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
    image: faker.image.url(),
  }));

  await prisma.post.createMany({
    data: posts,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
