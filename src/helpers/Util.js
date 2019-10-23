class Util {
  toReal(numero) {
    const numeroRecebido = numero.toFixed(2).split('.');
    numeroRecebido[0] = `R$ ${numeroRecebido[0]
      .split(/(?=(?:...)*$)/)
      .join('.')}`;
    return numeroRecebido.join(',');
  }
}

export default new Util();
