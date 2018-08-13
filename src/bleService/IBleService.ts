import { IPeripheral, ISubscription } from "../models";

// Devices can be connectable, databases...
export interface IConnectable {
  connect(): void;
  disconnect(): void;
}

export interface IReadable {
  read(): void;
}

export interface IWriteable {
  write<T>(data: T): void;
}

export interface IScanable {
  startScan(): void;
  stopScan(): void;
}

export interface INotifiable {
  notify(): void;
}

export interface IBleService
  extends IConnectable,
    IReadable,
    IWriteable,
    IScanable,
    INotifiable {
  peripheralID: string;
  serviceUUID: string;
  characteristicUUID: string;

  removeListeners(): void;
}

export interface ListenerCallback {
  onDiscoverPeripheral(peripheral: IPeripheral): void;
  onStopScan(): void;
  onUpdateCharacteristic(data: ISubscription<any>): void;
  onStateChange(args: any): void;
}
