import "dotenv/config";
import { SyncService } from "../src/lib/services/sync.service";

async function runSync() {
  console.log("🚀 Starting Sanity to Prisma synchronization...");

  try {
    const result = await SyncService.syncAllApartments();
    console.log(`✅ Sync Completed:`);
    console.log(`   - Total: ${result.total}`);
    console.log(`   - Succeeded: ${result.succeeded}`);
    console.log(`   - Failed: ${result.failed}`);

    const cleanup = await SyncService.cleanupDeletedApartments();
    console.log(`🧹 Cleanup Completed:`);
    console.log(`   - Deactivated: ${cleanup.deactivated}`);
  } catch (error) {
    console.error("❌ Sync failed:", error);
    process.exit(1);
  }
}

runSync();
