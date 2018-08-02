import { IBleService } from "./IBleService";

export class BleWrapper {
  bleService: IBleService;

  constructor(bleService: IBleService) {
    this.bleService = bleService;
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
}
