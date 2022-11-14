import shortID from 'shortid';

export default class RoomIDService {
  takenRoomIDs: Set<string>;

  nextSimpleRoomID: number;

  constructor() {
    this.takenRoomIDs = new Set<string>();
    this.nextSimpleRoomID = 1;
    // TODO: load saved taken room ids from local storage, will be useful for saved devices feature in FUTURE
  }

  getSimpleAvailableRoomID(): Promise<string> {
    this.nextSimpleRoomID += 1;
    return new Promise<string>((resolve) => {
      // always return the same, six-digit number
      resolve(this.nextSimpleRoomID.toString().padStart(6, '0'));
    });
  }

  getShortIDStringOfAvailableRoom(): Promise<string> {
    return new Promise<string>((resolve) => {
      let newID = shortID();
      while (this.takenRoomIDs.has(newID)) {
        newID = shortID();
      }
      resolve(newID);
    });
  }

  markRoomIDAsTaken(id: string) {
    this.takenRoomIDs.add(id);
  }

  unmarkRoomIDAsTaken(id: string) {
    this.takenRoomIDs.delete(id);
  }

  isRoomIDTaken(id: string) {
    return this.takenRoomIDs.has(id);
  }
}
