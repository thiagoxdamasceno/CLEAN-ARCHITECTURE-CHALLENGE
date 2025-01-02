import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase{
    private produdctRepository: ProductRepositoryInterface;
    constructor(produdctRepository: ProductRepositoryInterface){
        this.produdctRepository = produdctRepository;
    }

    async execute(input: InputListProductDto): Promise<OutputListProductDto>{
        const products = await this.produdctRepository.findAll();
        return OutputMapper.toOutput(products);
    }
}

class OutputMapper {
    static toOutput(product: Product[]): OutputListProductDto{
        return {
            products: product.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
            })),
        };
    }
}