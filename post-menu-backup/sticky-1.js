(function() {
  var sticky = {
    init: function(element) {
      this.element = element;
      this.childElement = element.children[0];
      
      this.options = {
        classNames: {
          isSticky: 'sticky'
        }
      };
      
      this.setEvents();

      this.onResize();
    },
    
    setEvents: function() {
      var _this = this;

      window.addEventListener('scroll', function() {
        _this.onScroll();
      }, false);
      
      window.addEventListener('resize', this.onResize, false);
    },
    
    onScroll: function() {
      if (window.pageYOffset > (this.element.getBoundingClientRect().top + window.pageYOffset)) {
        this.element.classList.add(this.options.classNames.isSticky);
      } else {
        this.element.classList.remove(this.options.classNames.isSticky);
      }
    },
    
    onResize: function () {
      var _this = this;
 
      setTimeout(function () {
        _this.element.style.height = 'auto'; // Reset height to 'auto' so we can get the true height below

        _this.element.style.height = _this.childElement.offsetHeight + 'px';
      }, 500);
    }
  };
  
  sticky.init(document.querySelector('.content-sticky'));
})();
