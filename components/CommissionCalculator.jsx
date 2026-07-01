'use client';

import { useMemo, useState } from 'react';

const COMMISSION_RATE = 0.05;

function cleanNumber(value) {
  const number = Number(String(value).replace(/[^0-9.]/g, ''));
  return Number.isFinite(number) ? number : 0;
}

function formatSar(value) {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
    maximumFractionDigits: 0
  }).format(value || 0);
}

export default function CommissionCalculator() {
  const [dealValue, setDealValue] = useState('1000000');

  const amount = useMemo(() => cleanNumber(dealValue), [dealValue]);
  const commission = useMemo(() => amount * COMMISSION_RATE, [amount]);
  const netBeforeCosts = useMemo(() => Math.max(amount - commission, 0), [amount, commission]);

  return (
    <section className="commission-calculator-v111" aria-labelledby="commission-calculator-title">
      <div className="commission-calculator-copy-v111">
        <span className="eyebrow">حاسبة عمولة النجاح</span>
        <h2 id="commission-calculator-title">احسب عمولة 5% قبل المتابعة</h2>
        <p>
          أدخل قيمة الصفقة المتوقعة لتعرف قيمة عمولة النجاح التقريبية عند إتمام صفقة ناتجة عن التواصل عبر المنصة.
        </p>
      </div>

      <div className="commission-calculator-card-v111">
        <label htmlFor="deal-value">قيمة الصفقة المتوقعة بالريال</label>
        <input
          id="deal-value"
          inputMode="numeric"
          value={dealValue}
          onChange={(event) => setDealValue(event.target.value)}
          placeholder="مثال: 1000000"
        />

        <div className="commission-results-v111">
          <div>
            <span>قيمة الصفقة</span>
            <b>{formatSar(amount)}</b>
          </div>
          <div>
            <span>عمولة النجاح 5%</span>
            <b>{formatSar(commission)}</b>
          </div>
          <div>
            <span>المتبقي قبل أي تكاليف أخرى</span>
            <b>{formatSar(netBeforeCosts)}</b>
          </div>
        </div>

        <p className="commission-note-v111">
          هذه الحاسبة توضيحية فقط. استحقاق العمولة وتفاصيلها يخضع للشروط والأحكام أو اتفاقية العمولة المعتمدة بين الأطراف.
        </p>
      </div>
    </section>
  );
}
