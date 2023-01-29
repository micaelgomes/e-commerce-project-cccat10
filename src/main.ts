import { validateCPF } from "./utils/validateCPF";

export class App {
  constructor() { }

  public static async main(): Promise<void> {
    const res = validateCPF('41164735969')

    if (res) {
      console.log('CPF válido')
    } else {
      console.log('CPF inválido')
    }
  }
}

App.main();
