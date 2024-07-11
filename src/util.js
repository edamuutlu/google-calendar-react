import dayjs from "dayjs";

// month parametresi verilmezse varsayılan olarak geçerli ayın (bu ay) indeksini kullanır
export function getMonth(month = dayjs().month()) {
  month = Math.floor(month);

  // Geçerli yılı alınır
  const year = dayjs().year();

  // Ayın ilk gününü alıp hangi haftanın günü olduğunu belirtilir
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();

  // currentMonthCount değişkenini ilk günün haftadaki pozisyonuna göre başlatılır
  let currentMonthCount = 0 - firstDayOfTheMonth;

  // 5 hafta (5 satır) ve 7 gün (7 sütun) içeren bir matris (2D dizi) oluştulur
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
}