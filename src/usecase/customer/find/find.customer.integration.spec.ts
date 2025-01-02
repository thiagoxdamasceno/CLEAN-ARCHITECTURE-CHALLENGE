import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../../../infrastructure/customer/db/sequelize/model/customer.model";
import { CustomerRepository } from "../../../infrastructure/customer/repository/customer.repository";
import FindCustomerUseCase from "./find.customer.usercase";
import { Address } from "../../../domain/customer/value-object/address";
import Customer from "../../../domain/customer/entity/customer";

describe("Test find customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    const customer = new Customer("123", "Thiago");
    const address = new Address("Street", 123, "Zipcode", "City");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "Thiago",
      address: {
        street: "Street",
        city: "City",
        number: 123,
        zipcode: "Zipcode",
      },
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});