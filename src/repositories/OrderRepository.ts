import { Order } from "../models/Order";
import { Product } from "../models/Product";

export class OrderRepository {
  private dataAccessRepository: Order[];

  constructor(
  ) {
    this.dataAccessRepository = []
  }

  public async create(products: Omit<Product, 'id'>[]): Promise<Order> {
    const tmpId = String(this.dataAccessRepository.length + 1);
    const orderDate = new Date();
    const amountCalculated = products.reduce((tmpAmount, product) => tmpAmount + (product.quantity * product.price), 0).toFixed(2);
    const amount = Number(amountCalculated);
    const order = new Order(tmpId, products, amount, orderDate);

    this.dataAccessRepository.push(order)

    return order;
  }

  public async read(): Promise<readonly Order[]> {
    return this.dataAccessRepository;
  }

  public async update(id: string, data: Order): Promise<Order> {
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
