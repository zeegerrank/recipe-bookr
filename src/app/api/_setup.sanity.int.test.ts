import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  vi,
} from "vitest";
import {
  setupEmulator,
  teardownEmulator,
  resetEmulator,
  getAuthDb,
} from "@/test/utils/firestoreTestEnv";
import { getTestDb, setTestDb } from "@/test/utils/dbHandle";

vi.mock("@lib/firebase/client", async (original) => {
  const mod = await original();
  const { getTestDb } = await import("@/test/utils/dbHandle");
  return { ...(mod as object), getDb: () => getTestDb() };
});

describe("Integration setup sanity", () => {
  beforeAll(async () => {
    await setupEmulator();
    setTestDb(await getAuthDb("sanity_user"));
  });

  beforeEach(async () => {
    await resetEmulator();
  });

  afterAll(async () => {
    await teardownEmulator();
  });

  it("Emulator is wired(no route yet)", async () => {
    expect(getTestDb()).toBeTruthy();
  });
});
