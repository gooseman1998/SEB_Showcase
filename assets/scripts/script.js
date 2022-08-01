window.onload = function() {
  colorChange();
  showGifOnHover();
  svgLine();
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