import { Service } from "../types/index";

let services: Service[] = [];

export const ServiceModel = {
  getAll: (): Service[] => services,
  getById: (id: number): Service | undefined =>
    services.find((s) => s.id === id),
  add: (service: Service): Service => {
    services.push(service);
    return service;
  },
  update: (id: number, updates: Partial<Service>): Service | undefined => {
    const service = services.find((s) => s.id === id);
    if (service) {
      Object.assign(service, updates);
      return service;
    }
    return undefined;
  },
  remove: (id: number): boolean => {
    const index = services.findIndex((s) => s.id === id);
    if (index !== -1) {
      services.splice(index, 1);
      return true;
    }
    return false;
  },
};
