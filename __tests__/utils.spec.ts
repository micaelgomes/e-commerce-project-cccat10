import { describe, expect, it } from "vitest";
import { validateCPF } from "../src/utils/validateCPF";

describe('Testing utils', () => {
  it('valid CPF must return true', () => {
    const isValidCPF = validateCPF('631.774.658-35')
    const isAnotherValidCPF = validateCPF('41164735969')

    expect(isValidCPF).toBe(true);
    expect(isAnotherValidCPF).toBe(true);
  });

  it('invalid CPF must return false', () => {
    const isValidCPF = validateCPF('999.999.999-99')

    expect(isValidCPF).toBe(false);
  });

  it('invalid input must return false', () => {
    const isValidCPF = validateCPF('99999')
    const isAnotherValidCPF = validateCPF('99999.+99995555-*')

    expect(isValidCPF).toBe(false);
    expect(isAnotherValidCPF).toBe(false);
  });
})
