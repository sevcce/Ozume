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

  

  function openSnakeGame() {
    const isMobile = window.innerWidth <= 768;
    const w = isMobile ? Math.min(window.innerWidth - 20, 500) : 800;
    const h = isMobile ? w + 50 : 850;
  
    window.open("snake.html", "SnakeGame", `width=${w},height=${h},resizable=yes`);
  }
  

  

  document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".photo-carousel");
    const track = document.querySelector(".carousel-track");

    if (carousel && track) {
      carousel.addEventListener("touchstart", () => {
        track.classList.add("paused");
      });

      carousel.addEventListener("touchend", () => {
        track.classList.remove("paused");
      });

      // Masaüstü desteği de istersen:
      carousel.addEventListener("mouseenter", () => {
        track.classList.add("paused");
      });
      carousel.addEventListener("mouseleave", () => {
        track.classList.remove("paused");
      });
    }
  });

  
  


  

  


 