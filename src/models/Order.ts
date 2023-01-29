import { Product } from "./Product";

export class Order {
  constructor(
    public readonly id: string,
    public readonly products: Omit<Product, 'id'>[],
    private _amount: number,
    private readonly _date: Date,
  ) { }

  get date() {
    return new Date(this._date.getTime())
  }

  get amount() {
    return this._amount;
  }

  public async applyDiscountInAmount(percentage: number): Promise<void> {
    const newAmount = (this._amount - (this._amount * percentage)).toFixed(2)
    this._amount = Number(newAmount)
  }
}
