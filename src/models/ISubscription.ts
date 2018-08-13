export interface ISubscription<T> {
  value: [T];
  peripheral: string;
  characteristic: string;
  service: string;
}
