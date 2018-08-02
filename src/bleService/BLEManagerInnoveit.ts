// import React, { Component } from "react";
import { IBleService } from "./IBleService";
import BleManager from "react-native-ble-manager";
import { NativeModules, NativeEventEmitter } from "react-native";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const DISCOVER_BLE_EVENT: string = "BleManagerDiscoverPeripheral";
const STOP_SCAN_BLE_EVENT: string = "BleManagerStopScan";

export default class BLEManagerInnoveit implements IBleService {
  peripheralID: string = "";
  serviceUUID: string = "";
  characteristicUUID: string = "";

  private _isStarted: boolean = false;

  constructor(
    peripheralID: string,
    serviceUUID: string,
    characteristicUUID: string
  ) {
    this.peripheralID = peripheralID;
    this.serviceUUID = serviceUUID;
    this.characteristicUUID = characteristicUUID;

    this._start();
  }

  // Startable
  /** Init the module. Returns a Promise object. Don't call this multiple times. */
  private _start(): void {
    if (!this._isStarted) {
      BleManager.start({ showAlert: true }).then(() => {
        // Success code
        console.log("Module initialized");
        this._isStarted = true;
      });
    } else {
      console.log("ALREADY STARTED!");
    }
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
