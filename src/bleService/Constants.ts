/* TODO: 
  Indication vs Notification

  They are basically the same thing, just with a small twist to it.
  
  On each Indication, you must then do a application level ACK to say that this is the data I need.
  Basically like this: "here you have a packet. Is this something you want to acknowledge?"

  On each notification, you only get an event saying "you have received a packet, here it is"
  Indications are slower as you only can send one indication per connection interval
  (your application ACK will be sent on the next connection interval).

  Notifications are preferred if you need a higher transfer rate. Using notifications, you are allowed to queue a 
  certain number of packets before sending, and once the buffer is full, you get a NO_TX_BUFFERS error back from 
  sd_ble_gatts_hvx(). When a packet has been sent over the link layer, you'll get a BLE_EVT_TX_COMPLETE event, 
  at which point you can queue further packets.
*/
export const CADENCE_CASE_SERVICE = "3D880001-3A11-4ECA-A6F8-BC386179A05E"

/** Readable and Writeable */
export const CADENCE_LED_CONTROL_CHARACTERISTIC = "3D880002-3A11-4ECA-A6F8-BC386179A05E"
/** Readable and Indicatable */
export const CADENCE_LID_STATE_CHARACTERISTIC = "3D880003-3A11-4ECA-A6F8-BC386179A05E"
/** Writeable and Writeable Without Response */
export const CADENCE_CONSOLE_RX_CHARACTERISTIC = "3D881002-3A11-4ECA-A6F8-BC386179A05E"
/** Notifiable */
export const CADENCE_CONSOLE_TX_CHARACTERISTIC = "3D881003-3A11-4ECA-A6F8-BC386179A05E"

// TODO: Replace with more general name such as Cadence-<xxxx>
// ID of the peripheral that we are looking for
export const CADENCE_COMPACT_PERIPHERAL_ID = "ACBC8E5B-317D-E35D-BBDD-E3CE203A24BC";

export const SCAN_TIMEOUT_DURATION: number = 10;

// UI FLOW TEXTS
export const FIRST_SCREEN_INTRO_TEXT = "Got your Compact? Press the button to see it light up. Make sure Bluetooth is enabled on your phone.";
export const SUCCESS_TEXT = "Success! Your app and compact are now paired. Make sure to keep Bluetooth on to maintain the connection.";
export const FAIL_TEXT = "No compacts found. Make sure the Compact is glowing with a blue light when you press its button. If it does not, it might be connected to another device or out of battery.";