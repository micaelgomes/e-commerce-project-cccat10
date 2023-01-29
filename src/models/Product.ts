export class Product {
  constructor(
    public readonly id: string,
    public readonly description: string,
    public readonly price: number,
    public readonly quantity: number = 1,
  ) { }
}
