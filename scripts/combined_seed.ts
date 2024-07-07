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
    {
      id: "Free",
      description:
        "For mages who don't want to pay. Access to basic spells and limited community access.",
      price: 0,
    },
    {
      id: "Academic",
      description:
        "For dedicated learners. Gain access to advanced spells, extensive access to the spell library, monthly apprenticeships, and full community access.",
      price: 35,
    },
    {
      id: "Magister",
      description:
        "For mages who seek mastery. Unlock all spells, unlimited access to the spell library, weekly apprenticeships, VIP community access, and the ability to earn runes for rank.",
      price: 100,
    },
  ];

  try {
    for (const tier of tiers) {
      await prisma.tier.upsert({
        where: { id: tier.id },
        update: {},
        create: {
          id: tier.id,
          description: tier.description,
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
