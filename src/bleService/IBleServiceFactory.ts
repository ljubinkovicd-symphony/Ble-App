import { IBleService, ListenerCallback } from "./IBleService";
import BLEManagerInnoveit from "./BleManagerInnoveit";

export const enum BleServiceLibrary {
  Innoveit,
  Polidea
}

export default class IBLEServiceFactory {
  static instance?: IBleService;

  public static getInstance(
    bleServiceLib: BleServiceLibrary,
    listenerCallback: ListenerCallback
  ): IBleService {
    if (!this.instance) {
      if (bleServiceLib === BleServiceLibrary.Innoveit) {
        console.log("MY BLE SERVICE LIBRARY IS INNOVEIT!!!");
        this.instance = new BLEManagerInnoveit(listenerCallback);
      } else if (bleServiceLib === BleServiceLibrary.Polidea) {
        // instantiate Polidea BLE service
      }
    }
    return this.instance!; // TODO: avoid force unwraping
  }
}
