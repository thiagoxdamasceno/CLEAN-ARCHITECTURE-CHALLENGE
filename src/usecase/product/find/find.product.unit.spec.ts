import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", 'product 1', 100);
const product_b = new Product("123", 'product 2', 100);

const MockRepositoryProduct = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

const MockRepositoryProduct_b = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product_b)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit Test find product use case", () => {
    it("should find a product", async () => {
        const productRepository = MockRepositoryProduct();
        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "123",
        };

        const output = {
            id: "123",
            name: "product 1",
            price: 100,
        }

        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    })

    it("should find a product b", async () => {
        const productRepository = MockRepositoryProduct_b();
        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "123",
        };

        const output = {
            id: "123",
            name: "product 2",
            price: 100,
        }

        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    })
    
})