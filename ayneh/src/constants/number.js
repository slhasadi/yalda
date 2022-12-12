export const toFarsiNumber = (input) => {
    if ((input && input !== " " && input !== "") || input === 0) {
        const num = input.toString();
        const persianNum = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
        const englishNum = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        let out = "";
        const lim = num.length;
        for (let i = 0; i < lim; i++) {
          if (englishNum.indexOf(num[i]) > -1) {
            out = out.concat(persianNum[parseInt(num[i])]);
          } else {
            out = out.concat(num[i]);
          }
        }
        return out;
    } else {
        return "";
    }
}

export const toEnglishNumber = (input) => {
  if ((input && input !== " " && input !== "") || input === 0) {
    const num = input.toString();
    //num must be string
    const persianNum = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const englishNum = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let out = "";
    const lim = num.length;
    for (let i = 0; i < lim; i++) {
      if (persianNum.indexOf(num[i]) > -1) {
        out = out.concat(englishNum[persianNum.indexOf(num[i])]);
      } else {
        out = out.concat(num[i]);
      }
    }
    return out;
  } else {
    return "";
  }
}