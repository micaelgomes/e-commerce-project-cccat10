import { Product } from "../models/Product";

interface CreateProductDTO {
  description: string;
  price: number;
  quantity: number;
}

export class ProductRepository {
  private dataAccessRepository: Product[];

  constructor(
  ) {
    this.dataAccessRepository = []
  }

  public async create({ description, price, quantity }: CreateProductDTO): Promise<Product> {
    const tmpId = String(this.dataAccessRepository.length + 1);
    const product = new Product(tmpId, description, price, quantity)

    return product;
  }

  public async read(): Promise<readonly Product[]> {
    return this.dataAccessRepository;
  }

  public async update(id: string, data: Product): Promise<Product> {
    const indexItemArrayToUpdate = this.dataAccessRepository.findIndex((dataSaved) => dataSaved.id === id);

    if (indexItemArrayToUpdate >= 0) {
      this.dataAccessRepository[indexItemArrayToUpdate] = data;
    }

    return data;
  }

  public async delete(id: string): Promise<void> {
    const updatedDataAccessRepository = this.dataAccessRepository.filter(dataSaved => dataSaved.id !== id);
    this.dataAccessRepository = updatedDataAccessRepository;
  }
}
