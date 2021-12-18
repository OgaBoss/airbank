import "reflect-metadata";
import {registerEnumType} from "type-graphql";

enum Status {
  BOOKED = "BOOKED",
}

registerEnumType(Status, {
  name: "Status"
});

export default Status
