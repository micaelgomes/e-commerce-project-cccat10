import { describe, expect, it } from 'vitest'
import { CustomerRepository } from '../src/repositories/CustomerRepository'
import { DiscountCouponRepository } from '../src/repositories/DiscountCouponRepository'
import { ProductRepository } from '../src/repositories/ProductRepository'
import { PlaceOrderService } from '../src/services/PlaceOrderService'

const products = [
  { description: 'Sabão Líquido Omo Lavagem Perfeita 5L', price: 56.91, quantity: 5 },
  { description: 'Maionese Tradicional Hellmanns 250g', price: 7.99, quantity: 5 },
  { description: 'Cerveja Brahma Duplo Malte Puro Malte 350ml Lata 350ml', price: 3.39, quantity: 5 },
]

const customerRepository = new CustomerRepository()
const productRepository = new ProductRepository()
const discountCouponRepository = new DiscountCouponRepository()

const customer = await customerRepository.create({ name: 'Astolfo Rodriguez', email: 'astolfo@mail.com', cpf: '631.774.658-35' })

describe('Product layer', () => {
  it("Should be able to create a instance from Product", async () => {
    const productTemplate = {
      description: 'Product Name',
      price: 100,
      quantity: 1,
    }
    const product = await productRepository.create(productTemplate);

    expect(product).toHaveProperty('id');
    expect(product).contains(productTemplate);
  })
})

describe('Order layer', () => {
  it("Should be able to place a new Order", async () => {
    const placeOrderService = new PlaceOrderService();
    const order = await placeOrderService.execute({ customer, products });

    expect(order).toHaveProperty('id');
    expect(order).toHaveProperty('products');
  })

  it("Should be able to place many Orders", async () => {
    const placeOrderService = new PlaceOrderService();
    const order1 = await placeOrderService.execute({ customer, products });
    const order2 = await placeOrderService.execute({ customer, products });

    expect(order1).toHaveProperty('id');
    expect(order2).toHaveProperty('id');
  })

  it("Shouldn't be able to place Order with invalid CPF from Customer", async () => {
    const customerWithCPFInvalid = await customerRepository.create({ name: 'Maria José', email: 'maria@mail.com', cpf: '999.999.999-00' })
    const placeOrderService = new PlaceOrderService();

    await expect(placeOrderService.execute({ customer: customerWithCPFInvalid, products })).rejects.toThrowError()
  })

  it("Should be able to calculate amount Order", async () => {
    const placeOrderService = new PlaceOrderService();
    const order = await placeOrderService.execute({ customer, products });

    expect(order.amount).toBe(341.45)
  })


  it("Should be able to calculate new amount applying discount coupon", async () => {
    const placeOrderService = new PlaceOrderService();
    const coupon = await discountCouponRepository.create({ codeValidation: 'HH23MI1', percentage: 0.15 });
    await discountCouponRepository.validateCoupon(coupon.id);
    const order = await placeOrderService.execute({ customer, products, coupon });

    expect(order.amount).toBe(290.23)
  })


  it("Shouldn't be able to apply discount coupon", async () => {
    const coupon = await discountCouponRepository.create({ codeValidation: 'invalid_coupon', percentage: 0.99 });

    await expect(discountCouponRepository.validateCoupon(coupon.id)).rejects.toThrowError();
  })
})

