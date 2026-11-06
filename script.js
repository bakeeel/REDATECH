// قائمة المنتجات المعروضة بالمتجر ومقسمة حسب الفئات المطلوبة
const products = [
    // أجهزة الكمبيوتر
    {
        id: 1,
        title: "كمبيوتر مكتبي RedaTech Pro PC",
        category: "desktops",
        description: "معالج Intel i7، ذاكرة RAM 16GB، قرص SSD 512GB مخصص للأعمال الثقيلة والمكاتب.",
        price: 2899,
        image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=500&q=80"
    },
    {
        id: 2,
        title: "تجميعة كمبيوتر قيمنق Gaming Master",
        category: "desktops",
        description: "معالج Ryzen 7، كرت شاشة RTX 4060، رام 32GB مع إضاءة RGB وتبريد مائي.",
        price: 4499,
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&q=80"
    },
    // أجهزة اللابتوبات
    {
        id: 3,
        title: "لابتوب أعمال UltraBook 14",
        category: "laptops",
        description: "شاشة 14 بوصة FHD، معالج عالي الكفاءة وبطارية تدوم طويلاً بوزن خفيف للغاية.",
        price: 3199,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80"
    },
    {
        id: 4,
        title: "لابتوب ألعاب RedaTech Gaming Pro",
        category: "laptops",
        description: "شاشة 15.6 بوصة 144Hz، كرت شاشة مخصص للألعاب والتصميم الهندسي الثقيل.",
        price: 3999,
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80"
    },
    // الجوالات والإكسسوارات
    {
        id: 5,
        title: "هاتف ذكي SmartPhone X 5G",
        category: "phones",
        description: "شاشة AMOLED 120Hz، كاميرا بدقة 108MP، مساحة تخزين 256GB يدعم الشحن السريع.",
        price: 2199,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80"
    },
    {
        id: 6,
        title: "ساعة ذكية متكاملة Smart Watch Pro",
        category: "phones",
        description: "متابعة الأنشطة الرياضية والمؤشرات الحيوية مع مقاومة كاملة للماء واتصال بلوتوث.",
        price: 349,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"
    },
    // الشبكات
    {
        id: 7,
        title: "راوتر 5G منزلي عالي السرعة",
        category: "networking",
        description: "يدعم أحدث تقنيات الاتصال اللاسلكي Wi-Fi 6 وتغطية فائقة السرعة للمنازل والمكاتب.",
        price: 599,
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&q=80"
    },
    {
        id: 8,
        title: "كاميرا مراقبة ذكية خارجية",
        category: "networking",
        description: "دقة 4K FHD مع رؤية ليلية ملونة، استشعار ذكي للحركة، ومقاومة لمختلف الظروف الجوية.",
        price: 249,
        image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=500&q=80"
    }
];

let cart = [];

// عرض قائمة المنتجات مع تحديد الحاويات المستهدفة
function renderProducts(itemsToRender = products, containerId = 'products-container') {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (itemsToRender.length === 0) {
        container.innerHTML = '<p style="text-align:center; grid-column: 1/-1; color:#64748b; padding: 30px;">لا توجد منتجات متاحة في هذا القسم حالياً.</p>';
        return;
    }

    container.innerHTML = itemsToRender.map(product => `
        <div class="product-card">
            <div class="product-img-wrapper">
                <span class="stock-badge">متوفر</span>
                <img src="${product.image}" alt="${product.title}" class="product-img" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-bottom">
                    <span class="product-price">${product.price} ر.س</span>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">
                        <i class="fa-solid fa-cart-plus"></i> إضافة
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// دالة تصفية المنتجات حسب الفئة (في صفحة المتجر)
function filterCategory(cat, btnElement) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(b => b.classList.remove('active'));
    
    const activeBtn = btnElement || (typeof event !== 'undefined' && event.target);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    if (cat === 'all') {
        renderProducts(products, 'all-products-container');
    } else {
        const filtered = products.filter(p => p.category === cat);
        renderProducts(filtered, 'all-products-container');
    }
}

// إضافة منتج للسلة
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existingIndex = cart.findIndex(item => item.id === id);

    if (existingIndex > -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    updateCartUI();
    toggleCart(true);
}

// تحديث الواجهة للسلة
function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    if (!cartCount) return;

    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
    cartCount.innerText = totalItems;

    if (cart.length === 0) {
        if (cartContainer) {
            cartContainer.innerHTML = '<div style="text-align:center; padding: 40px 0; color:#64748b;"><i class="fa-solid fa-basket-shopping" style="font-size:2.5rem; margin-bottom:10px;"></i><p>السلة فارغة حالياً</p></div>';
        }
        if (cartTotal) cartTotal.innerText = '0.00 ر.س';
        return;
    }

    if (cartContainer) {
        cartContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <div class="cart-item-title">${item.title}</div>
                    <small style="color:#64748b;">${item.price} ر.س × ${item.qty}</small>
                </div>
                <div style="text-align: left;">
                    <div class="cart-item-price">${item.price * item.qty} ر.س</div>
                    <button onclick="removeFromCart(${item.id})" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:0.8rem; margin-top:4px;">حذف</button>
                </div>
            </div>
        `).join('');
    }

    const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    if (cartTotal) cartTotal.innerText = `${total.toFixed(2)} ر.س`;
}

// حذف عنصر من السلة
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

// فتح وإغلاق السلة
function toggleCart(forceOpen = false) {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    if (!sidebar) return;
    
    if (forceOpen) {
        sidebar.classList.add('active');
        if (overlay) overlay.classList.add('active');
    } else {
        sidebar.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active');
    }
}

// التحكم بقائمة الموبايل الجانبية بشكل جذري ومضمون
function toggleMobileMenu(forceClose = false) {
    const navLinks = document.getElementById('nav-links');
    const overlay = document.getElementById('mobile-nav-overlay');
    
    if (!navLinks) return;

    if (forceClose) {
        navLinks.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        return;
    }

    const isOpen = navLinks.classList.toggle('active');
    if (overlay) {
        overlay.classList.toggle('active', isOpen);
    }
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
}

// إتمام الطلب وتحويله للواتساب
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert('السلة فارغة حالياً!');
        return;
    }

    const phone = "966546634675";
    let message = "مرحباً متجر رضا تك، أرغب في تأكيد الطلب التالي:\n\n";

    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.title}\n   الكمية: ${item.qty} | السعر: ${item.price * item.qty} ر.س\n`;
    });

    const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    message += `\n*الإجمالي الكلي:* ${total.toFixed(2)} ر.س`;
    message += `\n\nيرجى تزويدي بتفاصيل الشحن والدفع.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
}

// التشغيل التلقائي عند تحميل أي صفحة
document.addEventListener('DOMContentLoaded', () => {
    // إذا كانت الصفحة تحتوي على حاوية المنتجات المميزة (الصفحة الرئيسية)
    if (document.getElementById('products-container')) {
        renderProducts(products.slice(0, 4), 'products-container');
    }
    if (document.getElementById('featured-products-container')) {
        renderProducts(products.slice(0, 4), 'featured-products-container');
    }

    // إذا كانت الصفحة صفحة المتجر الشاملة (shop.html)
    if (document.getElementById('all-products-container')) {
        const urlParams = new URLSearchParams(window.location.search);
        const cat = urlParams.get('category');
        if (cat) {
            const filtered = products.filter(p => p.category === cat);
            renderProducts(filtered, 'all-products-container');
            
            // تحديد الزر النشط في الفلتر إن وجد
            const targetBtn = document.querySelector(`[onclick*="filterCategory('${cat}')"]`);
            if (targetBtn) {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                targetBtn.classList.add('active');
            }
        } else {
            renderProducts(products, 'all-products-container');
        }
    }

    // إغلاق قائمة الموبايل تلقائياً عند النقر على أي رابط بداخلها
    document.querySelectorAll('#nav-links a').forEach(link => {
        link.addEventListener('click', () => toggleMobileMenu(true));
    });
    
    updateCartUI();
});
