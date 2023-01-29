function isValidString(value: string): boolean {
  return value !== null && value !== undefined
}

function isValidStringLength(value: string): boolean {
  return value.length >= 11 || value.length <= 14
}

function removeCharDifferentNumbers(value: string): string {
  return value.replace(/\D/g, '');
}

function checkIfEveryoneIsRepeated(value: string): boolean {
  const initialChar = value.charAt(0);
  return value.split('').every(char => char === initialChar);
}

function parseStringToNumericArray(value: string): number[] {
  return value.split('').map(Number);
}

export function validateCPF(str: string) {
  str = removeCharDifferentNumbers(str);

  if (!isValidString(str)) {
    return false
  }

  if (!isValidStringLength(str)) {
    return false
  }

  if (checkIfEveryoneIsRepeated(str)) {
    return false;
  }

  const cpf = parseStringToNumericArray(str)

  try {
    let digitValidator1 = 0;
    let digitValidator2 = 0;
    let digitController = 11;

    for (const digit of cpf) {
      if (digitController === 2) break;
      digitValidator1 = digitValidator1 + (digitController - 1) * digit;
      digitValidator2 = digitValidator2 + (digitController) * digit;
      digitController--;
    }

    const restDigitVerify1 = (digitValidator1 % 11);
    const digitGeneratedFromValidation1 = restDigitVerify1 < 2 ? 0 : 11 - restDigitVerify1;

    digitValidator2 = digitValidator2 + 2 * digitGeneratedFromValidation1
    const restDigitVerify2 = (digitValidator2 % 11);
    const digitGeneratedFromValidation2 = restDigitVerify2 < 2 ? 0 : 11 - restDigitVerify2;

    const isValidCPF = `${digitGeneratedFromValidation1}${digitGeneratedFromValidation2}` === `${cpf[9]}${cpf[10]}`
    return isValidCPF;
  } catch {
    throw new Error("Error in digits validation loop");
  }
}
