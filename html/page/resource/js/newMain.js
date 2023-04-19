
    // 검색
    $('.m_visual_search li').click(function(){
      var search = $(this).attr('data-tab');
      $('.m_visual_search li').removeClass('active');
      $(this).addClass('active');
        $('.m_search_cont').removeClass('active');
      $('.m_search_cont[data-tab='+search+']').addClass('active');
  });
    // 정책정보
    $('.m_policy .m_policy_btn li').click(function(){
      var policy = $(this).attr('data-tab');
      $('.m_policy .m_policy_btn li').removeClass('active');
      $(this).addClass('active');
      $('.m_policy .m_policy_cont').removeClass('active');
      $('.m_policy .m_policy_cont[data-tab='+policy+']').addClass('active');
  });
    // 채용중인 탐나는 기업
    $('.m_employ .m_employ_btn01 li').click(function(){
      var employ = $(this).attr('data-tab');
      $('.m_employ .m_employ_btn01 li').removeClass('active');
      $(this).addClass('active');
      $('.m_employ .m_employ_items01').removeClass('active');
      $('.m_employ .m_employ_items01[data-tab='+employ+']').addClass('active');
  });
    // 채용정보
    $('.m_employ .m_employ_btn02 li').click(function(){
      var employ = $(this).attr('data-tab');
      $('.m_employ .m_employ_btn02 li').removeClass('active');
      $(this).addClass('active');
      $('.m_employ .m_employ_items02').removeClass('active');
      $('.m_employ .m_employ_items02[data-tab='+employ+']').addClass('active');
  });
    // 아주 유용한 꿀팁
    $('.m_useful .m_useful_btn li').click(function(){
      var useful = $(this).attr('data-tab');
      $('.m_useful .m_useful_btn li').removeClass('active');
      $(this).addClass('active');
      $('.m_useful .m_useful_cont').removeClass('active');
      $('.m_useful .m_useful_cont[data-tab='+useful+']').addClass('active');
  });
    // 정책정보 슬라이드
    var $slider = $('.m_policy_cont');
    $slider.find('.m_policy_slide').each(function(i){
        var $this = $(this);
        $this.siblings().addClass("type" + i);
        var policySwiper = new Swiper($(this), {
            slidesPerView: 2.5,
            spaceBetween: 8,
            observer: true,
            observeParents: true,        
            loop: true,
            navigation: {
                nextEl: $('.type' + i).find('.swiper-button-next'),
                prevEl: $('.type' + i).find('.swiper-button-prev'),
            },
            breakpoints: {
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                860: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 2,
                    
                },
            },
        });
    });
    
    var noticeSwiper = new Swiper(".m_notice_slide", {
        initialSlide: -1, 
        slidesPerView: 1,
        direction: "vertical",
        loop:true,
        navigation: {
            nextEl: ".m_notice_wrap .swiper-button-next",
            prevEl: ".m_notice_wrap .swiper-button-prev",
        },
        autoplay:{
            delay: 5000,
            disableOnInteraction: false,
        },
    });
    // 메인 배너 슬라이드
    var bannerSwiper = new Swiper('.m_slider', {
        spaceBetween: 10,
        slidesPerView: 1.5,
        centeredSlides: true,
        loop: true,
        autoHeight: true,
        pagination: {
        el: ".swiper-pagination",
        },
        autoplay:{
            delay: 5000,
            disableOnInteraction: false,
        },
        onSlideChangeEnd:function(e){
            bannerSwiper.update();
        },
        breakpoints: {
            860: {
                slidesPerView: 'auto',
                spaceBetween: 0,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
        }
    });
    
    // 채용공고 슬라이드
    var $slider = $('.m_employ_items01');
    $slider.find('.m_employ_slide').each(function(){
        var employSwiper = new Swiper($(this), {
            spaceBetween: 8,
            slidesPerView: 2.5,
            touchRatio: 1,
            observer: true,
            loop: true,
            observeParents: true,
            breakpoints: {
            768: {
                slidesPerView: 2,
                touchRatio: 0,
                spaceBetween: 20,
            },
        },
        });
    });
    
    // 러닝센터 슬라이드
    var eduSwiper = new Swiper(".m_edu_slide", {
        slidesPerView: 1,
        spaceBetween: 15,
        loop: true,
        navigation: {
            nextEl: ".m_educenter .swiper-button-next",
            prevEl: ".m_educenter .swiper-button-prev",
        },
        breakpoints: {
            1024: {
                slidesPerView: 3,
            },
            860: {
                slidesPerView: 2,
            },
        },
    });
    
    // 모바일
    function pcMenu() {
  
    }
    function mobileMenu() {
        $('.h_mobile').toggleClass('show'); 
    }
    $('.h_mobile_close').click(function(){
    $('.h_mobile').removeClass('show');
  });
    $('.m_policy_more').click(function(){
        $(this).toggleClass('active');
  });
    $('.m_policy_btn ul li').click(function(){
        $('.m_policy_more').removeClass('active');
  });
