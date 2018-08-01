import { IConnectable, IReadable, IWriteable, IScanable } from "./BLEWrapper";
import BleManager from "react-native-ble-manager";

interface IDatabase extends IConnectable, IReadable, IWriteable {
  databaseID: string;
}

export default class DatabaseSample implements IDatabase {
  databaseID: string;

  constructor(databaseID: string) {
    this.databaseID = databaseID;
  }

  connect(): void {}
  disconnect(): void {}

  // Readable
  read(): void {}

  // Writeable
  write<T>(data: T): void {
    console.log(data);
  }
}
