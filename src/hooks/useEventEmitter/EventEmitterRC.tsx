import * as React from "react";
import { createContext } from "react";
import { EventEmitter } from "./EventEmitter";

type PropsType = {};

export const EventEmitterContext = createContext<EventEmitter<any>>(
  null as any
);

const EventEmitterRC: React.FC<PropsType> = props => {
  return (
    <EventEmitterContext.Provider value={new EventEmitter()}>
      {props.children}
    </EventEmitterContext.Provider>
  );
};

export default EventEmitterRC;
