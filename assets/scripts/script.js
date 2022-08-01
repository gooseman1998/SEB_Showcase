window.onload = function() {
  colorChange();
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

  function changeColor() {
      let hoverSections = document.querySelectorAll('.text-hover');

      hoverSections.forEach((section) => {
          section.classList.toggle('text-hover--dark');
      });
  }
}