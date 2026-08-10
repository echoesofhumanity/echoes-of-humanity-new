// Çoklu Dil (i18n) Yönetimi
async function loadLanguage(lang) {
    try {
        const response = await fetch(`assets/i18n/${lang}.json`);
        if (!response.ok) throw new Error('Dil dosyası yüklenemedi');
        const translations = await response.json();
        
        // data-i18n özniteliğine sahip tüm elementleri güncelle
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const keys = element.getAttribute('data-i18n').split('.');
            let value = translations;
            
            keys.forEach(key => {
                if (value) value = value[key];
            });
            
            if (value) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = value;
                } else {
                    element.innerHTML = value;
                }
            }
        });
        
        localStorage.setItem('selectedLanguage', lang);
    } catch (error) {
        console.error('Dil yüklenirken hata oluştu:', error);
    }
}

// Sayfa yüklendiğinde tercih edilen dili uygula
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    loadLanguage(savedLang);
});
// Küre menüsünü açıp kapama fonksiyonu
function toggleLanguageMenu() {
    const menu = document.getElementById('languageMenu');
    if (menu) {
        menu.classList.toggle('show');
    }
}

// Sayfanın herhangi bir boş yerine tıklandığında açık olan dil menüsünü kapatma
window.addEventListener('click', function(e) {
    if (!e.target.closest('.language-dropdown-container')) {
        const menu = document.getElementById('languageMenu');
        if (menu && menu.classList.contains('show')) {
            menu.classList.remove('show');
        }
    }
});

// Dil değiştirme fonksiyonu
function changeLanguage(lang) {
    if (typeof loadLanguage === 'function') {
        loadLanguage(lang);
    }
    toggleLanguageMenu();
}
// Çeviri sözlüğü (İleride yeni diller ve metinler buraya eklenebilir)
const translations = {
    en: {
        "nav.home": "Home",
        "nav.about": "About",
        "nav.vision": "Vision",
        "nav.mission": "Mission",
        "nav.humanitarian": "Humanitarian Action",
        "nav.manifesto": "Manifesto",
        "nav.projects": "Projects",
        "nav.volunteers": "Volunteers",
        "nav.academy": "Academy",
        "nav.marketplace": "Marketplace",
        "nav.merchandise": "Merchandise",
        "nav.media": "Media",
        "nav.partners": "Partners",
        "nav.contact": "Contact"
    },
    tr: {
        "nav.home": "Ana Sayfa",
        "nav.about": "Hakkımızda",
        "nav.vision": "Vizyon",
        "nav.mission": "Misyon",
        "nav.humanitarian": "İnsani Eylem",
        "nav.manifesto": "Manifesto",
        "nav.projects": "Projeler",
        "nav.volunteers": "Gönüllüler",
        "nav.academy": "Akademi",
        "nav.marketplace": "Paryer / Pazar",
        "nav.merchandise": "Mağaza",
        "nav.media": "Medya",
        "nav.partners": "Ortaklar",
        "nav.contact": "İletişim"
    }
};

// Dil değiştirme ana fonksiyonu
function loadLanguage(lang) {
    // Seçilen dili tarayıcı hafızasına (localStorage) kaydedelim ki sayfa yenilense de bozulmasın
    localStorage.setItem('selectedLanguage', lang);
    
    // Sayfadaki data-i18n özniteliğine sahip tüm elementleri bul ve metinlerini güncelle
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Sayfa yüklendiğinde hafızadaki dili aktif etme
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    loadLanguage(savedLang);
});
                                           
