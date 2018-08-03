// import React, { Component } from "react";
import { IBleService, ListenerCallback } from "./IBleService";
import BleManager from "react-native-ble-manager";
import { NativeModules, NativeEventEmitter } from "react-native";
import { IPeripheral } from "../models";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

// Events
/**
 * A peripheral was connected.
 * @param peripheral string - the id of the peripheral
 */
const CONNECT_BLE_EVENT: string = "BleManagerConnectPeripheral";
/**
 * A peripheral was disconnected.
 * @param peripheral string - the id of the peripheral
 */
const DISCONNECT_BLE_EVENT: string = "BleManagerDisconnectPeripheral";
/**
 * The BLE change state.
 * @param state string - the new BLE state ("on"/"off")
 */
const STATE_CHANGE_BLE_EVENT: string = "BleManagerDidUpdateState";
/**
 * The scanning find a new peripheral.
 * @param id string - the id of the peripheral
 * @param name string - the name of the peripheral
 * @param rssi number - the RSSI (Received Signal Strength Indicator) value
 * @param advertising JSON - the advertising payload, according to platforms:
 *
 *     [Android] contains the raw bytes and data (Base64 encoded string)
 *
 *     [iOS] contains a JSON object with different keys according to Apple's doc, here are some examples:
 *
 *     kCBAdvDataChannel - Number
 *
 *     kCBAdvDataIsConnectable - Number
 *
 *     kCBAdvDataLocalName - String
 *
 *     kCBAdvDataManufacturerData - JSON - contains the raw bytes and data (Base64 encoded string)
 */
const DISCOVER_BLE_EVENT: string = "BleManagerDiscoverPeripheral";
/**
 * The scanning for peripherals is ended.
 */
const STOP_SCAN_BLE_EVENT: string = "BleManagerStopScan";
/**
 * A characteristic notify a new value.
 * @param value Array - the read value
 * @param peripheral string - the id of the peripheral
 * @param characteristic string - the UUID of the characteristic
 * @param service string - the UUID of the service
 *
 * Event will only be emitted AFTER a successful startNotification */
const CHARACTERISTIC_VALUE_UPDATE_BLE_EVENT: string =
  "BleManagerDidUpdateValueForCharacteristic";

export default class BLEManagerInnoveit implements IBleService {
  peripherals: Array<IPeripheral> = [];
  peripheralID: string = "";
  serviceUUID: string = "";
  characteristicUUID: string = "";

  private _isStarted: boolean = false;

  listener: ListenerCallback;

  constructor(lc: ListenerCallback) {
    this.listener = lc;

    console.log(
      `My LISTENER: ${JSON.stringify(this.listener)} of type: ${this.listener}`
    );
    this._start();
    this._addListeners();
  }

  // Startable
  /** Init the module. Returns a Promise object. Don't call this multiple times. */
  private _start(): void {
    if (!this._isStarted) {
      BleManager.start({ showAlert: true }).then(() => {
        // Success code
        console.log("MY BLE_INNOVEIT MODULE HAS BEEN INITIALIZED!!!");
        this._isStarted = true;
      });
    } else {
      console.log("ALREADY STARTED!");
    }
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

  /** Before write, read or start notification you need to call the retrieveServices method */
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

  /** Before write, read or start notification you need to call the retrieveServices method */
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

  /** Before write, read or start notification you need to call the retrieveServices method */
  // Notifiable
  notify(): void {}

  // Helper methods
  private _addListeners(): void {
    bleManagerEmitter.addListener(STOP_SCAN_BLE_EVENT, this._handleStopScan);
    bleManagerEmitter.addListener(
      DISCOVER_BLE_EVENT,
      this._handleDiscoverPeripheral
    );
    bleManagerEmitter.addListener(
      CONNECT_BLE_EVENT,
      this._handleConnectPeripheral
    );
    bleManagerEmitter.addListener(
      DISCONNECT_BLE_EVENT,
      this._handleDisconnectPeripheral
    );
    bleManagerEmitter.addListener(
      STATE_CHANGE_BLE_EVENT,
      this._handleUpdateState
    );
    bleManagerEmitter.addListener(
      CHARACTERISTIC_VALUE_UPDATE_BLE_EVENT,
      this._handleUpdateValueForCharacteristic
    );
  }

  removeListeners(): void {
    bleManagerEmitter.removeListener(STOP_SCAN_BLE_EVENT, this._handleStopScan);
    bleManagerEmitter.removeListener(
      DISCOVER_BLE_EVENT,
      this._handleDiscoverPeripheral
    );
    bleManagerEmitter.removeListener(
      CONNECT_BLE_EVENT,
      this._handleConnectPeripheral
    );
    bleManagerEmitter.removeListener(
      DISCONNECT_BLE_EVENT,
      this._handleDisconnectPeripheral
    );
    bleManagerEmitter.removeListener(
      STATE_CHANGE_BLE_EVENT,
      this._handleUpdateState
    );
    bleManagerEmitter.removeListener(
      CHARACTERISTIC_VALUE_UPDATE_BLE_EVENT,
      this._handleUpdateValueForCharacteristic
    );
  }
  // Event handlers
  /*
    BleManagerStopScan,
    BleManagerDidUpdateState,
    BleManagerDiscoverPeripheral,
    BleManagerDidUpdateValueForCharacteristic,
    BleManagerConnectPeripheral,
    BleManagerDisconnectPeripheral
  */
  private _handleStopScan(): void {}
  private _handleDiscoverPeripheral = (peripheral: IPeripheral): void => {
    console.log(`FROM DISCOVER: ${JSON.stringify(peripheral)}`);

    this.listener.listenerCallback(peripheral);
  };
  private _handleConnectPeripheral(): void {}
  private _handleDisconnectPeripheral(): void {}
  private _handleUpdateState(): void {}
  private _handleUpdateValueForCharacteristic(): void {}
}
