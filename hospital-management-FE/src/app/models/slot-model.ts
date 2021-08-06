import { Injectable } from "@angular/core";

export class Slot {

    constructor(
       public slotId:number,
       public slots:string){}    
}

@Injectable({
    providedIn: "root",
  })
  export class SlotAdapter {
    adapt(slot: any): Slot {
      return new Slot(slot.slotId, slot.slots);
    }
  }
