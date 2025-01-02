import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "product 1", 100);
const product_b = ProductFactory.create("b", "product 2", 100);

const input = {
    id: product.id,
    name: "product 1",
    price: 100,
}

const MockRepository = () => {
    return {
      create: jest.fn(),
      findAll: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      find_b: jest.fn().mockReturnValue(Promise.resolve(product_b)),
      update: jest.fn(),
    };
  };

  

  describe("Unit test for product update use case", () => {
    it("should update a product", async () => {
      const productRepository = MockRepository();
      const productUpdateUseCase = new UpdateProductUseCase(productRepository);
  
      const output = await productUpdateUseCase.execute(input);
  
      expect(output).toEqual(input);
    });
  });