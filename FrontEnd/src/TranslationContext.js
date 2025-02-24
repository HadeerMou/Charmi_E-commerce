import React, { createContext, useState, useContext } from "react";

// Translation data
const translations = {
  en: {
    //header
    search: "What are you looking for?",
    home: "Home",
    products: "Products",
    about: "About",
    contact: "Contact Us",
    //products
    sf: "Sofas",
    bd: "Beds",
    td: "Tables & desks",
    wd: "Wardrobes",
    dn: "Dining furniture",
    cc: "Cabinets & cupboards",
    bt: "bedside tables",
    bs: "Bookcases & shelving units",
    //home
    title: "Welcome to Charmi Egypt",
    designTitle: "Bedrooms",
    showmore: "Show more",
    //footer
    contInfo: "Contact Info",
    qlinks: "Quick Links",
    follow: "Follow Us",
    //about
    abtit: "About Us",
    chtitle: "Charmi",
    chparagraph:
      "Charmi was founded in 2003, and since then we have been striving to achieve excellence in the home wooden furniture industry. We believe in the quality of design and fine craftsmanship that is reflected in every piece of furniture we offer. Our company offers a variety of products that include furniture for living rooms, bedrooms, kitchens, tables, chairs, and more. What distinguishes our products is the optimal use of natural wood, and unique designs that suit all tastes. We are committed to innovation and high quality, and we always strive to meet the needs and expectations of our customers. Over the years, our company has achieved many achievements and certifications that reflect our commitment to quality and excellence in the furniture industry. We are proud to be a part of our customers' lives, and we promise to continue to provide the best products and services that enhance the beauty and comfort of their homes.",
    vision: "Our vision",
    visioncont:
      "Charmi was founded in 2003, and since then we have been striving to achieve excellence in the home wooden furniture industry. We believe in the quality of design and fine craftsmanship that is reflected in every piece of furniture we offer. Our vision is to bring the beauty of nature into our customers' homes by providing distinctive and elegant wooden furniture. Our company offers a variety of products that include furniture for living rooms, bedrooms, kitchens, tables, chairs, and more. What distinguishes our products is the optimal use of natural wood, and unique designs that suit all tastes. We are committed to innovation and high quality, and we always strive to meet the needs and expectations of our customers. Over the years, our company has achieved many achievements and certifications that reflect our commitment to quality and excellence in the furniture industry. We are proud to be a part of our customers' lives, and we promise to continue to provide the best products and services that enhance the beauty and comfort of their homes.",
    choose: "Why choose us",
    choosecont:
      "What distinguishes our products is the optimal use of natural wood,and unique designs that suit all tastes. We are committed to innovation and high quality, and we always strive to meet the needs and expectations of our customers.",
    //contact
    conthead: "Do you need any help? please don't hesitate to reach out.",
    face: "facebook",
    insta: "instagram",
    youtube: "Youtube",
    question:
      "A Question, or any help needed? Contact us and we will be happy to help you.",
    contactemail: "Contact us with email",
    commentbtn: "Comment",
    formtitle:
      "Please share with us your opinion about your experience with CHARMI. Or any comment you want.",
    sendbtn: "Send",
    //productView
    addtocart: "Add to cart",
    relatedname: "Related Products",
    recommendedname: "Recommended for you",
    //profile
    welcome: "Hey, Welcome Back",
    personalinfo: "Personal information",
    billing: "Billing & Payments",
    ordersname: "Orders",
    username: "Username",
    number: "Phone Number",
    password: "Password",
    changpass: "Change Password",
    address: "Address",
    //dashboard sidebar
    dashboardname: "Dashboard",
    customersname: "Customers",
    productsname: "Products",
    ordersname: "Orders",
    analyticsname: "Analytics",
    messagesname: "Messages",
    logoutname: "Log out",
    adminname: "Admins",
    //dashboard
    dashtitle: "Dashboard",
    totalsales: "Total Sales",
    time: "Last 24 hours",
    totalexpanses: "Total Expenses",
    totalincome: "Total Income",
    recentorders: "Recent Orders",
    prodname: "Product Name",
    prodnum: "Product Number",
    pay: "Payment",
    status: "Status",
    pending: "Pending",
    showall: "Show All",
    recentupdates: "Recent Updates",
    salesanalytics: "Sales Analytics",
    onlineorders: "ONLINE ORDERS",
    offlineorders: "OFFLINE ORDERS",
    newcustomer: " NEW CUSTOMERS",
    addprod: "Add Product",
    //dasboard customers
    cutomerstitle: "Customers",
    name: "Name",
    email: "Email",
    orderno: "Order No",
    userid: "User ID",
    //dashboard orders
    neworders: "New Orders",
    onprogress: "On Progress",
    readyorders: "Ready Orders",
    cancelledorders: "Cancelled Orders",
    new: "New",
    price: "Price",
    showmore: "Show more",
    totalpayment: "Total Payments",
    orderdetail: "Order Details",
    //dashboard messages
    allmessages: "All Messages",
    //dashboard products
    select: "Select",
    pn: "Pn",
    categoryname: "Category",
    stock: "Stock",
    sold: "Sold",
    price: "Price",
    action: "Actions",
    previous: "Previous",
    next: "Next",
    //dashboard chat
    send: "Send",
    // dashboard admins
    adminid: "Admin ID",
    createdAt: "Created At",
    deletedAt: "Deleted At",
    adminRole: "Admin Role",
    delete: "Delete",
    createAdmin: "Create new Admin",
  },
  ar: {
    //header
    search: "ما الذى تبحث عنه؟",
    home: "الصفحة الرئيسية",
    products: "منتجاتنا",
    about: "معلومات عنا",
    contact: "تواصل معنا",
    //products
    sf: "الأرائك",
    bd: "أسرة",
    td: "الطاولات والمكاتب",
    wd: "خزائن الملابس",
    dn: "أثاث الطعام",
    cc: "الخزائن والدواليب",
    bt: "طاولات بجانب السرير",
    bs: "مكتبات ووحدات رفوف",
    //home
    title: "مرحباً بكم في شارمي مصر",
    designTitle: "غرف النوم",
    more: "عرض المزيد",
    //footer
    contInfo: "معلومات الاتصال",
    qlinks: "روابط سريعة",
    follow: "تابعنا",
    //about
    abtit: "معلومات عنا",
    chtitle: "شارمي",
    chparagraph:
      "تأسست شركة شارمي عام 2003 ومنذ ذلك الحين ونحن نسعى لتحقيق التميز في صناعة الأثاث الخشبي المنزلي. نؤمن بجودة التصميم والحرفية الدقيقة التي تنعكس في كل قطعة أثاث نقدمها. تقدم شركتنا مجموعة متنوعة من المنتجات التي تشمل أثاث غرف المعيشة وغرف النوم والمطابخ والطاولات والكراسي والمزيد. ما يميز منتجاتنا هو الاستخدام الأمثل للخشب الطبيعي، والتصميمات الفريدة التي تناسب جميع الأذواق. نحن ملتزمون بالابتكار والجودة العالية، ونسعى دائمًا لتلبية احتياجات وتوقعات عملائنا. على مر السنين، حققت شركتنا العديد من الإنجازات والشهادات التي تعكس التزامنا بالجودة والتميز في صناعة الأثاث. نحن فخورون بأن نكون جزءًا من حياة عملائنا، ونعد بمواصلة تقديم أفضل المنتجات والخدمات التي تعزز جمال وراحة منازلهم.",
    vision: "رؤيتنا",
    visioncont:
      "تأسست شركة شارمي عام 2003 ومنذ ذلك الحين ونحن نسعى لتحقيق التميز في صناعة الأثاث الخشبي المنزلي. نؤمن بجودة التصميم والحرفية الدقيقة التي تنعكس في كل قطعة أثاث نقدمها. رؤيتنا هي جلب جمال الطبيعة إلى منازل عملائنا من خلال توفير أثاث خشبي مميز وأنيق. تقدم شركتنا مجموعة متنوعة من المنتجات التي تشمل أثاث غرف المعيشة وغرف النوم والمطابخ والطاولات والكراسي والمزيد. ما يميز منتجاتنا هو الاستخدام الأمثل للخشب الطبيعي، والتصميمات الفريدة التي تناسب جميع الأذواق. نحن ملتزمون بالابتكار والجودة العالية، ونسعى دائمًا لتلبية احتياجات وتوقعات عملائنا. على مر السنين، حققت شركتنا العديد من الإنجازات والشهادات التي تعكس التزامنا بالجودة والتميز في صناعة الأثاث. نحن فخورون بأن نكون جزءًا من حياة عملائنا، ونعد بمواصلة تقديم أفضل المنتجات والخدمات التي تعزز جمال وراحة منازلهم.",
    choose: "لماذا تختارنا",
    choosecont:
      "ما يميز منتجاتنا هو الاستخدام الأمثل للخشب الطبيعي والتصميمات الفريدة التي تناسب كافة الأذواق، نحن ملتزمون بالإبداع والجودة العالية ونسعى دائماً لتلبية احتياجات وتوقعات عملائنا.",
    //contact
    conthead: "هل تحتاج إلى أي مساعدة؟ من فضلك لا تتردد في التواصل معنا.",
    face: "فيسبوك",
    insta: "انستجرام",
    youtube: "يوتيوب",
    question:
      "هل لديك سؤال أو تحتاج إلى أي مساعدة؟ اتصل بنا وسنكون سعداء بمساعدتك.",
    contactemail: "اتصل بنا عبر البريد الإلكتروني",
    commentbtn: "تعليق",
    formtitle: "شاركنا برأيك حول تجربتك مع شارمي أو أي تعليق تريده.",
    sendbtn: "أرسل",
    //productView
    addtocart: "أضف إلى السلة",
    relatedname: "المنتجات ذات الصلة",
    recommendedname: "موصى به لك",
    //profile
    welcome: "مرحباً بك مرة أخرى",
    personalinfo: "المعلومات الشخصية",
    billing: "الفواتير والدفعات",
    ordersname: "الطلبات",
    username: "اسم المستخدم",
    number: "رقم التليفون",
    password: "كلمة المرور",
    changpass: "تغيير كلمة المرور",
    address: "عنوان",
    //dashboard sidebar
    dashboardname: "لوحة القيادة",
    customersname: "عملاء",
    productsname: "المنتجات",
    ordersname: "طلبات",
    analyticsname: "التحليلات",
    messagesname: "رسائل",
    logoutname: "تسجيل الخروج",
    adminname: "المشرفين",
    //dashboard
    dashtitle: "لوحة القيادة",
    totalsales: "إجمالي المبيعات",
    time: "آخر 24 ساعة",
    totalexpanses: "إجمالي النفقات",
    totalincome: "إجمالي الدخل",
    recentorders: "الطلبات الأخيرة",
    prodname: "اسم المنتج",
    prodnum: "رقم المنتج",
    pay: "الدفع",
    status: "حالة",
    pending: "قيد الانتظار",
    showall: "إظهار الكل",
    recentupdates: "التحديثات الأخيرة",
    salesanalytics: "تحليلات المبيعات",
    onlineorders: "الطلبات عبر الإنترنت",
    offlineorders: "الطلبات غير المتصلة بالإنترنت",
    newcustomer: "العملاء الجدد",
    addprod: "إضافة المنتج",
    //dasboard customers
    cutomerstitle: "العملاء",
    name: "الاسم",
    email: "ايميل",
    orderno: "رقم الطلب",
    userid: "رقم المستخدم",
    //dashboard orders
    neworders: "الطلبات الجديدة",
    onprogress: "في التقدم",
    readyorders: "الطلبات الجاهزة",
    cancelledorders: "الطلبات الملغاة",
    new: "جديد",
    showmore: "عرض المزيد",
    totalpayment: "مجموع المدفوعات",
    orderdetail: "تفاصيل الطلب",
    //dashboard messages
    allmessages: "كل الرسائل",
    //dashboard products
    select: "اختار",
    categoryname: "الفئة",
    stock: "مخزون",
    sold: "مُباع",
    price: "السعر",
    action: "الإجراءات",
    previous: "السابق",
    next: "التالي",
    //dashboard chat
    send: "أرسل",
    //dashboard admins
    adminid: "رقم المشرف",
    createdAt: "تم الإنشاء في",
    deletedAt: "تم الحذف في",
    adminRole: "دور المشرف",
    delete: "حذف",
    createAdmin: "إنشاء مشرف جديد",
  },
};

// Create TranslationContext
const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const savedLanguage = localStorage.getItem("language") || "en";

  const [language, setLanguage] = useState(savedLanguage); // Default language is English
  // Load the saved language from localStorage or default to English

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage); // Save to localStorage
  };

  return (
    <TranslationContext.Provider
      value={{ translations: translations[language], changeLanguage }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook to access the translations and change language
export const useTranslation = () => useContext(TranslationContext);
