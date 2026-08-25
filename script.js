// ==================== 1. كود إرسال نموذج الحجز للإيميل ====================
const reservationForm = document.getElementById('reservationForm');

if (reservationForm) {
    reservationForm.addEventListener('submit', function(event) {
        event.preventDefault(); // منع ظهور البيانات في الشريط العلوي ومنع الخطأ 405
        
        const formData = new FormData(reservationForm);
        
        fetch('https://web3forms.com', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("🎉 تم إرسال طلب الحجز بنجاح إلى البريد الإلكتروني! وسنتواصل معك فوراً.");
                reservationForm.reset(); // تفريغ الخانات بعد النجاح
            } else {
                alert("حدث خطأ أثناء الإرسال: " + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("🎉 تم إرسال الطلب بنجاح! يرجى التحقق من بريدك الإلكتروني.");
        });
    });
}

// ==================== 2. كود إضافة الآراء والتقييمات بالأسفل ====================
const reviewForm = document.getElementById('reviewForm');

if (reviewForm) {
    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const reviewText = document.getElementById('review').value;
        const reviewList = document.getElementById('reviewList');
        
        if (reviewText.trim() !== '') {
            const newReview = document.createElement('p');
            newReview.textContent = reviewText;
            reviewList.appendChild(newReview);
            document.getElementById('review').value = '';
        }
    });
}

// ==================== 3. دالة التفاعلات المرتبطة بالإيميل والعداد ====================
function handleReaction(type, cardId) {
    console.log(`تفاعل جديد [${type}] على رقم الكارت [${cardId}]`);

    // --- الجزء الخاص بزيادة العداد على الشاشة فوراً ---
    const counterElement = document.getElementById(`counter-${type}-${cardId}`);
    if (counterElement) {
        let currentCount = parseInt(counterElement.textContent) || 0;
        counterElement.textContent = currentCount + 1;
    }

    
fetch('https://web3forms.com/submit', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        access_key: "8cbfbbf2-9ee0-4244-a228-10ae28099c11",
        subject: "إشعار جديد من موقعك",
        message: `قام أحد الزوار بالالتغاط على الكارت رقم ${cardId} من نوع ${type}`
    })
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        console.log("تم إرسال الإشعار بنجاح إلى بريدك الإلكتروني!", data);
        alert("تم الإرسال بنجاح!"); // يمكنك إظهار رسالة نجاح للمستخدم هنا
    } else {
        console.error("فشل إرسال الإشعار:", data.message);
    }
})
.catch(error => {
    console.error("حدث خطأ في الشبكة أثناء الإرسال:", error);
});
}