import { checkForMemoryLeaks } from "./checkForMemoryLeaks";

const globalTeardown = async () => {
  await checkForMemoryLeaks();
};

export default globalTeardown;