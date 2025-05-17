import { Worker } from "../types/index";

let workers: Worker[] = [];

export const WorkerModel = {
  getAll: (): Worker[] => workers,
  getById: (id: number): Worker | undefined => workers.find((w) => w.id === id),
  add: (worker: Worker): Worker => {
    workers.push(worker);
    return worker;
  },
  update: (id: number, updates: Partial<Worker>): Worker | undefined => {
    const worker = workers.find((w) => w.id === id);
    if (worker) {
      Object.assign(worker, updates);
      return worker;
    }
    return undefined;
  },
  remove: (id: number): boolean => {
    const index = workers.findIndex((w) => w.id === id);
    if (index !== -1) {
      workers.splice(index, 1);
      return true;
    }
    return false;
  },
};
