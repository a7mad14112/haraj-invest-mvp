'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import SaveOpportunityButton from '../../components/SaveOpportunityButton';
import ShareOpportunityButton from '../../components/ShareOpportunityButton';
import { getSupabase } from '../../lib/supabaseClient';
import { fallbackOpportunities, normalizeOpportunity } from '../../lib/opportunityFallback';
import { formatAmount } from '../../lib/formatMoney';
import Amount from '../../components/Amount';

const all = 'الكل';

function unique(list, key) {
  return [all, ...Array.from(new Set(list.map((item) => item[key]).filter(Boolean)))];
}

function riskClass(risk) {
  if (risk === 'منخفض') return 'risk-low';
  if (risk === 'مرتفع') return 'risk-high';
  return 'risk-medium';
}

function readinessClass(value) {
  if (String(value).includes('جاهز') || String(value).includes('مكتمل')) return 'ready';
  if (String(value).includes('تطوير') || String(value).includes('مبكرة')) return 'early';
  return 'review';
}

function parseMoney(value) {
  const digits = String(value || '').replace(/[^\d]/g, '');
  return digits ? Number(digits) : 0;
}

function normalizeListItem(item, index) {
  const normalized = normalizeOpportunity(item);
  return {
    ...normalized,
    id: normalized.id || normalized.slug || item.id || `fallback-${index}`,
    slug: normalized.slug || item.slug || item.id || `opportunity-${index}`,
    created_at: item.created_at || item.createdAt || null
  };
}

function OpportunityCard({ item }) {
  const slug = item.slug || item.id;
  const isReady = String(item.readiness || '').includes('جاهز') || String(item.readiness || '').includes('مكتمل');

  // أسلوب Teaser: تحديد المقياس المحوري ووصفه حسب نوع الفرصة.
  const rawHero = item.value && item.value !== '—' ? item.value : (item.revenue || '—');
  const heroLabel = String(item.type || '').includes('استثمار') || String(item.type || '').includes('تمويل')
    ? 'التمويل المطلوب'
    : String(item.type || '').includes('شراكة')
      ? 'حصة الشراكة'
      : 'القيمة المطلوبة';

  return (
    <article className="card opp-card marketplace-card-v41 marketplace-card-v116 opp-teaser-v129">
      <div className="marketplace-card-banner marketplace-card-banner-v116">
        <span className="marketplace-sector-pill">{item.sector}</span>
        <span className={`market-risk ${riskClass(item.risk)}`}>{item.risk}</span>
      </div>

      <div className="marketplace-card-main marketplace-card-main-v116">
        <span className="opp-teaser-type-v129">{item.type}</span>

        <div className="marketplace-title-row">
          <h3>{item.title}</h3>
          {isReady && <span className="marketplace-featured-badge">جاهز</span>}
        </div>

        <p>{item.summary}</p>

        <div className="marketplace-mini-tags">
          <span>{item.city}</span>
          <span className={readinessClass(item.readiness)}>{item.readiness}</span>
        </div>
      </div>

      <div className="opp-teaser-hero-v129">
        <span className="opp-teaser-hero-label-v129">{heroLabel}</span>
        <b className="opp-teaser-hero-value-v129"><Amount value={rawHero} unitClass="opp-teaser-unit-v129" /></b>
        <div className="opp-teaser-secondary-v129">
          <span>الإيرادات: <b><Amount value={item.revenue} unitClass="opp-teaser-unit-v129" /></b></span>
          <span>الربح: <b><Amount value={item.profit} unitClass="opp-teaser-unit-v129" /></b></span>
        </div>
      </div>

      <div className="opp-teaser-nextstep-v129">
        راجع التفاصيل والمستندات المتاحة، ثم أرسل اهتمامك للتواصل الأولي.
      </div>

      <div className="marketplace-card-actions marketplace-card-actions-v51 marketplace-card-actions-v116">
        <Link className="btn btn-primary" href={`/opportunity/${slug}`}>عرض الفرصة</Link>
        <Link className="btn btn-secondary" href={`/contact?opportunity=${slug}`}>اهتمام</Link>
        <SaveOpportunityButton opportunity={item} />
        <ShareOpportunityButton opportunity={item} />
      </div>
    </article>
  );
}

export default function MarketplaceClient() {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState(all);
  const [sector, setSector] = useState(all);
  const [type, setType] = useState(all);
  const [risk, setRisk] = useState(all);
  const [readiness, setReadiness] = useState(all);
  const [sortBy, setSortBy] = useState('recommended');
  const [items, setItems] = useState(fallbackOpportunities.map(normalizeListItem));
  const [source, setSource] = useState('fallback');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const qParam = params.get('search') || params.get('q');
    const cityParam = params.get('city');
    const sectorParam = params.get('sector');
    const typeParam = params.get('type');
    const riskParam = params.get('risk');
    const readinessParam = params.get('readiness');

    if (qParam) setQuery(qParam);
    if (cityParam) setCity(cityParam);
    if (sectorParam) setSector(sectorParam);
    if (typeParam) setType(typeParam);
    if (riskParam) setRisk(riskParam);
    if (readinessParam) setReadiness(readinessParam);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadOpportunities() {
      setLoading(true);
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from('opportunities')
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const normalized = (data || []).map(normalizeListItem);

        if (!cancelled && normalized.length > 0) {
          setItems(normalized);
          setSource('supabase');
        }

        if (!cancelled && normalized.length === 0) {
          setItems(fallbackOpportunities.map(normalizeListItem));
          setSource('fallback-empty');
        }
      } catch (error) {
        console.warn('Using fallback opportunities:', error);
        if (!cancelled) {
          setItems(fallbackOpportunities.map(normalizeListItem));
          setSource('fallback-error');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadOpportunities();

    return () => {
      cancelled = true;
    };
  }, []);

  const cities = useMemo(() => unique(items, 'city'), [items]);
  const sectors = useMemo(() => unique(items, 'sector'), [items]);
  const types = useMemo(() => unique(items, 'type'), [items]);
  const risks = useMemo(() => unique(items, 'risk'), [items]);
  const readinessOptions = useMemo(() => unique(items, 'readiness'), [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const result = items.filter((item) => {
      const matchesQuery =
        !q ||
        `${item.title} ${item.sector} ${item.city} ${item.type} ${item.summary} ${item.readiness}`
          .toLowerCase()
          .includes(q);

      const matchesCity = city === all || item.city === city;
      const matchesSector = sector === all || item.sector === sector;
      const matchesType = type === all || item.type === type;
      const matchesRisk = risk === all || item.risk === risk;
      const matchesReadiness = readiness === all || item.readiness === readiness;

      return matchesQuery && matchesCity && matchesSector && matchesType && matchesRisk && matchesReadiness;
    });

    return [...result].sort((a, b) => {
      if (sortBy === 'valueHigh') return parseMoney(b.value) - parseMoney(a.value);
      if (sortBy === 'valueLow') return parseMoney(a.value) - parseMoney(b.value);
      if (sortBy === 'newest') return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      if (sortBy === 'sector') return String(a.sector).localeCompare(String(b.sector), 'ar');
      return 0;
    });
  }, [items, query, city, sector, type, risk, readiness, sortBy]);

  const stats = useMemo(() => {
    const ready = items.filter((item) => String(item.readiness || '').includes('جاهز') || String(item.readiness || '').includes('مكتمل')).length;
    const sectorsCount = new Set(items.map((item) => item.sector).filter(Boolean)).size;
    const citiesCount = new Set(items.map((item) => item.city).filter(Boolean)).size;

    return {
      total: items.length,
      visible: filtered.length,
      ready,
      sectorsCount,
      citiesCount
    };
  }, [items, filtered.length]);

  const hasActiveFiltersV71 = Boolean(
    query ||
    city !== all ||
    sector !== all ||
    type !== all ||
    risk !== all ||
    readiness !== all ||
    sortBy !== 'recommended'
  );

  function resetFilters() {
    setQuery('');
    setCity(all);
    setSector(all);
    setType(all);
    setRisk(all);
    setReadiness(all);
    setSortBy('recommended');
  }

  return (
    <main className="page">
      <section className="marketplace-hero-v41">
        <div>
          <span className="eyebrow">سوق الفرص</span>
          <h1>فرص تجارية ومشاريع بواجهة منظمة</h1>
          <p>تصفح الفرص حسب المدينة والقطاع ونوع الفرصة، ثم انتقل للتفاصيل أو أرسل اهتمامك مباشرة.</p>
        </div>

        <div className="marketplace-hero-actions-v41">
          <Link className="btn btn-primary" href="/submit-project">أضف مشروعك</Link>
          <Link className="btn btn-secondary" href="/saved">الفرص المحفوظة</Link>
          <Link className="btn btn-secondary" href="/contact">تواصل معنا</Link>
        </div>
      </section>

      <section className="marketplace-stats-v41">
        <div><span>إجمالي الفرص</span><b>{loading ? '...' : stats.total}</b></div>
        <div><span>النتائج الحالية</span><b>{loading ? '...' : stats.visible}</b></div>
        <div><span>قطاعات</span><b>{loading ? '...' : stats.sectorsCount}</b></div>
        <div><span>مدن</span><b>{loading ? '...' : stats.citiesCount}</b></div>
      </section>

      <section className="marketplace-panel-v14 marketplace-panel-v41">
        <div className="marketplace-panel-head">
          <div>
            <h2>ابحث بسرعة</h2>
            <p>استخدم البحث والفلاتر للوصول إلى الفرصة المناسبة.</p>
          </div>
          <button className="btn btn-secondary marketplace-reset-v41" type="button" onClick={resetFilters}>مسح الفلاتر</button>
        </div>

        <div className="marketplace-source-note">
          {source === 'supabase' && 'الفرص الحالية معروضة من قاعدة البيانات.'}
          {source === 'fallback-empty' && 'لا توجد فرص منشورة بعد في قاعدة البيانات، لذلك تظهر بيانات تجريبية مؤقتة.'}
          {source === 'fallback-error' && 'تعذر الاتصال بقاعدة البيانات، لذلك تظهر بيانات تجريبية مؤقتة.'}
          {source === 'fallback' && 'جاري تحميل الفرص...'}
        </div>

        <div className="marketplace-controls-v41">
          <div className="form-field marketplace-search-v41">
            <label>بحث</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث باسم الفرصة، القطاع، المدينة، أو الجاهزية"
            />
          </div>

          <div className="form-field">
            <label>المدينة</label>
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              {cities.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>

          <div className="form-field">
            <label>القطاع</label>
            <select value={sector} onChange={(e) => setSector(e.target.value)}>
              {sectors.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>

          <div className="form-field">
            <label>النوع</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              {types.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>

          <div className="form-field">
            <label>المخاطر</label>
            <select value={risk} onChange={(e) => setRisk(e.target.value)}>
              {risks.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>

          <div className="form-field">
            <label>الجاهزية</label>
            <select value={readiness} onChange={(e) => setReadiness(e.target.value)}>
              {readinessOptions.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>

          <div className="form-field">
            <label>الترتيب</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="recommended">الترتيب الافتراضي</option>
              <option value="newest">الأحدث</option>
              <option value="valueHigh">القيمة الأعلى</option>
              <option value="valueLow">القيمة الأقل</option>
              <option value="sector">حسب القطاع</option>
            </select>
          </div>
        </div>
      </section>

      <div className="marketplace-result-summary-v71">
        <div>
          <b>{filtered.length}</b>
          <span>{filtered.length === 1 ? 'فرصة مطابقة' : 'فرص مطابقة'}</span>
        </div>
        {hasActiveFiltersV71 && (
          <button type="button" className="btn btn-secondary" onClick={resetFilters}>إعادة ضبط الفلاتر</button>
        )}
      </div>

      {filtered.length > 0 ? (
        <section className="marketplace-grid-v41">
          {filtered.map((item) => <OpportunityCard key={item.id || item.slug} item={item} />)}
        </section>
      ) : (
        <section className="marketplace-empty marketplace-empty-v71">
          <span className="eyebrow">لا توجد نتائج مطابقة</span>
          <h3>جرّب توسيع البحث أو إرسال اهتمامك</h3>
          <p>قد تكون الفرصة المطلوبة غير معروضة حاليًا. يمكنك إعادة ضبط الفلاتر أو إرسال اهتمامك لنفهم نوع الفرصة التي تبحث عنها.</p>
          <div className="marketplace-empty-actions-v71">
            <button type="button" className="btn btn-secondary" onClick={resetFilters}>إعادة ضبط الفلاتر</button>
            <Link className="btn btn-primary" href="/contact">أرسل اهتمامك</Link>
          </div>
        </section>
      )}

      <div className="opp-advice-disclaimer-v118 marketplace-disclaimer-v118">
        المعلومات المعروضة أولية ولأغراض التعريف فقط، ولا تُعد توصية استثمارية أو ضمانًا لتحقيق عائد. الفحص المستقل مسؤولية الأطراف قبل أي قرار. <a href="/disclaimer">إخلاء المسؤولية</a>
      </div>
    </main>
  );
}
