export function sectionSplice(val) {
  const breakSymbol = '\n';
  let cards = val.split(breakSymbol);
  return cards.filter((item) => item != '');
}
export function contentSplice(dataArr, cardId) {
  const splitSymbol = '，';
  const length = dataArr.length;
  const result = {
    data: [],
    cardId,
  };
  let item = null;
  let time = new Date().getTime();
  function maxLength(text) {
    if (text && text.length > 1000) return text.substring(0, 1000);
    return text;
  }
  for (let i = 0; i < length; i++) {
    item = dataArr[i].split(splitSymbol);
    if (item != '') {
      result.data.push({
        title: maxLength(item[0]),
        desc: maxLength(item.slice(1).join(splitSymbol)),
        key: time + i,
        keydef: time + i + 'keydef',
      });
    }
  }
  return result;
}
