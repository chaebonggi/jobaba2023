

    function handleTabClick($btn, $items, tabAttr) {
        $btn.click(function() {
          var tab = $(this).attr(tabAttr);
          $btn.removeClass('active');
          $(this).addClass('active');
          $items.removeClass('active');
          $items.filter('[data-tab="' + tab + '"]').addClass('active');
        });
      }
      //정책/채용
      handleTabClick($('.m_visual_search li'), $('.m_visual_search li'), 'data-tab');
      // 정책정보
      handleTabClick($('.m_policy .m_policy_btn li'), $('.m_policy .m_policy_cont'), 'data-tab');      
      // 채용중인 탐나는 기업
      handleTabClick($('.m_employ .m_employ_btn01 li'), $('.m_employ .m_employ_items01'), 'data-tab');      
      // 채용정보
      handleTabClick($('.m_employ .m_employ_btn02 li'), $('.m_employ .m_employ_items02'), 'data-tab');      
      // 아주 유용한 꿀팁
      handleTabClick($('.m_useful .m_useful_btn li'), $('.m_useful .m_useful_cont'), 'data-tab');
    
      //정책채용
      
        $('.m_search_cont li').click(function() {
          var selectedTab = $(this).data('tab');
          if (selectedTab === 'search01') {
            $('.m_search_cont .tit').html('관심있는 <strong>지원정책</strong>을 찾아보세요');
          } else if (selectedTab === 'search02') {
            $('.m_search_cont .tit').html('관심있는 <strong>채용정보</strong>를 찾아보세요');
          }
        });




    // 공지사항 슬라이드
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
     
      // 메인 슬라이드
      var bannerSwiper = new Swiper(".m_slider", {
          slidesPerView: 1.5,
          spaceBetween: 10,
          centeredSlides: true,
          preventClicks:true,
          observer: true,
          observeParents: true,
          loop:true, 
          autoplay:{
              delay: 5000,
              disableOnInteraction: false,
          },
          pagination: {
              el: ".swiper-pagination",
              clickable: true,
          }, 
          on: {
            init: function () {
              $('.m_slider .swiper-slide').addClass('changed');
            },
            slideChangeTransitionStart : function() {
              $('.m_slider .swiper-slide').addClass('changing');
              $('.m_slider .swiper-slide').removeClass('changed');
            },
            slideChangeTransitionEnd : function() {
              $('.m_slider .swiper-slide').removeClass('changing');
              $('.m_slider .swiper-slide').addClass('changed');
            }
          },
          breakpoints: {
              859: {
                  slidesPerView: 'auto',
                  spaceBetween: 0,
              },
              640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
              },
          },
      });
  
      const RESIZE_DELAY = 300;
      let resizeTimer = null;
  
      function handleResize() {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
              if (window.innerWidth > 860) {
                  const slides = document.querySelectorAll('#newMain .m_slide_banner .swiper-slide');
                  slides.forEach((slide) => {
                      slide.style.width = '275px';
                  });
                  bannerSwiper.update();
              }
          }, RESIZE_DELAY);
      }
  
      window.addEventListener('resize', handleResize);
  
       // 정책정보 슬라이드
       var $slider = $('.m_policy_cont');
       $slider.find('.m_policy_slide').each(function(i){
           var $this = $(this);
           $this.siblings().addClass("type" + i);
           var policySwiper = new Swiper($(this), {
               slidesPerView: 1.5,
               spaceBetween: 8,
               observer: true,
               observeParents: true,        
               loop: true,
               breakpoints: {
                   1024: {
                       slidesPerView: 5,
                       spaceBetween: 10,
                   },
                   860: {
                       slidesPerView: 3,
                   },
                   768: {
                       slidesPerView: 2,
                       
                   },
                   460: {
                    slidesPerView: 2.5,
                    spaceBetween: 8,                    
                },
               },
           });
       });
      
      
      // 탐나는기업 슬라이드
      var $slider = $('.m_employ_items01');
      $slider.find('.m_employ_slide').each(function(){
          var employSwiper = new Swiper($(this), {
            spaceBetween: 8,              
            slidesPerView: 1.5,
            observer: true,
            observeParents: true,
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    slidesPerColumn: 2,
                    spaceBetween: 20,
                    touchRatio: 0,
                    slidesPerColumnFill: "row",
                },
                460: {
                    slidesPerView: 2.5,
                    spaceBetween: 8,
                    slidesPerColumnFill: "column",
                    slidesPerColumn: 1,
                    touchRatio: 1,
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

      
      // gnb menu
      function allMenu() {
        if(window.innerWidth < 860) {
            $('.h_mobile').toggleClass('show');
        } else {
            $('.h_gnb_bg').stop().slideToggle(300);
            $('.h_gnb_bg').mouseleave(function () {
                $('.h_gnb_bg').stop().slideUp(300);
            });
        }
      }
      if(window.innerWidth > 860) {
        $('.h_gnb').on('mouseenter focusin', function() {
            $('.h_gnb_bg').stop().slideDown(300);
        });
        $('.h_gnb_menu').mouseleave(function () {
            $('.h_gnb_bg').stop().slideUp(300);
        });
        $('.h_gnb_menu').find('a').last().on('focusout' ,function () {
            $('.h_gnb_bg').stop().slideUp(300);
        });
      }

    $('.h_mobile_close').click(function(){
      $('.h_mobile').removeClass('show');
    });
    $('.m_policy_btn ul li').click(function(){
        $('.m_policy_more').removeClass('active');
    });
    
    // tag 메뉴
    $('.m_tag_btn').click(function () {
        $(this).parent().toggleClass('active');
    });
    //footer 메뉴
    $('.footer_btn').click(function () {
        $(this).toggleClass('active');
        var footerWrap = $('.footer_wrap');
        
        footerWrap.slideToggle(300, function() {
            if (footerWrap.is(':visible')) {
                // Scroll to the bottom of the screen
                $('html, body').animate({scrollTop: $(document).height()}, 300);
            }
        });
    });

    // 로고 랜덤 생성
    const logoImages = document.querySelectorAll('h1.logo img');
    logoImages.forEach((image) => {
        let randomNumber = Math.floor(Math.random() * 8) + 1;
        image.setAttribute('src', `./images/main/logo_0${randomNumber}.png`);
    });
    // 구직등록 로그인 팝업
    $(".newResume").on('click', function(e){
        var login = false;
        var entUsr = false;

        if(login) {
            if(entUsr){
                alertLayerPopup("알림","개인회원 전용 서비스입니다.");
                return false;
            }else{
                location.href = "https://www.jobaba.net/mber/myPage/resume/jbhntRegForm.do";
            }
        } else {
            loginLayerPopup("알림", "로그인후 이용 하여 주세요.");
        }
    });
    //채용등록 로그인 팝업
    $(".newEnt").on('click', function(e){
        var login = false;
        var entUsr = false;

        if(login) {
            if(!entUsr){
                alertLayerPopup("알림","기업회원 전용 서비스입니다.");
                return false;
            }else{
                location.href = "https://www.jobaba.net/empmn/entEmpmn/rgst.do";
            }
        } else {
            loginLayerPopup("알림", "로그인후 이용 하여 주세요.");
        }
    });

    // 헤더 fixed
    // var $newHeader = $('#newHeader');
    // var gnbOffsetTop = $newHeader.offset().top;

    // $(window).scroll(function() {
    //     var scrollTop = $(this).scrollTop();

    //     if (scrollTop > gnbOffsetTop) {
    //         $newHeader.addClass('fixed_gnb');
    //     } else {
    //         $newHeader.removeClass('fixed_gnb');
    //     }
    // });