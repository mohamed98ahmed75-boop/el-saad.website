document.getElementById('reservationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('تم الحجز بنجاح!');
});

document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const reviewText = document.getElementById('review').value;
    const reviewList = document.getElementById('reviewList');
    const newReview = document.createElement('p');
    newReview.textContent = reviewText;
    reviewList.appendChild(newReview);
    document.getElementById('review').value = '';
});

// 1. دالة التحكم بالتفاعلات وزيادة العدادات
function handleReaction(reactionType, cardId) {
    // تحديد المعرف الخاص بالعداد (مثال: count-like1)
    const elementId = "count-" + reactionType + cardId;
    
    // جلب عنصر الـ span من الصفحة
    const counterElement = document.getElementById(elementId);
    
    // التأكد من وجود العنصر أولاً لتجنب الأخطاء
    if (counterElement) {
        // تحويل النص الحالي إلى رقم زائر
        let currentCount = parseInt(counterElement.innerText) || 0;
        
        // زيادة العداد بمقدار 1
        currentCount++;
        
        // تحديث النص داخل العنصر بالرقم الجديد
        counterElement.innerText = currentCount;
    } else {
        console.error("العنصر ذو المعرف " + elementId + " غير موجود في الصفحة.");
    }

    // تأثير بصري عند الضغط على الزر
    if (event && event.target) {
        const button = event.target;
        button.style.transform = "scale(1.2)";
        setTimeout(function() {
            button.style.transform = "none";
        }, 150);
    }
}

// 2. دالة إرسال نموذج التقييمات
const reviewForm = document.getElementById('reviewForm');
if (reviewForm) {
    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const reviewText = document.getElementById('review').value;
        const reviewList = document.getElementById('reviewList');
        
        if (reviewText && reviewList) {
            const newReview = document.createElement('p');
            newReview.textContent = reviewText;
            reviewList.appendChild(newReview);
            document.getElementById('review').value = '';
        }
    });
}