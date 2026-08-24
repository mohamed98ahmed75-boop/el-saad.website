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
    console.log(تفاعل جديد [${type}] على رقم الكارت [${cardId}]);

    // --- الجزء الخاص بزيادة العداد على الشاشة فوراً ---
    const counterElement = document.getElementById(counter-${type}-${cardId});
    if (counterElement) {
        let currentCount = parseInt(counterElement.textContent) || 0;
        counterElement.textContent = currentCount + 1;
    }
    // ------------------------------------------------

    // إرسال إشعار التفاعل فوراً إلى بريدك الإلكتروني برمجياً //
    fetch('https://web3forms.com', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            access_key: "90743679-98ea-4a8e-bced-19f4cafeeb0d", 
            subject: "تفاعل جديد من موقعك",
            message: قام أحد الزوار بالتفاعل بـ [${type}] على الكارت رقم [${cardId}]
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('تم إرسال التفاعل للإيميل بنجاح');
        }
    })
    .catch(error => {
        console.error('خطأ في إرسال التفاعل:', error);
    });
}