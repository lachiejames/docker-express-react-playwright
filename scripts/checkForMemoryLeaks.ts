const MEMORY_LEAK_PERCENTAGE_THRESHOLD = 50;

async function formatMemoryUsage(rawUsage: string): Promise<number> {
  const containerMem: string | undefined = rawUsage.split(" ")?.[0];
  const usage: number = parseFloat(containerMem);
  const isInGB: boolean = containerMem.includes("GiB");

  if (isInGB) return usage * 1024;
  return usage;
}

async function checkForMemoryLeaks(
  container: string,
  initialMemUsage: string,
  finalMemUsage: string
): Promise<void> {
  const formattedInitialMemUsageMB = await formatMemoryUsage(initialMemUsage);
  const formattedFinalMemUsageMB = await formatMemoryUsage(finalMemUsage);

  console.log(
    `${container}\n` +
      `Initial memory usage: ${formattedInitialMemUsageMB}MB\n` +
      `Final memory usage: ${formattedFinalMemUsageMB}MB\n` +
      `Memory usage increase threshold: ${MEMORY_LEAK_PERCENTAGE_THRESHOLD}%\n\n\n`
  );

  const memoryUsageIncreaseMB =
    formattedFinalMemUsageMB - formattedInitialMemUsageMB;
  const memoryUsageIncreasePercentage =
    (memoryUsageIncreaseMB / formattedInitialMemUsageMB) * 100;

  console.log(
    `Memory usage increased by ${memoryUsageIncreasePercentage}% for '${container}' container\n`
  );

  if (memoryUsageIncreasePercentage > MEMORY_LEAK_PERCENTAGE_THRESHOLD) {
    console.error(
      `Possible memory leak detected in '${container}' container, aborting process!\n\n`
    );
    process.abort();
  } else {
    console.log(
      `No memory leak detected in '${container}' container, continuing\n\n`
    );
  }
}

const container = process.argv[2];
const initialMemUsage = process.argv[3];
const finalMemUsage = process.argv[4];

checkForMemoryLeaks(container, initialMemUsage, finalMemUsage);
