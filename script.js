

// 1. إعدادات الاتصال بقاعدة بيانات Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAMstotLC9qpsq-OfHkaSpEibhE4xzGt_g",
    authDomain: "al-saad-cooking-establishment.firebaseapp.com",
    databaseURL: "https://al-saad-cooking-establishment-default-rtdb.firebaseio.com",
    projectId: "al-saad-cooking-establishment",
    storageBucket: "al-saad-cooking-establishment.firebasestorage.app",
    messagingSenderId: "1094372596337",
    appId: "1:1094372596337:web:7f89dc1ae7344e221f59d0",
    measurementId: "G-0J78XY0P0G"
};

// 2. تفعيل الاتصال بـ Firebase وقاعدة البيانات
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

window.handleReaction=function (type, id) {
    // تركيب الـ id ليتطابق مع المكتوب في الـ HTML (مثال: count-like8 أو count-love7)
    // تحويل نوع التفاعل إلى حروف صغيرة (.toLowerCase) ليتوافق مع تسمياتك
    const elementId = `count-${type.toLowerCase()}${id}`;
    
    // جلب عنصر العداد من الصفحة
    const countElement = document.getElementById(elementId);
    
    if (countElement) {
        // قراءة الرقم الحالي وتحويله بأمان إلى عدد صحيح
        let currentCount = parseInt(countElement.innerText) || 0;
        
        // زيادة العداد بمقدار 1
        currentCount++;
        
        // تحديث الرقم الظاهر في الصفحة
        countElement.innerText = currentCount;
    } else {
        console.error(`لم يتم العثور على عنصر بالمعرف: ${elementId}`);
    }
}
// تشغيل دالة الجلب تلقائياً عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", loadReactions);

// 4. دالة إدارة التفاعلات وإرسالها لقاعدة البيانات عند الضغط على الأزرار
function handleReaction(type, id) {
    const elementId = `count-${type.toLowerCase()}${id}`;
    const countElement = document.getElementById(elementId);
    
    if (countElement) {
        let currentCount = parseInt(countElement.innerText) || 0;
        let newCount = currentCount + 1;
        database.ref('reactions/' + elementId).set(newCount);
    } else {
        console.error(`لم يتم العثور على عنصر بالمعرف: ${elementId}`);
    }
}