export function gerarDvModulo11(numeroConta: number): string {
  const numeroStr = numeroConta.toString(); // converte número para string
  let soma = 0;
  let peso = 2; // começa em 2

  // percorre da direita para a esquerda
  for (let i = numeroStr.length - 1; i >= 0; i--) {
    const digito = parseInt(numeroStr[i], 10);
    if (isNaN(digito)) throw new Error('Número da conta inválido');
    soma += digito * peso;

    peso++;
    if (peso > 9) peso = 2; // reinicia após 9
  }

  const resto = soma % 11;
  let dv = 11 - resto;

  // regras especiais (dependem do banco)
  if (dv === 10 || dv === 11) dv = 0;

  return dv.toString();
}
