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

export interface IBleService
  extends IConnectable,
    IReadable,
    IWriteable,
    IScanable {
  peripheralID: string;
  serviceUUID: string;
  characteristicUUID: string;
}
