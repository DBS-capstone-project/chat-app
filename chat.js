// Ambil elemen-elemen yang diperlukan
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');
const themeToggle = document.getElementById('theme-toggle');

// Fungsi untuk mendapatkan waktu saat ini dalam format HH:mm
function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

// Fungsi untuk menambahkan pesan ke chat body
function addMessage(message, isOutgoing) {
  // Buat elemen div untuk pesan
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', isOutgoing ? 'outgoing' : 'incoming');

  // Buat elemen untuk konten pesan
  const messageContent = document.createElement('div');
  messageContent.classList.add('message-content');

  // Jika pesan adalah balasan dari lawan bicara, ubah menjadi suku kata
  if (!isOutgoing) {
    message = splitIntoSyllables(message);
  }
  messageContent.textContent = message;

  // Buat elemen untuk waktu
  const messageTime = document.createElement('div');
  messageTime.classList.add('message-time');
  messageTime.textContent = getCurrentTime();

  // Tambahkan konten dan waktu ke pesan
  messageDiv.appendChild(messageContent);
  messageDiv.appendChild(messageTime);

  // Tambahkan pesan ke chat body
  chatBody.appendChild(messageDiv);

  // Scroll ke bawah agar pesan terbaru selalu terlihat
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Fungsi untuk memecah kata menjadi suku kata
function splitIntoSyllables(text) {
  return text.split('').join(' '); // Pisahkan setiap karakter dengan spasi
}

// Event listener untuk tombol kirim
sendButton.addEventListener('click', () => {
  const message = chatInput.value.trim(); // Ambil pesan dari input
  if (message !== '') {
    addMessage(message, true); // Tambahkan pesan sebagai pesan keluar
    setTimeout(() => {
      const reply = message; // Balasan sesuai dengan pesan yang dikirim
      addMessage(reply, false); // Tambahkan balasan sebagai pesan masuk
    }, 1000); // Simulasi delay balasan
    chatInput.value = ''; // Kosongkan input setelah pesan dikirim
  }
});

// Event listener untuk tombol Enter pada keyboard
chatInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    sendButton.click(); // Trigger tombol kirim saat menekan Enter
  }
});

// Toggle Dark Mode / Light Mode
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});