const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const frame = {
  currentIndex: 0,
  maxIndex: 1345,
};

let imagesLoaded = 0;
const images = [];

function preloadImages() {
  for (let i = 1; i <= frame.maxIndex; i++) {
    const imageUrl = `./frames/frame_${i.toString().padStart(4, "0")}.png`;

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      imagesLoaded++;
      if (imagesLoaded === frame.maxIndex) {
        loadImage(frame.currentIndex);
        startAnimation();
      }
    };
    images.push(img);
  }
}

function loadImage(index) {
  if (index >= 0 && index < frame.maxIndex) {
    const img = images[index];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scaleX = canvas.width / img.width;
    const scaleY = canvas.height / img.height;
    const scale = Math.max(scaleX, scaleY);

    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    const offsetX = (canvas.width - newWidth) / 2;
    const offsetY = (canvas.height - newHeight) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
    frame.currentIndex = index;
  }
}

function upadatFrame(index) {
  return {
    currentIndex: index,
    onUpdate: function () {
      loadImage(Math.floor(frame.currentIndex));
    }
  }
}

function startAnimation() {
    
//   gsap.registerPlugin(ScrollTrigger); // Ensure ScrollTrigger is registered

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".canav", // The element that triggers the animation
      scroller: "body",  // The scrolling context (usually body)
      start: "top top",  // When the top of the .canav hits the top of the viewport
      end: "bottom bottom", // When the bottom of the .canav hits the bottom of the viewport
      scrub: 2,           // Smoothness of the animation (lower value for smoother scroll)
    }
  });

  tl
.to(frame, upadatFrame(100),"first")
.to(".animate1", { opacity: 0, ease: "linear" },"first")

.to(frame, upadatFrame(200),"second")
.to(".animate2", { opacity: 1, ease: "linear" },"second")

.to(frame, upadatFrame(230),"third")
.to(".animate2", { opacity: 0, ease: "linear" },"third")

.to(frame, upadatFrame(250),"forth")
.to(".animate3", { opacity: 1, ease: "linear" },"forth")

.to(frame, upadatFrame(630),"fifth")
.to(".animate3", { opacity: 0, ease: "linear" },"fifth")

.to(frame, upadatFrame(700),"sixth")
.to(".animate4", { opacity: 1, ease: "expo", x: "0%" },"sixth")

.to(frame, upadatFrame(760),"seventh")
.to(".animate4", { opacity: 0, ease: "expo" },"seventh")

.to(frame, upadatFrame(850),"eighth")
.to(canvas, { scale: 0.7, ease: "expo" },"eighth")

.to(frame, upadatFrame(850),"eighth")
.to(".animate5", { scale: 0.7, ease: "linear", opacity: 1 },"eighth")

.to(frame, upadatFrame(1000),"nineth")
.to(".animate5", { opacity: 1, ease: "expo" },"nineth")

.to(frame, upadatFrame(1345),"tenth")
.to(canvas, { scale: 1, ease: "expo" },"tenth")

.to(frame, upadatFrame(1345),"tenth")
.to(".animate5", { scale: 1, ease: "expo", opacity: 1 },"tenth")
}

window.addEventListener("resize", () => {
  loadImage(Math.floor(frame.currentIndex));
})

let elem = document.querySelectorAll(".animate6 h3");
elem.forEach((e, i) => {
  gsap.from(e, {
    scrollTrigger: {
      trigger: e,
      start: "top 50%",
      end: "bottom 10%",
      scrub: 2,
    },
    opacity: .3,
  })
})


preloadImages();
