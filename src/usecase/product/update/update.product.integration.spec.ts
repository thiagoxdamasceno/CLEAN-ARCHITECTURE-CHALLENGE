import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";
import { ProductModel } from "../../../infrastructure/product/db/sequelize/model/product.model";
import { ProductRepository } from "../../../infrastructure/product/repository/product.repository";

describe("Test update product use case", () => {
    
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
        
        it("should update a product", async () => {
            const productRepository = new ProductRepository();
            const usecase = new UpdateProductUseCase(productRepository);
        
            const product = new Product("123", "product a", 100);
            
            await productRepository.create(product);
        
            const input ={
            id: "123",
            name: "product a",
            price: 100    
        }
        
        const output = {
        id: "123",
        name: "product a",
        price: 100,
        };
    
        const result = await usecase.execute(input);
    
        expect(result).toEqual(output);
    });

});