import { registerInitialMemUsage } from "./checkForMemoryLeaks";

const globalSetup = async () => {
  await registerInitialMemUsage();
};

export default globalSetup;
