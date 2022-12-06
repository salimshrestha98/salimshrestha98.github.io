$(document).ready(function() {

    function animateSkills() {
        var skillLines = document.querySelectorAll(".skill-line");
        var skillLevels = ["80%","85%","70%","82%","84%"];
        for( var i = 0; i < skillLines.length; i++) {
            $(skillLines[i]).animate({"width": skillLevels[i] },3000);
        }
    }


    var zoomables = $(".zoomable");
    var offsets = new Array;
    var originalHeight = $('html').height();

    for(var i = 0; i< zoomables.length; i++) {
        self = $(zoomables[i]);
        offsets.push(self.offset().top);
    }
  
    $('html').height(originalHeight);

    var contactFormShownBefore = false;
    var metricsAnimated = false;
    
    window.onscroll = function() {
        var currentOffset = window.pageYOffset + 300;
        for(var i=0;i<zoomables.length;i++) {
            var self = $(zoomables[i]);
            if ( offsets[i] < currentOffset) {
                if(zoomables[i].id == "skills") {
                    animateSkills();
                } 
                self.addClass("animate__zoomIn");
                self.css("opacity",1);      
            }
        }

        if( currentOffset > originalHeight - window.innerHeight  && !contactFormShownBefore ) {
            // setTimeout( startContactPopup, 10000);         
        }

        if( currentOffset - 100 > $('#experience').offset().top  && !metricsAnimated ) {
            animateMetrics(); 
            metricsAnimated = true;
            console.log('metrics animated!');       
        }
    }  

    function startContactPopup() {
        $('body').css('overflow-y','hidden');
        $('#contact-popup-container').css('display','block');
        $('#contact-popup-container').animate({"opacity": 1}, 800);
        shownBefore = true;
    }

    $('.fa-times').click(function() {
        $('#contact-popup-container').animate({"opacity": 0}, 800);
        setTimeout( function() {
            $('#contact-popup-container').css('display','none');
            $('body').css('overflow-y','auto');
        },800);
    });

    $('#header-btn-2').click(function() {
        startContactPopup();
    });

    $('.startContactPopup').click(function() {
        startContactPopup();

        console.log('start contact popup!');
    });

    function animateMetrics() {
        var metricsArray = [5,2,500];
        $('.metric-value span').each(function (i) {
            var $this = $(this);
            jQuery({ Counter: 0 }).animate({ Counter: metricsArray[i] }, {
              duration: 2000,
              easing: 'swing',
              step: function () {
                $this.text(Math.ceil(this.Counter));
              }
            });
          });
    }

});