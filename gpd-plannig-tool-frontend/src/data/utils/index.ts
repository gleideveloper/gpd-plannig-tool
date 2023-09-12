const adicionarMascaraIsbn = (isbnBruto: string): string => {
  return `${isbnBruto.slice(0, 3)}-${isbnBruto.slice(3, 5)}-${isbnBruto.slice(
    5,
    9
  )}-${isbnBruto.slice(9, 12)}-${isbnBruto.slice(12, 13)}`;
};
const removerMascaraIsbn = (isbnBruto: string): string => {
  return isbnBruto.replaceAll("-", "");
};

export { adicionarMascaraIsbn, removerMascaraIsbn };
