const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function seedCategories() {
  try {
    await database.category.createMany({
      data: [
        { name: "Elemental Magic" },
        { name: "Illusion Arts" },
        { name: "Conjuration" },
        { name: "Abjuration" },
        { name: "Necromancy" },
        { name: "Forbidden Art" },
        { name: "Ancient Magic" },
        { name: "Arcane Studies" },
        { name: "ᛟᚾᚡᛖᚱ" },
      ],
    });
    console.log("Categories of Magic seeded");
  } catch (error) {
    console.log("Error seeding the db categories", error);
  } finally {
    await database.$disconnect();
  }
}

async function seedTiers() {
  const prisma = new PrismaClient(); // Create new instance for tiers

  const tiers = [
    { id: "Free", name: "free", price: 0 },
    { id: "Academic", name: "academic", price: 10 },
    { id: "Magister", name: "magister", price: 20 },
  ];

  try {
    for (const tier of tiers) {
      await prisma.tier.upsert({
        where: { id: tier.id },
        update: {},
        create: {
          id: tier.id,
          name: tier.name,
          price: tier.price,
        },
      });
    }
    console.log("Tiers successfully seeded.");
  } catch (error) {
    console.log("Error seeding the db with tiers", error);
  } finally {
    await prisma.$disconnect();
  }
}

(async () => {
  await seedCategories();
  await seedTiers();
})();
