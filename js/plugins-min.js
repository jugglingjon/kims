!function(){for(var n,t=function(){},i=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"],e=i.length,a=window.console=window.console||{};e--;)n=i[e],a[n]||(a[n]=t)}(),$.fn.animateOut=function(n,t){var i="webkitAnimationEnd";return n=n?n:"fadeOut",this.one(i,function(){$(this).hide(),$(this).removeClass(n+" animated"),t&&t.call(this)}),this.addClass("animated "+n),this},$.fn.animateIn=function(n,t){var i="webkitAnimationEnd";return n=n?n:"fadeIn",this.one(i,function(){$(this).removeClass(n+" animated"),t&&t.call(this)}),this.addClass("animated "+n).show(),this},$.fn.cascadeOut=function(n,t,i,e){var a=this.length-1,o=t;return this.each(function(t){var s=$(this);setTimeout(function(){e&&t===a?s.animateOut(n,e):s.animateOut(n)},o),o+=o-i}),this},$.fn.cascadeIn=function(n,t,i,e){var a=this.length-1,o=t;return this.each(function(t){var s=$(this);setTimeout(function(){e&&t===a?s.animateIn(n,e):s.animateIn(n)},o),o+=o-i}),this};