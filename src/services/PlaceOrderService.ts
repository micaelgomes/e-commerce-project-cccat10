import { Customer } from "../models/Customer";
import { DiscountCoupon } from "../models/DiscountCoupon";
import { Order } from "../models/Order";
import { Product } from "../models/Product";
import { OrderRepository } from "../repositories/OrderRepository";
import { validateCPF } from '../utils/validateCPF'

interface IPlaceOrderDTO {
  customer: Customer;
  products: Omit<Product, 'id'>[];
  coupon?: DiscountCoupon;
}

export class PlaceOrderService {
  private orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  public async execute({ customer, products, coupon }: IPlaceOrderDTO): Promise<Order> {
    if (!validateCPF(customer.cpf)) {
      throw new Error("Cannot create order with invalid CPF-Customer")
    }

    const orderCreated = await this.orderRepository.create(products);

    if (coupon) {
      orderCreated.applyDiscountInAmount(coupon.percentage);
    }

    return orderCreated;
  }
}
