$(document).ready(function() {
    var flexOptions = {
        parentSelector: '.section.active',
        verticalOffset: 0,
        onAttribute: 'top'
    };
    var loaded = 0;

    function changeColors(delay){
        var delay = delay || 1500
        var $section = $('.active.section');
        var bg = $section.css('background-color');
        var $slide = $section.find('.slide.active');
        if($slide.length>0){
            bg = $slide.css('background-color');
        }
        $('header, aside ul').animate({
            'background-color': bg
        }, delay);
    }

    setTimeout(function() {
        $('body').imagesLoaded()
                .progress(function(il, i) {
            if (i.isLoaded) {
                loaded++;
                var percentage = Math.round(loaded / il.images.length * 100);
                $('.loading-title').text(percentage + '% Loaded..');
            }
            else {
                console.log('Failed to load ' + i.img.src);
            }
        })
                .always(function() {
            $('body').removeClass('loading');

            $('#fullpage').fullpage({
                animateAnchor: false,
                slidesColor: ['#33B8F1', '#36D7B7', '#4ad', 'rgb(103, 88, 155)'],
                anchors: ['about', 'skills', 'works', 'contact'],
                menu: 'header ul, aside ul',
                slidesNavigation: true,
                verticalCentered: false,
                resize: false,
                loopBottom: true,
                loopHorizontal: true,
                afterResize: function() {
                    $('.section.active .vc').flexVerticalCenter(flexOptions);
                },
                afterLoad: function(a, i) {
                    switch (a) {
                        case 'about':
                            $('.tech-logos').removeClass('visible');
                            $('.profile-picture').removeClass('visible');
                            break;
                        case 'skills':
                            $('.tech-logos').addClass('visible');
                            $('.profile-picture').removeClass('visible');
                            setTimeout(function() {
                                $('.tech-logos').toggleClass('flat');
                            }, 1800);
                            break;
                        case 'works':
                            $('.tech-logos').removeClass('visible');
                            $('.profile-picture').removeClass('visible');
                            break;
                        case 'contact':
                            $('.tech-logos').removeClass('visible');
                            $('.profile-picture').addClass('visible');
                            break;
                    }
                },
                onLeave: function(a, i) {
                    $('.section.active .vc').flexVerticalCenter(flexOptions);
                    $('aside ul').removeClass('visible');

                    changeColors();
                },
                onSlideLeave: function() {
                    $('.slide.active .screenshot').removeClass('front-face');
                    $('.visuals').removeClass('zoom');
                    $('aside ul').removeClass('visible');
                },
                afterSlideLoad: function() {
                    $('.slide.active .screenshot').addClass('front-face');

                    changeColors(400);
                }
//        ,css3: true
            });

            $('.tech-logo').click(function() {
                $('.tech-logos').toggleClass('flat');
            });

            $('aside ul').click(function(){
                $(this).removeClass('visible');
            });

            $('#toggle').click(function() {
                $('aside ul').toggleClass('visible');
            });

            $('.more span').click($.fn.fullpage.moveSectionDown);

            $('.screenshot').click(function() {
                $('.slide.active .visuals').toggleClass('zoom');
            });

            $('.section.active .vc').flexVerticalCenter(flexOptions);
            changeColors();
        });
    }, 1500);
});