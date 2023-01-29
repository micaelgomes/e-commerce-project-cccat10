import { Customer } from "../models/Customer";

interface CreateCustomerDTO {
  name: string;
  email: string;
  cpf: string;
}

export class CustomerRepository {
  private dataAccessRepository: Customer[];

  constructor(
  ) {
    this.dataAccessRepository = []
  }

  public async create({ name, email, cpf }: CreateCustomerDTO): Promise<Customer> {
    const tmpId = String(this.dataAccessRepository.length + 1);
    const customer = new Customer(tmpId, name, email, cpf)

    return customer;
  }

  public async read(): Promise<readonly Customer[]> {
    return this.dataAccessRepository;
  }

  public async update(id: string, data: Customer): Promise<Customer> {
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
