import { DiscountCoupon } from "../models/DiscountCoupon";

interface CreateDiscountCouponDTO {
  codeValidation: string;
  percentage: number;
}

export class DiscountCouponRepository {
  private dataAccessRepository: DiscountCoupon[];

  constructor(
  ) {
    this.dataAccessRepository = []
  }

  public async create({ codeValidation, percentage }: CreateDiscountCouponDTO): Promise<DiscountCoupon> {
    const tmpId = String(this.dataAccessRepository.length + 1);
    const discountCoupon = new DiscountCoupon(tmpId, codeValidation, percentage)

    this.dataAccessRepository.push(discountCoupon)

    return discountCoupon;
  }

  public async read(): Promise<readonly DiscountCoupon[]> {
    return this.dataAccessRepository;
  }

  public async update(id: string, data: DiscountCoupon): Promise<DiscountCoupon> {
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

  public async findById(id: string): Promise<DiscountCoupon> {
    const indexItemArrayToUpdate = this.dataAccessRepository.findIndex((dataSaved) => dataSaved.id === id);
    // console.log(this.read());

    return this.dataAccessRepository[indexItemArrayToUpdate];
  }

  public async validateCoupon(id: string): Promise<void> {
    const coupon = await this.findById(id);

    if (!coupon) {
      throw new Error("Coupon not exists!");
    }

    if (!coupon.checkIfCouponIsValid()) {
      throw new Error("Coupon is not valid");
    }
  }
}
