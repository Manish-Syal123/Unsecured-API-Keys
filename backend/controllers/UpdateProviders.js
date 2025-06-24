const prisma = require("../utils/prismaconnection.js");

async function UpdateProviders(provider) {
  try {
    const getProvider = await prisma.provider.findMany({
      where: { name: provider },
      orderBy: { lastUpdated: "desc" },
    });

    //create a new provider entry if it doesn't exist
    if (getProvider.length === 0) {
      await prisma.provider.create({
        data: {
          name: provider,
          slug: provider.toLowerCase().replace(/\s+/g, "-"),
          count: 0,
          // lastUpdated: new Date()
        },
      });
    }

    // Update the provider's last updated timestamp
    const result = await prisma.provider.upsert({
      where: { name: provider },
      update: {
        count: { increment: 1 }, // Increment the count of API keys
        // lastUpdated: new Date(),
      },
      create: { name: provider, lastUpdated: new Date() },
    });

    console.log(`Updated provider ${provider} , count : ${result.count}`);
  } catch (err) {
    console.error(`Error updating provider ${provider}:`, err);
  }
}

module.exports = { UpdateProviders };
