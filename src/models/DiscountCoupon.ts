export class DiscountCoupon {
  constructor(
    public readonly id: string,
    public readonly codeValidation: string,
    public readonly percentage: number,
  ) { }

  public checkIfCouponIsValid(): boolean {
    if (this.codeValidation === 'HH23MI1') {
      return true;
    }

    return false;
  }
}
