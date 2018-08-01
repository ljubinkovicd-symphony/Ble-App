import { IBluetooth } from "./BLEWrapper";
import BleManager from "react-native-ble-manager";

export default class BLEManagerPolidea implements IBluetooth {
  peripheralID: string;
  serviceUUID: string;
  characteristicUUID: string;

  constructor(
    peripheralID: string,
    serviceUUID: string,
    characteristicUUID: string
  ) {
    this.peripheralID = peripheralID;
    this.serviceUUID = serviceUUID;
    this.characteristicUUID = characteristicUUID;
  }

  startScan(): void {}
  stopScan(): void {}

  connect(): void {}
  disconnect(): void {}

  // Readable
  read(): void {}

  // Writeable
  write<T>(data: T): void {
    console.log(data);
  }
}
