import { IBluetooth } from "./BLEWrapper";
import BleManager from "react-native-ble-manager";

export default class BLEManagerInnoveit implements IBluetooth {
  peripheralID: string = "";
  serviceUUID: string = "";
  characteristicUUID: string = "";

  constructor(
    peripheralID: string,
    serviceUUID: string,
    characteristicUUID: string
  ) {
    this.peripheralID = peripheralID;
    this.serviceUUID = serviceUUID;
    this.characteristicUUID = characteristicUUID;

    // TODO: ONLY CALL ONCE!!
    BleManager.start({ showAlert: false }).then(() => {
      // Success code
      console.log("Module initialized");
    });
  }

  // Connectable
  connect(): void {
    BleManager.connect(this.peripheralID)
      .then(() => {
        // Success code
        console.log(`BLE CONNECT INNOVEIT SUCCESS!!`);
      })
      .catch((error: Error) => {
        // Failure code
        console.log(`BLE INNOVEIT Error: ${error}`);
      });
  }

  disconnect(): void {
    BleManager.disconnect(this.peripheralID)
      .then(() => {
        // Success code
        console.log(`BLE DISCONNECT INNOVEIT SUCCESS!!`);
      })
      .catch((error: string) => {
        // Failure code
        console.log(`BLE Error: ${error}`);
      });
  }

  // Scanable
  startScan(): void {
    BleManager.scan([], 3).then(() => {
      console.log("Scanning for devices...");
    });
  }

  stopScan(): void {
    BleManager.stopScan().then(() => {
      // Success code
      console.log("Scan stopped");
    });
  }

  // Readable
  read(): void {
    BleManager.read(
      this.peripheralID,
      this.serviceUUID,
      this.characteristicUUID
    )
      .then((readData: any) => {
        // Success code
        console.log("Read: " + readData);
      })
      .catch((error: Error) => {
        // Failure code
        console.log(error);
      });
  }

  // Writeable
  write<T>(data: T): void {
    console.log(data);

    BleManager.write(
      this.peripheralID,
      this.serviceUUID,
      this.characteristicUUID,
      data
    )
      .then(() => {
        // Success code
        console.log("Write: " + data);
      })
      .catch((error: Error) => {
        // Failure code
        console.log(error);
      });
  }
}
