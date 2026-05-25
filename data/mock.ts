export const categories = [
  { name: "تقنية", slug: "technology", count: 18 },
  { name: "مطاعم ومقاهي", slug: "restaurants-cafes", count: 12 },
  { name: "تجارة إلكترونية", slug: "ecommerce", count: 21 },
  { name: "صناعة", slug: "manufacturing", count: 9 },
];

export const projects = [
  {
    id: "1",
    slug: "riyadh-cafe",
    title: "مقهى قائم في شمال الرياض",
    category: "مطاعم ومقاهي",
    city: "الرياض",
    type: "بيع كامل",
    stage: "يحقق إيرادات",
    askingPrice: 450000,
    annualRevenue: 780000,
    annualProfit: 180000,
    status: "approved",
    featured: true,
    verified: true,
    views: 138,
    riskLevel: "متوسط",
    growthPotential: "جيد",
    healthScore: 82,
    payback: "2.5 سنة",
    margin: "23%",
    trustFlags: ["بيانات مالية", "صور مرفقة", "مراجعة مبدئية"],
    description:
      "مشروع قائم بتجهيزات كاملة وقاعدة عملاء ثابتة، مناسب لمستثمر يبحث عن أصل تشغيلي جاهز.",
    details:
      "المقهى يعمل في موقع حيوي شمال الرياض ويملك تجهيزات تشغيلية كاملة. توجد فرصة لتحسين الهوية والتوسع عبر تطبيقات التوصيل وزيادة متوسط قيمة الطلب.",
    strengths: ["موقع تشغيلي قائم", "تجهيزات كاملة", "قاعدة عملاء ثابتة"],
    risks: ["اعتماد على الإدارة اليومية", "تأثر بالمنافسة المحلية", "تحتاج مراجعة مالية تفصيلية"],
    includes: ["التجهيزات", "العلامة التشغيلية", "قنوات التوصيل"],
  },
  {
    id: "2",
    slug: "saas-booking-platform",
    title: "منصة SaaS لإدارة المواعيد",
    category: "تقنية",
    city: "جدة",
    type: "استثمار",
    stage: "نموذج أولي",
    askingPrice: 300000,
    annualRevenue: null,
    annualProfit: null,
    status: "approved",
    featured: false,
    verified: false,
    views: 92,
    riskLevel: "مرتفع",
    growthPotential: "مرتفع",
    healthScore: 64,
    payback: "غير محدد",
    margin: "غير محدد",
    trustFlags: ["MVP", "نموذج اشتراك", "مرحلة مبكرة"],
    description:
      "منتج تقني يستهدف العيادات والمراكز الخدمية، مع نموذج اشتراك شهري قابل للتوسع.",
    details:
      "المنصة في مرحلة النموذج الأولي وتحتاج تمويلًا لاستكمال التطوير والتسويق. نموذج الإيرادات المقترح اشتراك شهري للشركات الصغيرة والمتوسطة.",
    strengths: ["نموذج قابل للتوسع", "سوق مستهدف واضح", "إيرادات اشتراك محتملة"],
    risks: ["مرحلة مبكرة", "تحتاج فريق مبيعات", "تحتاج تحقق من الطلب السوقي"],
    includes: ["الكود الأولي", "تصميم المنتج", "خطة تطوير"],
  },
  {
    id: "3",
    slug: "plastic-products-factory",
    title: "مصنع صغير للمنتجات البلاستيكية",
    category: "صناعة",
    city: "الدمام",
    type: "شراكة",
    stage: "قائم ويعمل",
    askingPrice: 1200000,
    annualRevenue: 2160000,
    annualProfit: 420000,
    status: "approved",
    featured: true,
    verified: true,
    views: 212,
    riskLevel: "متوسط",
    growthPotential: "جيد جدًا",
    healthScore: 88,
    payback: "2.9 سنة",
    margin: "19%",
    trustFlags: ["عقود توريد", "أصل تشغيلي", "قابل للتوسع"],
    description:
      "فرصة شراكة تشغيلية في مصنع صغير مع عقود توريد قائمة وفرصة توسع في المنطقة الشرقية.",
    details:
      "المصنع يعمل بطاقة تشغيلية مستقرة ويبحث عن شريك مالي أو تشغيلي للتوسع في خطوط إنتاج إضافية.",
    strengths: ["عقود توريد قائمة", "أصل تشغيلي", "قابلية توسع"],
    risks: ["تكاليف تشغيل", "تقلب أسعار المواد الخام", "حاجة لفحص العقود"],
    includes: ["خط الإنتاج", "قنوات العملاء", "عقود أولية"],
  },
  {
    id: "4",
    slug: "perfume-ecommerce-store",
    title: "متجر إلكتروني متخصص في العطور",
    category: "تجارة إلكترونية",
    city: "الرياض",
    type: "تنازل عن مشروع",
    stage: "مربح",
    askingPrice: 220000,
    annualRevenue: 480000,
    annualProfit: 110000,
    status: "approved",
    featured: false,
    verified: true,
    views: 75,
    riskLevel: "متوسط",
    growthPotential: "جيد",
    healthScore: 76,
    payback: "2 سنة",
    margin: "23%",
    trustFlags: ["قنوات تسويق", "موردون", "تشغيل خفيف"],
    description:
      "متجر قائم مع موردين وقنوات تسويق جاهزة، مناسب لرائد أعمال يرغب في دخول التجارة الإلكترونية بسرعة.",
    details:
      "المتجر يملك موردين حاليين وصفحات تواصل اجتماعي. يحتاج إلى تحسين الإعلانات وتحسين تجربة الشراء.",
    strengths: ["موردون قائمون", "قنوات تسويق", "تشغيل خفيف"],
    risks: ["اعتماد على الإعلانات", "تغير تكلفة الاستحواذ", "حاجة لتحسين العمليات"],
    includes: ["المتجر", "حسابات التواصل", "قائمة الموردين"],
  },
];

export const adminUsers = [
  { id: "u1", name: "أحمد الشهري", email: "ahmad@example.com", role: "admin", city: "الرياض", projects: 2, sent: 4, received: 6 },
  { id: "u2", name: "محمد العتيبي", email: "owner@example.com", role: "owner", city: "جدة", projects: 3, sent: 1, received: 9 },
  { id: "u3", name: "سارة القحطاني", email: "investor@example.com", role: "investor", city: "الدمام", projects: 0, sent: 7, received: 0 },
];

export const reports = [
  { id: "r1", projectTitle: "مقهى قائم في شمال الرياض", reason: "معلومات مضللة أو غير دقيقة", status: "pending", reporter: "مستخدم مسجل" },
  { id: "r2", projectTitle: "متجر إلكتروني متخصص في العطور", reason: "محتوى غير مناسب", status: "reviewed", reporter: "زائر" },
];

export const contactMessages = [
  { id: "m1", name: "عبدالله", email: "abdullah@example.com", subject: "شراكة أو تعاون", status: "new", message: "أرغب بمعرفة إمكانية التعاون مع المنصة." },
  { id: "m2", name: "نورة", email: "nora@example.com", subject: "مشكلة في الحساب", status: "in_progress", message: "لا أستطيع الدخول إلى حسابي." },
];

export const notifications = [
  { id: "n1", title: "تم قبول مشروعك", body: "مشروعك أصبح منشورًا للعامة.", type: "project_approved", read: false },
  { id: "n2", title: "وصلك طلب اهتمام", body: "أرسل مستخدم طلب اهتمام على أحد مشاريعك.", type: "interest_received", read: true },
];

export const users = adminUsers;
export const messages = contactMessages;
