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

