// This code is released under WTFPL Version 2 (http://www.wtfpl.net/)
function Smoothy(instance) {
  if (!Smoothy.getInstance) {
    Smoothy.getInstance = function() {
      return instance;
    };
    (instance = new Smoothy).init();
    delete this.init;
  };
  
  this.init = function() {
		smoothy.attachEvent(window, "load", smoothy.load);
	};
	this.speed = function(s) {
		if (!s) return smoothy.speed;
		if (!isNaN(s)) smoothy.speed = s;
	};

  var smoothy = {
		speed: 15,
		offsetParent: function(d, o) {
			d && (o = d.offsetTop);
			while (d = d.offsetParent) {
				o += d.offsetTop;
			}
			return o;
		},
		scrollTop: function(b, d) {
			b = document.body;
			d = document.documentElement;
			if (b && b.scrollTop) {
				return b.scrollTop;
			}
			if (d && d.scrollTop) {
				return d.scrollTop;
			}
			if (window.pageYOffset) {
				return window.pageYOffset;
			}
			return 0;
		},
		attachEvent: function(a, b, d) {
			if (a.addEventListener) {
				return a.addEventListener(b, d, false);
			}
			else {
				if (a.attachEvent) {
					return a.attachEvent("on" + b, d);
				} else {
					var originalHandler = a["on" + b];
					if (originalHandler)
						target["on" + b] = function(e) { originalHandler.call(a, e); d.call(a, e); };
					else
						a[eventName] = d;
				}
			}
		},
		end: function(e) {
			var v = window.event;
			if (v) {
				v.cancelBubble = !(v.returnValue = false);
			} else {
				if (e.preventDefault && e.stopPropagation) {
					e.preventDefault();
					e.stopPropagation();
				}
			}
		},
		scroll: function(d) {
			var i = window.innerHeight || document.documentElement.clientHeight,
				h = document.body.scrollHeight,
				a = this.scrollTop();
			if (d > a) {
				if (h - d > i) {
					a += Math.ceil((d - a) / this.speed);
				} else {
					a += Math.ceil((d - a - (h - d)) / this.speed);
				}
			} else {
				a = a + (d - a) / this.speed;
			}
			window.scrollTo(0, a);
			if (a === d || this.offsetTop === a) {
				clearInterval(this.interval);
			}
			this.offsetTop = a;
		},
		load: function() {
			var a = document.getElementsByTagName("a");
			smoothy.end(this);
			for (var i = 0, aa, lp; i < a.length; i++) {
				if (/\bsmoothy-scroll\b/.test((aa = a[i]).className || "") || !!aa.getAttribute("data-smoothy-scroll")) {
					lp = location.pathname;
					if (aa.href && aa.href.indexOf("#") > -1 && (aa.pathname === lp || "/" + aa.pathname === lp)) {
						//aa.onclick
						smoothy.attachEvent(aa, "click", function() {
							smoothy.end(this);
							var a = document.getElementById(this.hash.substr(1));
							if (a) {
								clearInterval(smoothy.interval);
								smoothy.interval = setInterval(function() { smoothy.scroll(smoothy.offsetParent(a)); }, 15);
							}
						});
					}
				}
			}
		}
	};
}(new Smoothy);