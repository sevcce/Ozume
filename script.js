const messages = [
    "Sana her baktığımda, içim ısınıyor.",
    "İyi ki geldin. Sessiz olan yanlarımı bile konuşturur hale getirdin.",
    "Bazen bir gülüşünle geçiyor en karanlık günlerim. İyi ki'm kadınım.",
    "Ellerin ellerimdeyken dünya durabilir derdim ama durmak yok. Akalım ruhum.",
    "Ne zaman gözüm gözüne değse, içimden ‘İşte burası, benim evim’ diyorum.",
    "Sana her gün yeniden aşık oluyorum sevgilim. Aynı sana, bin farklı yerden.",
    "Seninle birlikte susmaya da birlikte kavga etmeye de bayılıyorum.",
    "Zor zamanlarda bile sana sarılmak istiyorum. Çünkü iyileştiğim yer kalbin Ruhum.",
    "Sadece sevgilim değil, en yakın arkadaşım, sırdaşım, karım, neşem, huzurum oldun.",
    "Seninle geçen hiçbir anı değiştirmek istemem. Hepsi bendeki en güzel hatıralar.",
    "Sen gülümsediğinde bütün ev aydınlanıyor, yemin ederim elektrik faturasından korkmuyorum artık.",
    "Bugün seni düşündüm. Yarın da düşüneceğim. Muhtemelen öbür gün de. Sistem böyle çalışıyor bende.",
    "Bana gözlerinle ‘iyi ki varsın’ diyorsun ya, işte o bakışla başa sarıyorum her şeyi.",
    "'RUHUM, NERDESİN?'",
    "Ben bizden razıyım sevgilim.",
    "Hayat ortağım. İyi ki'm.",
    "'Ruhum, yolculuğum seninle devam edecek.'",
    "'Seninle dolaşacağım ve ıssızlığına yükseleceğim.'",
    "Selam Yuvam",
    "Home is wherever I'm with you",
    "Oh sevgilim❤️"
    


  ];
  
  function showMessage() {
    const messageBox = document.getElementById("messageBox");
    const randomIndex = Math.floor(Math.random() * messages.length);
    messageBox.textContent = messages[randomIndex];
  
    // Kalp efekti
    createHearts();
  }
  
  function createHearts() {
    const container = document.getElementById("hearts-container");
  
    for (let i = 0; i < 10; i++) {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = "🫂";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = (Math.random() * 2 + 3) + "s";
      heart.style.fontSize = (Math.random() * 10 + 15) + "px";
      container.appendChild(heart);
  
      setTimeout(() => {
        heart.remove();
      }, 4000);
    }
  }

  let startX = null;
let startY = null;

container.addEventListener("touchstart", e => {
  const touch = e.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
});

container.addEventListener("touchmove", e => {
  if (!startX || !startY) return;

  const touch = e.touches[0];
  const diffX = touch.clientX - startX;
  const diffY = touch.clientY - startY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    // yatay swipe
    if (diffX > 0 && direction.x !== -1) direction = { x: 1, y: 0 };
    else if (diffX < 0 && direction.x !== 1) direction = { x: -1, y: 0 };
  } else {
    // dikey swipe
    if (diffY > 0 && direction.y !== -1) direction = { x: 0, y: 1 };
    else if (diffY < 0 && direction.y !== 1) direction = { x: 0, y: -1 };
  }

  
});

container.addEventListener("touchend", () => {
  startX = null;
  startY = null;
});

let gameInterval;
let snake;
let direction;
let food;

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("snake-game-container");
  
  container.addEventListener("touchstart", e => {
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
  });

  container.addEventListener("touchmove", e => {
    if (!startX || !startY) return;

    const touch = e.touches[0];
    const diffX = touch.clientX - startX;
    const diffY = touch.clientY - startY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0 && direction.x !== -1) direction = { x: 1, y: 0 };
      else if (diffX < 0 && direction.x !== 1) direction = { x: -1, y: 0 };
    } else {
      if (diffY > 0 && direction.y !== -1) direction = { x: 0, y: 1 };
      else if (diffY < 0 && direction.y !== 1) direction = { x: 0, y: -1 };
    }
  });

  container.addEventListener("touchend", () => {
    startX = null;
    startY = null;
  });
});


  function openAgaclar() {
    window.open('agaclar.html', '_blank');
  }

  function toggleSnakeGame() {
    window.open("snake.html", "SnakeGame", "width=450,height=500");
  }



  


 