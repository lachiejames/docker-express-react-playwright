const MEMORY_LEAK_PERCENTAGE_THRESHOLD = 50;

// If input is '12.34MiB / 7.667GiB', then return 12.34
// If input is '1.234GiB / 7.667GiB', then return 1263.616 (GB value in MB)
async function formatMemoryUsage(rawUsageVsTotal: string): Promise<number> {
  const rawUsage = rawUsageVsTotal.split(" ")?.[0];
  const containerMem: string | undefined = rawUsage.replace(/\D/g, "");
  const usage: number = parseFloat(containerMem);
  const isInGB: boolean = containerMem.includes("GiB");

  if (isInGB) return usage * 1024;
  return usage;
}

async function checkForMemoryLeaks(
  container: string,
  rawInitialMemUsage: string,
  rawFinalMemUsage: string,
): Promise<void> {
  const initialMemUsageMB = await formatMemoryUsage(rawInitialMemUsage);
  const finalMemUsageMB = await formatMemoryUsage(rawFinalMemUsage);

  console.log(
    `Checking for memory leaks in '${container}' container with memory usage increase threshold of ${MEMORY_LEAK_PERCENTAGE_THRESHOLD}%`,
  );

  console.log(container);
  console.log(`Initial memory usage: ${initialMemUsageMB}MB`);
  console.log(`Final memory usage: ${finalMemUsageMB}MB`);

  const memoryUsageIncreaseMB = finalMemUsageMB - initialMemUsageMB;
  const increasePercentage = (memoryUsageIncreaseMB / initialMemUsageMB) * 100;
  const increasePercentageRounded = increasePercentage.toFixed(2);

  console.log(
    `Memory usage increased by ${increasePercentageRounded}% for '${container}' container`,
  );

  if (increasePercentage > MEMORY_LEAK_PERCENTAGE_THRESHOLD) {
    console.error(
      `Possible memory leak detected in '${container}' container, aborting process!\n\n`,
    );
    process.abort();
  } else {
    console.log(
      `No memory leak detected in '${container}' container, continuing\n\n`,
    );
  }
}

const container = process.argv[2];
const initialMemUsage = process.argv[3];
const finalMemUsage = process.argv[4];

checkForMemoryLeaks(container, initialMemUsage, finalMemUsage);
