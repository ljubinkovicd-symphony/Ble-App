export interface ICharacteristic {
  service: string;
  characteristic: string;
  isNotifying: boolean;
  properties: [string];
}
