// Logging is useful here for monitoring memory usage
/* eslint-disable no-console */
import { dockerCommand } from "docker-cli-js";

// If the container's memory usage increases by more than MEM_LEAK_THRESHOLD_PERCENTAGE,
// then the E2E tests will fail during the final tearDown
const MEM_LEAK_THRESHOLD_PERCENTAGE = 100;

// List of containers to check for memory usage
// Name is chosen according to `container_name` in `docker-compose.yaml`
const CONTAINERS_MEM_USAGE: Record<string, number> = {
  backend: 0.0,
  frontend: 0.0,
};

// Returns the container's current memory usage in MB
const queryMemoryUsage = async (container: string): Promise<number> => {
  const containerMemoryUsage = await dockerCommand(
    `stats ${container} --no-stream --format '{{.MemUsage}}'`,
    {
      echo: false,
    },
  );

  const containerAndTotalMem: string = containerMemoryUsage.raw;
  const containerMem: string | undefined = containerAndTotalMem.split(" ")?.[0];
  const usage: number = parseFloat(containerMem);
  const isInGB: boolean = containerMem.includes("GiB");

  if (isInGB) return usage * 1024;
  return usage;
};

const calculateMemIncreasePercentage = (
  initialUsage: number,
  finalUsage: number,
): number => ((finalUsage - initialUsage) / initialUsage) * 100;

export const registerInitialMemUsage = async () => {
  for (const container of Object.keys(CONTAINERS_MEM_USAGE)) {
    CONTAINERS_MEM_USAGE[container] = await queryMemoryUsage(container);
  }
};

export const checkForMemoryLeaks = async (): Promise<void> => {
  for (const container of Object.keys(CONTAINERS_MEM_USAGE)) {
    const initialMemUsage = CONTAINERS_MEM_USAGE[container];
    const finalMemUsage = await queryMemoryUsage(container);
    const memIncrease = calculateMemIncreasePercentage(
      initialMemUsage,
      finalMemUsage,
    );
    const formattedIncrease = memIncrease.toFixed(1);

    console.log(
      `Memory usage for '${container}' container changed from ${initialMemUsage}MB to ${finalMemUsage}MB (${formattedIncrease}%)`,
    );

    if (memIncrease > MEM_LEAK_THRESHOLD_PERCENTAGE) {
      // Throwing an error here does not cause test execution to fail due to a bug in PlayWright,
      // so instead we must log the error and then abort the process
      console.error(
        `Memory leak detected in '${container}' container\n\n (ignore below lines)`,
      );
      process.abort();
    }
  }
};
