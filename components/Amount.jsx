import { formatAmount, isNumericAmount } from '../lib/formatMoney';

// مكوّن عرض موحّد للمبلغ: يعرض الرقم منسّقًا، ووحدة "ر.س" فقط إذا كان رقميًا.
// unitClass: صنف CSS لوحدة العملة (يختلف بين البطاقة والتفاصيل).
// showUnit: لإخفاء الوحدة في سياقات لا تحتاجها.
export default function Amount({ value, unitClass = 'amount-unit-v129', showUnit = true }) {
  const formatted = formatAmount(value);
  const numeric = isNumericAmount(value);
  return (
    <>
      {formatted}
      {showUnit && numeric && <i className={unitClass}>ر.س</i>}
    </>
  );
}
