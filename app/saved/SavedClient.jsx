'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { clearSavedOpportunities, getSavedOpportunities, removeSavedOpportunity } from '../../components/SaveOpportunityButton';

export default function SavedClient() {
  const [items, setItems] = useState([]);

  function refresh() {
    setItems(getSavedOpportunities());
  }

  useEffect(() => {
    refresh();

    function handleChange() {
      refresh();
    }

    window.addEventListener('haraj-saved-opportunities-changed', handleChange);
    window.addEventListener('storage', handleChange);

    return () => {
      window.removeEventListener('haraj-saved-opportunities-changed', handleChange);
      window.removeEventListener('storage', handleChange);
    };
  }, []);

  function remove(slug) {
    setItems(removeSavedOpportunity(slug));
  }

  function clearAll() {
    clearSavedOpportunities();
    setItems([]);
  }

  return (
    <>
      <section className="saved-hero-v51">
        <div>
          <span className="eyebrow">الفرص المحفوظة</span>
          <h1>قائمة مختصرة للفرص التي تهمك</h1>
          <p>احفظ الفرص التي تريد الرجوع لها لاحقًا. يتم الحفظ داخل هذا المتصفح فقط.</p>
        </div>

        <div className="saved-hero-actions-v51">
          <Link className="btn btn-primary" href="/marketplace">تصفح المزيد</Link>
          {items.length > 0 && (
            <button className="btn btn-secondary" type="button" onClick={clearAll}>مسح الكل</button>
          )}
        </div>
      </section>

      {items.length > 0 ? (
        <section className="saved-grid-v51">
          {items.map((item) => (
            <article className="card saved-card-v51" key={item.slug}>
              <div className="saved-card-top-v51">
                <span>{item.sector}</span>
                <b>{item.city}</b>
              </div>

              <h3>{item.title}</h3>
              <p>{item.summary}</p>

              <div className="saved-card-meta-v51">
                <div><span>النوع</span><b>{item.type}</b></div>
                <div><span>القيمة</span><b>{item.value}</b></div>
              </div>

              <div className="saved-card-actions-v51">
                <Link className="btn btn-primary" href={`/opportunity/${item.slug}`}>عرض التفاصيل</Link>
                <button className="btn btn-secondary" type="button" onClick={() => remove(item.slug)}>إزالة</button>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="card saved-empty-v51">
          <span className="eyebrow">لا توجد فرص محفوظة</span>
          <h2>ابدأ بحفظ الفرص التي تريد متابعتها</h2>
          <p>اذهب إلى السوق واضغط “حفظ الفرصة” داخل أي بطاقة تهمك.</p>
          <Link className="btn btn-primary" href="/marketplace">تصفح الفرص</Link>
        </section>
      )}
    </>
  );
}
