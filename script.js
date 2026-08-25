let reactionCounts = {
    like: [0, 0, 0, 0, 0, 0, 0, 0],
    love: [0, 0, 0, 0, 0, 0, 0, 0],
    fire: [0, 0, 0, 0, 0, 0, 0, 0]
};

function handleReaction(type, index) {
    if (type === 'like') {
        reactionCounts.like[index - 1]++;
        document.getElementById(`count-like${index}`).innerText = reactionCounts.like[index - 1];
    } else if (type === 'love') {
        reactionCounts.love[index - 1]++;
        document.getElementById(`count-love${index}`).innerText = reactionCounts.love[index - 1];
    } else if (type === 'fire') {
        reactionCounts.fire[index - 1]++;
        document.getElementById(`count-fire${index}`).innerText = reactionCounts.fire[index - 1];
    }
}

function sendbooking() {
    const reservationForm = document.querySelector('#reservationForm');
    if (!reservationForm) return;

    const formData = new FormData(reservationForm);
    formData.append('access_key', '8cfbfbf2-9ee0-4244-a228-10ae28099c11');
    formData.append('subject', 'طلب حجز جديد ومؤكد من الموقع');

    fetch('https://web3forms.com', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("تم طلب الحجز بنجاح إلى البريد الإلكتروني وسنتواصل معك فوراً 🎉");
            reservationForm.reset();
        } else {
            alert("حدث خطأ أثناء الإرسال: " + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("حدث خطأ في الشبكة! يرجى التحقق من اتصال الإنترنت.");
    });
}

document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const reviewText = document.getElementById('review').value;
    
    if (reviewText) {
        const reviewList = document.getElementById('reviewList');
        const newReview = document.createElement('div');
        newReview.textContent = reviewText;
        reviewList.appendChild(newReview);
        document.getElementById('review').value = ''; // مسح حقل التقييم
    } else {
        alert("يرجى كتابة تقييم قبل الإرسال.");
    }
});