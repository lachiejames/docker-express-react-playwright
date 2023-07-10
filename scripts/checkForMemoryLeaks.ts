const MEM_LEAK_THRESHOLD_MB = 2000;

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
      `Final memory usage threshold: ${MEM_LEAK_THRESHOLD_MB}MB\n\n\n`
  );

  if (
    formattedFinalMemUsageMB - formattedInitialMemUsageMB >
    MEM_LEAK_THRESHOLD_MB
  ) {
    console.error(
      `Memory leak detected in '${container}' container\n\n (ignore below lines)`
    );
    process.abort();
  }
}

const container = process.argv[2];
const initialMemUsage = process.argv[3];
const finalMemUsage = process.argv[4];

checkForMemoryLeaks(container, initialMemUsage, finalMemUsage);
