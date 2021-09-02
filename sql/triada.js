function makeTriada(num) {
  const tempArr = num.toString().split(".");
  let arr1 = tempArr[0].split("").reverse();
  for (let index = 3; index < arr1.length; index += 4) {
    arr1.splice(index, 0, " ");
  }
  arr1.reverse();
  return tempArr.length === 1
    ? arr1.join("")
    : arr1.join("") + "." + tempArr[1];
}
