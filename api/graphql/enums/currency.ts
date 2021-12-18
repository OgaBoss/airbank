import "reflect-metadata";
import {registerEnumType} from "type-graphql";

enum Currency {
  EUR = 'EUR',
  GBP = 'GBP'
}

registerEnumType(Currency, {
  name: "Currency"
});

export default Currency
