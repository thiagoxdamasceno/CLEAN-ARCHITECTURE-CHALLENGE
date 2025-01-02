import { Sequelize } from "sequelize-typescript";
import { CreateProductUseCase } from "./create.product.usecase";
import Product from "../../../domain/product/entity/product";
import { ProductModel } from "../../../infrastructure/product/db/sequelize/model/product.model";
import { ProductRepository } from "../../../infrastructure/product/repository/product.repository";

describe("Test create product use case", () => {
    let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const product = new Product("123", "product a", 100);
    
    await productRepository.create(product);

    const input ={
        name: "product a",
        price: 100    
    }

    const output = {
      id: "123",
      name: "product a",
      price: 100,
    };

    const result = await usecase.execute(input);

    expect(result.id).toBeDefined();
    expect(result.name).toEqual(output.name);
    expect(result.price).toEqual(output.price);
  });

});