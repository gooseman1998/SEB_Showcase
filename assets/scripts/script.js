window.onload = function() {
  colorChange();
  showGifOnHover();
  svgLine();
  shapeImagesOnScrollInit();
  blocksInit();
  textSliderinit();
  panelsInit();
};




function colorChange() {

   gsap.to('.color-change', {
      scrollTrigger: {
          trigger:".color-change",
          toggleActions: "restart resume restart resume",
          start:"top",
          end: "bottom",
          onEnter: changeColor,
          onLeave: changeColor,
          onEnterBack: changeColor,
          onLeaveBack: changeColor,
      },
  });
}

function changeColor() {
    let hoverSections = document.querySelectorAll('.text-hover');

    hoverSections.forEach((section) => {
        section.classList.toggle('text-hover--dark');
    });
}

  
function showGifOnHover() {

  const ball = document.querySelector(".mouse-follower");
  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const mouse = { x: pos.x, y: pos.y };
  const speed = 0.12;

  const xSet = gsap.quickSetter(ball, "x", "px");
  const ySet = gsap.quickSetter(ball, "y", "px");

  window.addEventListener("mousemove", e => {    
    mouse.x = e.x;
    mouse.y = e.y;  
  });

  // text hover show image/gif

  let hoverWrapper =  document.querySelectorAll(".text-hover__wrapper");
  let hoverGif  =  document.querySelectorAll(".text-hover__gif");

  var image = new Image();
  image.src = "./assets/images/gif/trains.gif";

  hoverWrapper.forEach((wrapper) => {
    wrapper.addEventListener("mouseover", () => {
        let gif = wrapper.querySelector(".text-hover__gif");
        gif.classList.add("text-hover__gif--active");
        gif.setAttribute('src', image.src);
    });

    
    wrapper.addEventListener("mouseout", () => {
        gif = wrapper.querySelector(".text-hover__gif");
        gif.classList.remove("text-hover__gif--active");
    });
  });

  gsap.ticker.add(() => {

      // adjust speed for higher refresh monitors
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio()); 
      
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSet(pos.x);
      ySet(pos.y);

      hoverGif.forEach((gif) => {
          const xSetCircle = gsap.quickSetter(gif, "x", "px");
          const ySetCircle = gsap.quickSetter(gif, "y", "px");

          xSetCircle(pos.x - (gif.offsetWidth / 2));
          ySetCircle(pos.y - (gif.offsetHeight / 2));
      });
  });
}

function svgLine() {
  const svgPaths = document.querySelectorAll('.pin-svg__path');
  const svgShips = document.querySelectorAll('.pin-svg__ship');
  let index = 0;

  svgPaths.forEach(path => {
      gsap.to(svgShips[index], {
          duration: 5,

          ease: "none",
          immediateRender: true,

          scrollTrigger: {
              trigger: svgPaths[index],
              start: "top top",
              end: 'bottom bottom',
              scrub: 5,
              // markers: true,
          },
          motionPath: {
              path: svgPaths[index],
              align: svgPaths[index],
              // autoRotate: false,
              // autoRotate: true,
              autoRotate: 90,
          }
      }); 
      index++;
  });
}

function shapeImagesOnScrollInit() {
  let intensity = gsap.utils.clamp(-5,5 ); //Set intensity of curve, the higher, the more curve
  let hasScrolled = false;

  let imgs = document.querySelectorAll('.following-images__img--vertical');
  let coordinationsPositive = [ [50, 5.5], [62.5, 5], [75, 4.1], [87.5, 2.5], [100, 0], [100, 94.5], [87.5, 97], [75, 98.6], [62.5, 99.5], [50, 100], [37.5, 99.5], [25, 98.6], [12.5, 97], [0, 94.5], [0, 0], [12.5, 2.5], [25, 4.1], [37.5, 5] ];
  let coordinationsNegative = [ [50, 0], [62.5, .5], [75, 1.4], [87.5, 3], [100, 5.5], [100, 100], [87.5, 97.5], [75, 95.9], [62.5, 95], [50, 94.5], [37.5, 95], [25, 95.9], [12.5, 97.5], [0, 100], [0, 5.5], [12.5, 3], [25, 1.4], [37.5, .5] ];
  let coordinationsNeutral = "polygon(50% 0%, 62.5% 0%, 75% 0%, 87.5% 0%, 100% 0%, 100% 100%, 87.5% 100%, 75% 100%, 62.5% 100%, 50% 100%, 37.5% 100%, 25% 100%, 12.5% 100%, 0% 100%, 0% 0%, 12.5% 0%, 25% 0%, 37.5% 0%)";

  ShapeImagesOnScroll(imgs, intensity, coordinationsPositive, coordinationsNegative, coordinationsNeutral);
    
  let imgsH = document.querySelectorAll('.following-images__img--horizontal');
  let coordinationsPositiveH = [ [5.5, 0],[3, 12.5],[1.4, 25],[.5, 37.5],[0, 50],[.5, 62.5],[1.4, 75],[3, 87.5],[5.5, 100],[100, 100],[97.5, 87.5],[95.9, 75],[95, 62.5],[94.5, 50],[95, 37.5],[95.9, 25],[97.5, 12.5],[100, 0] ];
  let coordinationsNegativeH = [ [0, 0],[2.5, 12.5],[4.1, 25],[5, 37.5],[5.5, 50],[5, 62.5],[4.1, 75],[2.5, 87.5],[0, 100],[94.5, 100],[97, 87.5],[98.6, 75],[99.5, 62.5],[100, 50],[99.5, 37.5],[98.6, 25],[97, 12.5],[94.5, 0] ];
  let coordinationsNeutralH = "polygon(0% 0%, 0% 12.5%, 0% 25%, 0% 37.5%, 0% 50%, 0% 62.5%, 0% 75%, 0% 87.5%, 0% 100%, 100% 100%, 100% 87.5%, 100% 75%, 100% 62.5%, 100% 50%, 100% 37.5%, 100% 25%, 100% 12.5%, 100% 0%)";

  ShapeImagesOnScroll(imgsH, intensity, coordinationsPositiveH, coordinationsNegativeH, coordinationsNeutralH, 'horizontal');
}
        
function ShapeImagesOnScroll(imgSection, intensity, shapePositive, shapeNegative, shapeNeutral, direction = "vertical") {
  console.log(direction);
  ScrollTrigger.create({
    onUpdate: (self) => {
      let velocity = intensity(self.getVelocity() / -300);
      
      if (velocity >= 1) {
        gsap.from(imgSection, {
          clipPath: fillMatrix(shapePositive, velocity, direction)
        });
      } else if (velocity < 0) {
        gsap.from(imgSection, {
          clipPath: fillMatrix(shapeNegative, Math.abs(velocity), direction)
        });
      } else { 
        gsap.to(imgSection, {
          clipPath: shapeNeutral
        });
      }
      gsap.to(imgSection, {
        clipPath: shapeNeutral
      });

    }
  });
}

function fillMatrix(matrix, intensity, direction) {
  intensity = (intensity*20) / 100;
  polygon ="";

  for (i = 0; i <= matrix.length -1; i++) {
    if(i == 0) polygon += "polygon(";

    if (direction == "vertical") percentage = matrix[i][1];
    else percentage = matrix[i][0];
    
    if (percentage > 50) {
      dif = 100 - percentage;
      newPercentage = ( dif - ((dif * intensity) *.6));
      percentage += newPercentage ;  
    }
    else percentage = (percentage * intensity) * .6;

    if (direction == "vertical") {
      polygon += matrix[i][0] + "% ";
      polygon += percentage + "%";
    } else {
      polygon += percentage + "% ";
      polygon += matrix[i][1] + "%";
    }

    if (!(i == (matrix.length-1))) polygon += ", ";
    else polygon += ")";
  }
  
  return polygon;
}


function blocksInit() {
  
    gsap.from('.blocks__square', {
      scrollTrigger: {
          trigger:".blocks",
          toggleActions: "restart resume restart resume",
      },
      duration:2,
      opacity:0,
      y:"random(-550, 550)",
      stagger:.3
  });

}

function textSliderinit() {
  gsap.set('.slider-text',{xPercent:-50})
    
    let boxes = document.querySelectorAll(".slider-text__box"),
        boxWidth = 1800,
        totalWidth = boxWidth * 3,  // * n of boxes 
        time = 11,
        // dirFromLeft = "+=" + totalWidth ,
        dirFromRight = "-=" + totalWidth;
    
    gsap.set(boxes, {
      x:function(i) {
        return i * boxWidth;
      }
    });

    let mod = gsap.utils.wrap(0, totalWidth);

    gsap.to(boxes, {
      x: dirFromRight, //set slider direction (to left = dirFromRight / to right = dirFromLeft)
      duration:time, 
      ease:'none',
      repeat:-1,
      modifiers: {
        x: x => mod(parseFloat(x)) + "px"
      },
    });
}

function panelsInit() {
  
  let sections = gsap.utils.toArray(".panel");

  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".panels",
      pin: true,
      start:"center center",
      scrub: 1,
      snap: 1 / (sections.length - 1),
      end: "+=4000", //slider speed
    }
  });

}