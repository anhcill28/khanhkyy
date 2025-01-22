// Tạo mảng các mệnh giá với tỷ lệ được phân bổ
let moneyPool = createMoneyPool();
let openedCount = 0; // Số lần đã mở phong bao
let totalAmount = 0; // Tổng số tiền đã nhận được

function createMoneyPool() {
    let pool = [];
    pool.push(...Array(5).fill(200000)); // 5% cho 200k
    pool.push(...Array(30).fill(100000)); // 15% cho 100k
    pool.push(...Array(30).fill(50000)); // 15% cho 50k
    pool.push(...Array(10).fill(20000)); // 10% cho 20k
    pool.push(...Array(15).fill(10000)); // 15% cho 10k
    pool.push(...Array(10).fill(5000));  // 10% cho 5k
    pool.push(...Array(10).fill(2000));  // 10% cho 2k
    pool.push(...Array(5).fill(1000));   // 5% cho 1k
    return shuffleArray(pool);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function openLiXi(element) {
    // Kiểm tra nếu phong bao đã được mở hoặc đã mở 3 lần
    if (element.classList.contains("opened") || openedCount >= 3) return;

    // Lấy số tiền ngẫu nhiên từ pool
    const amount = moneyPool.pop();
    totalAmount += amount; // Cộng số tiền vào tổng
    element.classList.add("opened");
    openedCount++;

    // Hiển thị số tiền ngay tại ô
    element.innerHTML = `<span class="amount">${amount.toLocaleString()} VND</span>`;

    // Thêm hiệu ứng chúc mừng
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    element.appendChild(confetti);
    setTimeout(() => {
        confetti.remove();
    }, 1000);

    // Kiểm tra nếu đã mở 3 lần
    if (openedCount === 3) {
        setTimeout(() => alert(`Bạn đã mở tối đa 3 phong bao! Tổng số tiền bạn nhận được là ${totalAmount.toLocaleString()} VND.`), 500);
    }

    // Kiểm tra nếu đã hết phong bao
    if (moneyPool.length === 0) {
        setTimeout(() => alert("Tất cả phong bao đã được mở!"), 500);
    }
}

function resetGame() {
    // Reset trạng thái tất cả phong bao
    const envelopes = document.querySelectorAll(".lixi");
    envelopes.forEach(envelope => {
        envelope.classList.remove("opened");
        envelope.innerHTML = ""; // Xóa nội dung hiển thị số tiền
    });

    // Tạo lại pool tiền và reset số lần mở
    moneyPool = createMoneyPool();
    openedCount = 0;
    totalAmount = 0; // Reset tổng số tiền
}
