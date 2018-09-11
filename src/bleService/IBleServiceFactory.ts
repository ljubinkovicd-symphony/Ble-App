import { IBleService, ListenerCallback } from "./IBleService";
import BLEInnoveit from "./BLEInnoveit";

export const enum BleServiceLibrary {
  Innoveit,
  Polidea
}

export default class IBLEServiceFactory {
  static instance?: IBleService;

  public static getInstance(
    bleServiceLib: BleServiceLibrary,
    listenerCallback?: ListenerCallback
  ): IBleService {
    if (!this.instance) {
      if (bleServiceLib === BleServiceLibrary.Innoveit) {
        console.log("MY BLE SERVICE LIBRARY IS INNOVEIT!!!");
        this.instance = new BLEInnoveit();
      } else if (bleServiceLib === BleServiceLibrary.Polidea) {
        // instantiate Polidea BLE service
      }
    }
    return this.instance!; // TODO: avoid force unwraping
  }
}

export const SELECTED_BLE_LIBRARY: BleServiceLibrary = BleServiceLibrary.Innoveit