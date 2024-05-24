var timeout;

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth:true,
  
});

// * first page animation

function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

// * flat mouse

function flatMouse() {
  xscale = 1;
  yscale = 1;

  xprev = 0;
  yprev = 0;
  window.addEventListener("mousemove", function (dets) {
    clearInterval(timeout);
    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);
    xprev = dets.clientX;
    yprev = dets.clientY;
    circleMouseFollower(xscale, yscale);

    timeout = setInterval(() => {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

// * Mouse follow

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}

// * Image rotation
function imageAnimation() {
  document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      });
    });
    elem.addEventListener("mouseleave", function (dets) {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
    });
  });
}

// * Mouse view

let elem = document.querySelectorAll(".elem");
elem.forEach(function (e) {
  let crsr = document.querySelector("#minicircle");
  e.addEventListener("mouseenter", function () {
    crsr.innerHTML = "view";
    crsr.style.width = "80px";
    crsr.style.height = "80px";
    crsr.style.borderRadius = "50%";
    crsr.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    crsr.style.mixBlendMode = "normal";
  });
  e.addEventListener("mouseleave", function () {
    crsr.innerHTML = "";
    crsr.style.width = "12px";
    crsr.style.height = "12px";
    crsr.style.borderRadius = "50%";
    crsr.style.backgroundColor = "white";
    crsr.style.mixBlendMode = "difference";
  });
});

// * Menu animation

function animateMenu() {
  let menu = document.querySelector("#Menu");
  let rightnav = document.querySelector(".right-nav");

  menu.addEventListener("click", function () {
    rightnav.classList.toggle("showNavigation");
    if (rightnav.classList.contains("showNavigation")) {
      menu.style.opacity = ".5";
    } else {
      menu.style.opacity = "1";
    }
  });
}

// *Responsive menu toggle

animateMenu();
function byeminicricle() {
  if (window.innerWidth < 768) {
    document.querySelector("#minicircle").setAttribute("hidden", "true");
  } else {
    document.querySelector("#minicircle").removeAttribute("hidden", "false");
  }
}

// function elemResponsive() {
//   console.log("i am not running");
//   gsap.from(".elem", {
//     y: "-9",
//     opacity: 0,
//     scrollTrigger: {
//       scroller: "#main",
//       trigger: ".elem",
//       starts: "top 100%",
//       end: "top 20%",
//       markers: true,
//       scrub: 1,
//     },
//   });
// }

let dynamicYearly = () => {
  let date = new Date();
  let year = date.getFullYear();
  let changeYear = document.querySelectorAll(".dynamicYears");
  changeYear.forEach((element) => {
    element.innerHTML = year;
    changeYear[3].innerHTML = `${year} &copy;`;
  
  });
};

function responsiveAnimation() {
  var screenActualWidth = window.innerWidth;
  console.log(screenActualWidth);
  if (screenActualWidth > 768) {
    console.log("Window width is greater than 768px");
    imageAnimation();
    circleMouseFollower();
    flatMouse();

  } else {
    console.log("Window width is lesser than 768px");
    //! elemResponsive(); this function is pending
    byeminicricle();
  }
}


dynamicYearly();
firstPageAnim();
responsiveAnimation();
