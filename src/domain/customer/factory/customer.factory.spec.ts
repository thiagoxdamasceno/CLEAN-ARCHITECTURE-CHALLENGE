import { Address } from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
  it("should create a customer", () => {
    let customer = CustomerFactory.create("Thiago");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Thiago");
    expect(customer.address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    const address = new Address("Street", 1, "11111-001", "São Paulo");

    let customer = CustomerFactory.createWithAddress("Thiago", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Thiago");
    expect(customer.address).toBe(address);
  });
});