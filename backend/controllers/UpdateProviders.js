const prisma = require("../utils/prismaconnection.js");

async function UpdateProviders(provider) {
  try {
    const providerSlug = provider.toLowerCase().replace(/\s+/g, "-");
    // upsert = update if exists, otherwise create
    const result = await prisma.provider.upsert({
      where: { slug: providerSlug },
      update: {
        count: { increment: 1 },
        lastUpdated: new Date(),
      },
      create: {
        name: provider,
        slug: providerSlug,
        count: 1,
        lastUpdated: new Date(),
      },
    });

    console.log(`Updated provider ${provider} , count : ${result.count}`);
  } catch (err) {
    console.error(`Error updating provider ${provider}:`, err);
  }
}

module.exports = { UpdateProviders };
