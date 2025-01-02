import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import { ProductRepository } from "../../../infrastructure/product/repository/product.repository";
import ListProductUseCase from "./list.product.usecase";
import { ProductModel } from "../../../infrastructure/product/db/sequelize/model/product.model";

describe("Test list product use case", () => {
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
  
    it("should find a product", async () => {
      const productRepository = new ProductRepository();
      const usecase = new ListProductUseCase(productRepository);
  
      const product = new Product("123", "product a", 100);
      
      await productRepository.create(product);
  
      const input = {
        id: "123",
      };
  
      const output = {
        id: "123",
        name: "product a",
        price: 100,
      };
  
      const result = await usecase.execute(input);
  
      expect(result.products[0]).toEqual(output);
    });

});