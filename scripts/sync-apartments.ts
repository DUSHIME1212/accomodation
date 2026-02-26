import "dotenv/config";
import { SyncService } from "../src/lib/services/sync.service";

async function main() {
  console.log("Starting Sanity to Prisma sync...");
  try {
    const results = await SyncService.syncAllApartments();
    console.log("Sync completed successfully!");
    console.log(
      `Total: ${results.total}, Succeeded: ${results.succeeded}, Failed: ${results.failed}`,
    );
  } catch (error) {
    console.error("Sync failed:", error);
    process.exit(1);
  }
}

main();
