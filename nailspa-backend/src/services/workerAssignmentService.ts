import { Service, Worker, WorkerArrival } from "../models";

export async function assignWorkerForOrder(serviceIds: number[]) {
  // 1. Calculate total turn
  const services = await Service.findAll({ where: { id: serviceIds } });
  const totalTurn = services.reduce(
    (sum, s) => sum + s.getDataValue("turn"),
    0
  );

  // 2. Find available workers
  const availableWorkers = await Worker.findAll({
    where: { isAvailable: true },
  });

  /* Defensive check */
  if (availableWorkers.length === 0) {
    return { chosenWorker: null, totalTurn };
  }

  // 3. Determine if first round
  const allTurnsZero = availableWorkers.every(
    (w) => w.getDataValue("turn") === 0
  );

  let chosenWorker;
  if (allTurnsZero) {
    // Get today's arrival order
    const today = new Date().toISOString().slice(0, 10);
    const arrivals = await WorkerArrival.findAll({
      where: { arrivalDate: today },
      order: [["arrivalOrder", "ASC"]],
    });

    /* Defensive check */
    if (!arrivals.length) {
      return { chosenWorker: null, totalTurn };
    }

    // Find first available in arrival order
    chosenWorker = arrivals
      .map((a) =>
        availableWorkers.find(
          (w) => w.getDataValue("id") === a.getDataValue("workerId")
        )
      )
      .find(Boolean);
  } else {
    // Find worker with min turn, break ties by arrivalOrder
    const minTurn = Math.min(
      ...availableWorkers.map((w) => w.getDataValue("turn"))
    );
    const minTurnWorkers = availableWorkers.filter(
      (w) => w.getDataValue("turn") === minTurn
    );

    // If only one min-turn worker
    if (minTurnWorkers.length === 1) {
      chosenWorker = minTurnWorkers[0];
    } else {
      // Else, break ties by arrivalOrder
      // Break tie by arrivalOrder
      const today = new Date().toISOString().slice(0, 10);
      const arrivals = await WorkerArrival.findAll({
        where: {
          arrivalDate: today,
          workerId: minTurnWorkers.map((w) => w.getDataValue("id")),
        },
        order: [["arrivalOrder", "ASC"]],
      });
      chosenWorker = minTurnWorkers.find(
        (w) => w.getDataValue("id") === arrivals[0].getDataValue("workerId")
      );
    }
  }

  /* Defensive check */
  if (!chosenWorker) {
    // No suitable worker found (shouldn't happen if data is correct)
    return { chosenWorker: null, totalTurn };
  }

  return { chosenWorker, totalTurn };
}
