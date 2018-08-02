import { IBleService } from "./IBleService";

export class BleWrapper {
  bleService: IBleService;

  constructor(bleService: IBleService) {
    this.bleService = bleService;
  }

  connect(): void {
    this.bleService.connect();
  }

  disconnect(): void {
    this.bleService.disconnect();
  }

  startScan(): void {
    this.bleService.startScan();
  }

  stopScan(): void {
    this.bleService.stopScan();
  }

  read(): void {
    this.bleService.read();
  }

  write<T>(data: T): void {
    this.bleService.write(data);
  }

  notify(): void {
    this.bleService.notify();
  }
}
