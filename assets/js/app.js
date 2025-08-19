
$(window).scroll(animateNumbers);
var viewed = false;

var viewed_subscribe = false;
var viewed_text = false;

// window.onscroll = function() {
//     animateTestimonial()
//     animateSubscribe()
//     // animateTextRows()
// }

var width = window.innerWidth;

var documentHasScroll = function() {
    return window.innerHeight <= document.body.offsetHeight;
};




window.addEventListener('scroll', function (e) {
    var headernavbar = document.getElementById("headernavbar");
    if (window.scrollY > headernavbar.offsetHeight){
        var headerNavbarNav = document.querySelector('#headerNavbarNav')
        headernavbar.classList.add('scrolled');
    }else{
        headernavbar.classList.remove('scrolled');
    }

});
//
// function animateTestimonial(){
//     var el = $(".testimonial h3");
//     if (isScrolledIntoView(el) && !viewed) {
//         viewed = true;
//         animateHeadingWords(el);
//     }
// }
//
// function animateSubscribe(){
//     var el = $(".subscriber h1");
//     if (isScrolledIntoView(el) && !viewed_subscribe) {
//         viewed_subscribe = true;
//         animateSubtitleWords(el, 0.8);
//     }
// }
//
// function animateSubscribe(){
//     var el = $(".subscriber h1");
//     if (isScrolledIntoView(el) && !viewed_subscribe) {
//         viewed_subscribe = true;
//         animateTextRowsSmooth();
//     }
// }


function elementScrolled(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    if($(elem).offset()){
        var elemTop = $(elem).offset().top;
        return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
    }

}

$(document).ready(function() {
    // $("nav").removeClass("no-transition");
	/* MENU */
	$('.navbar-nav').attr('id', 'menu'); // please don't remove this line
	$( '<div class="calendar-top"></div>' ).insertBefore( "#calendar" );
	$( '<div class="card-profile-top"></div>' ).insertBefore( ".card.profile.card-profile" );
	var divs = $(".card-profiles > div");
	for(var i = 0; i < divs.length; i+=2) {
		divs.slice(i, i+2).wrapAll( '<div class="col-xs" />');
	}

	var headerNavbar = $('#headerNavbar');
	var width100 = $('.width100');
	var innerWidth = $('body').innerWidth();
	headerNavbar.width(innerWidth);
	width100.width(innerWidth);

    $('.nav-item').children("a").each(function(){
        if($(this).attr('data-toggle') == 'dropdown'){
            $(this).removeAttr('data-toggle')
        }
    });

    $("nav").removeClass("no-transition");

    if (width < 992) { // mobile
        $('#menuToggle input[type="checkbox"]').change(function(){
            var checked = $(this).is(":checked");
            if(checked){
                $('#menu').show("slide", { direction: "right" }, 400);
                $('#search').hide();
                $('#menu, #menu *').css({
                    'visibility': 'visible'
                });
                $('body', 'html').css({
                    'overflow': 'hidden'
                });
            }else{
                $('#menu').hide("slide", { direction: "right" }, 400);
                $('#search').hide();
                $('body', 'html').css({
                    'overflow': 'auto'
                });
            }
        });
    }


    $('body').on('click', '.work_packages .accordion-toggle, .messages .accordion-toggle, .pilots .accordion-toggle, .media_images .accordion-toggle', function () {
        if ($(this).next(".accordion-content").is(':visible')) {
            $(this).next(".accordion-content").slideUp(300);
            $(this).children(".plusminus").html('<span class="plus">Read more</span>');
        } else {
            $(this).next(".accordion-content").slideDown(300);
            $(this).children(".plusminus").html('<span class="minus">Read less</span>');
        }
    });

    $('.work_packages .accordion-content, .pilots .accordion-content, .messages .accordion-toggle').each(function( index, value ) {
        $(value).find('a').attr( "onclick", "window.open(this.href, '_blank');" )
    });

    $('.nav-item').children("a").each(function(){
        if($(this).attr('data-toggle') == 'dropdown'){
            $(this).removeAttr('data-toggle')
        }
    });

    $("nav").removeClass("no-transition");

    if (window.location.hash) {
        var link = window.location.hash;
        var anchorId = link.substr(link.indexOf("#") + 1);
        if($("#"+anchorId).offset()){
            $('html, body').animate({
                scrollTop: $("#"+anchorId).offset().top - 150
            }, 500);
        }else{
            $('.accordion-border').each(function(){
                var title = $(this).find(".accordion-toggle .col-xs.start-xs").text().toUpperCase();
                var toggler = $(this).find(".accordion-toggle");
                if ( title.indexOf(anchorId.toUpperCase()) >= 0 && !toggler.next(".accordion-content").is(':visible') ){
                    $('html, body').animate({
                        scrollTop: toggler.parent().offset().top - 150
                    }, 500);
                    toggler.trigger( "click" );
                }
            });
        }
    }

    $('.dropdown a').click(function(event) {

        if (location.href.indexOf("#") != -1) {
            var link = $(this).attr('href');
            var anchorId = link.substr(link.indexOf("#") + 1);
            if($("#"+anchorId).length>0){
                $('html, body').animate({
                    scrollTop: $("#"+anchorId).offset().top - 150
                }, 500);
            }else{
                // event.preventDefault();
                $("path[title='"+anchorId.toUpperCase()+"']").addClass('active_path');

                $('.accordion-border').each(function(){
                    var title = $(this).find(".accordion-toggle .col-xs.start-xs").text().toUpperCase();
                    var toggler = $(this).find(".accordion-toggle");
                    if ( title.indexOf(anchorId.toUpperCase()) >= 0 && !toggler.next(".accordion-content").is(':visible') ){
                        $('html, body').animate({
                            scrollTop: toggler.parent().offset().top - 150
                        }, 500);
                        toggler.trigger( "click" );
                        event.preventDefault();
                    }
                });
            }
        }


    });


    $('.work_packages .accordion-content, .messages .accordion-toggle').each(function( index, value ) {
        $(value).find('a').attr( "onclick", "window.open(this.href, '_blank');" )
    });

    // $('.text-ligth').each(function(){
    $('.library-item').each(function(){
        // Select the element with the class .custom-field-text
        var element = $(this).find('.text-ligth');

        // Check if the element exists to avoid errors
        if (element) {
            // Split the text content by commas

            var texts = $(element[0]).text().split(',');

            // // Wrap each text piece with <b> tags and join them back into a string
            var boldTexts = texts.map(text => `<span class="author_item">${text}</span>`).join('');
            // // Update the HTML content of the original element
            $(element[0]).html(boldTexts);
        }
    });

    $('.events .tabs').each(function(){
        // For each set of tabs, we want to keep track of
        // which tab is active and its associated content
        var $active, $content, $links = $(this).find('a');
        var speed = "fast";
        var activeTab = $(location.hash);
        // If the location.hash matches one of the links, use that as the active tab.
        // If no match is found, use the first link as the initial active tab.
        $active = $($links.filter("[href=\'"+location.hash+"\']")[0] || $links[0]);

        if($(this).parent().parent().hasClass('videos')){
            $active.addClass('active');
        }

        if($(this).parent().parent().hasClass('events')){
            $active.addClass('active');
        }

        $content = $($active[0].hash);

        // Hide the remaining content
        $links.not($active).each(function () {
            $(this.hash).hide();
        });

        if(activeTab.length){
            $content.slideDown(speed);
            //scroll to element
            $('html, body').animate({
                scrollTop:  activeTab.offset().top - $('header').height()
            }, speed);
        }

        // Bind the click event handler
        $(this).find("a").click(function (e) {
            if($(this).hasClass('active')) {
                $content.slideDown({
                    scrollTop: $content.offset().top - $('header').height()
                }, speed);
                var screenSize = getScreenSize();
                if (screenSize.width < 800) {
                    // scroll to element
                    $('html, body').animate({
                        scrollTop: $content.offset().top - $('header').height() + 300  // mobile
                    }, speed);
                }else{
                    //scroll to element icons top
                    $('html, body').animate({
                        scrollTop:  $content.offset().top - $('header').height() + 300
                    }, speed);
                }
                e.preventDefault();
                return false;
            }
            // Make the old tab inactive.
            $active.removeClass('active');
            $content.hide();

            // Update the variables with the new link and content
            $active = $(this);
            $content = $(this.hash);

            location.hash = $active[0].hash;

            // Make the tab active.
            $active.addClass('active');
            $content.slideDown({
                scrollTop: $content.offset().top - $('header').height()
            }, speed);

            // Prevent the anchor\'s default click action
            e.preventDefault();
        });
    });

    // $( ".subtabs_events" ).tabs();
    // openParentTab();

    /* HOMEPAGE intro **/
    $('.video-carousel').slick({
        autoplaySpeed: 5000,
        draggable: true,
        pauseOnHover: true,
        infinite: true,
        speed: 1000,
        autoplay: true,
        arrows: true,
        fade: true,
        lazyLoad: 'ondemand',
        dots: false,
        prevArrow: '<div class="custom-arrow custom-prev"><img src="/themes/pensoft-kiel/assets/images/arrow-prev.svg" alt="Previous"></div>',
        nextArrow: '<div class="custom-arrow custom-next"><img src="/themes/pensoft-kiel/assets/images/arrow-next.svg" alt="Next"></div>',
    });


    // $('.towns_uppercase_labels').slick({
    //     dots: false,
    //     infinite: true,
    //     speed: 1000,
    //     autoplay: true,
    //     autoplaySpeed: 3000,
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     centerMode: true,
    //     arrows: false
    // });


	onHashChange();
	$(window).on("hashchange", function() {
		onHashChange();
	});

	$('.nav.nav-pills').removeAttr('id');

	var count = $("h1").text().length;

	$('.see_all_partners_link').hide();

    $(".timeline_container.left .blue_line").width(function() {
        return (innerWidth - $('.container').width())/2;
    });


    var active_forms = '';
    var active_docs = '';
    if(window.location.pathname == '/internal-repository/forms'){
        active_forms = 'active_item';
    }
    if(window.location.pathname == '/internal-repository/living-documents'){
        active_docs = 'active_item';
    }

    $('<div class="col-xs-12">\n' +
        '<div class="sidebar_menu_item ' + active_forms + ' ">\n' +
        '<a href="/internal-repository/forms" title="Reporting forms">\n' +
        '<i></i> <div class="card-header">Reporting forms</div>\n' +
        '</a>\n' +
        '</div>\n' +
        '</div>').insertAfter($('.sidebar_menu_list .col-xs-12:last-child').last());

    $('<div class="col-xs-12">\n' +
        '<div class="sidebar_menu_item ' + active_docs + ' ">\n' +
        '<a href="/internal-repository/living-documents" title="Living documents">\n' +
        '<i></i> <div class="card-header">Living documents</div>\n' +
        '</a>\n' +
        '</div>\n' +
        '</div>').insertAfter($('.sidebar_menu_list .col-xs-12:last-child').last());


    $('<small>To download individual image please right click</small>').insertAfter($('.all_images_container'));

    $('<div class="mark"></div>').insertAfter($('.group-holder input'));

    $('.dorsal').click(function () {
        var link = $(this);
        link.parent().parent().find('.toogle-contact-paragraphs').slideToggle('slow', function() {
            if ($(this).is(':visible')) {
                link.text('Read less');
            } else {
                link.text('Read more');
            }
        });

    });

    if( width < 1024 ){
        $('.projects_services .key_1').click(function(){
            $(this).classList.remove("ui-accordion-header ui-corner-top ui-state-default ui-accordion-icons ui-state-hover ui-accordion-header-active ui-state-active");
        });
        $( window ).on( "load", function() {
          $(".projects_services .key_1").each(function(k, v) {
                $(this).attr("style", "display:block!important;");
            });
        } );
    }

    if(width >= 1024){
        $('.work_packages .key_0, .work_packages .key_3, .work_packages .key_6, .work_packages .key_9, .work_packages .key_12, .work_packages .key_15').wrapAll('<div class="col-md-4 col-xs-12" />');
        $('.work_packages .key_1, .work_packages .key_4, .work_packages .key_7, .work_packages .key_10, .work_packages .key_13, .work_packages .key_16').wrapAll('<div class="col-md-4 col-xs-12" />');
        $('.work_packages .key_2, .work_packages .key_5, .work_packages .key_8, .work_packages .key_11, .work_packages .key_14, .work_packages .key_17').wrapAll('<div class="col-md-4 col-xs-12" />');

        $('.pilots .key_0, .pilots .key_2, .pilots .key_4, .pilots .key_6, .pilots .key_7, .pilots .key_8').wrapAll('<div class="col-md-6 col-xs-12" />');
        $('.pilots .key_1, .pilots .key_3, .pilots .key_5, .pilots .key_7, .pilots .key_9, .pilots .key_9').wrapAll('<div class="col-md-6 col-xs-12" />');

        $('.partners_list .key_0, .partners_list .key_2, .partners_list .key_4, .partners_list .key_6, .partners_list .key_8, .partners_list .key_10, .partners_list .key_12, .partners_list .key_14').wrapAll('<div class="col-md-6 col-xs-12" />');
        $('.partners_list .key_1, .partners_list .key_3, .partners_list .key_5, .partners_list .key_7, .partners_list .key_9, .partners_list .key_11, .partners_list .key_13, .partners_list .key_15').wrapAll('<div class="col-md-6 col-xs-12" />');


        $('.partners_list .key_220, .partners_list .key_222, .partners_list .key_224, .partners_list .key_226, .partners_list .key_228, .partners_list .key_2210, .partners_list .key_2212, .partners_list .key_2214').wrapAll('<div class="col-md-6 col-xs-12" />');
        $('.partners_list .key_221, .partners_list .key_223, .partners_list .key_225, .partners_list .key_227, .partners_list .key_229, .partners_list .key_2211, .partners_list .key_2213, .partners_list .key_2215').wrapAll('<div class="col-md-6 col-xs-12" />');
    }


    // Read more button that follows cursor for all news items
    if(screen.width > 1024){
        $('.home-news-cover a, .related-news .home-news-cover a, .media-center a').on('mouseenter', function(e) {
            // Show the button immediately at the current mouse position
            var parentOffset = $(this).offset();
            var relX = e.pageX - parentOffset.left;
            var relY = e.pageY - parentOffset.top;

            $(this).find('.read-more-btn, .zoom-btn').css({
                display: 'block',
                opacity: 1,
                left: relX + 'px',
                top: relY + 'px'
            });
        }).on('mouseleave', function() {
            // Hide the button immediately
            $(this).find('.read-more-btn, .zoom-btn').css({
                display: 'none'
            });
        }).on('mousemove', function(e) {
            var parentOffset = $(this).offset();
            var relX = e.pageX - parentOffset.left;
            var relY = e.pageY - parentOffset.top;
            var $btn = $(this).find('.read-more-btn, .zoom-btn');
            var btnWidth = $btn.outerWidth();
            var btnHeight = $btn.outerHeight();
            var containerWidth = $(this).width();
            var containerHeight = $(this).height();

            // Remove all edge classes
            $btn.removeClass('edge-right edge-left edge-top edge-bottom');

            // Handle edge cases
            var edgeThreshold = 50; // pixels from edge

            // Check if near right edge
            if (relX > containerWidth - edgeThreshold) {
                $btn.addClass('edge-right');
                relX = containerWidth - 20;
            }
            // Check if near left edge
            else if (relX < edgeThreshold) {
                $btn.addClass('edge-left');
                relX = 20;
            }

            // Check if near bottom edge
            if (relY > containerHeight - edgeThreshold) {
                $btn.addClass('edge-bottom');
                relY = containerHeight - 20;
            }
            // Check if near top edge
            else if (relY < edgeThreshold) {
                $btn.addClass('edge-top');
                relY = 20;
            }

            // Position the button immediately for precise cursor replacement
            $btn.css({
                left: relX + 'px',
                top: relY + 'px'
            });
        });
    }



    $('body').on("keyup", function(e) {
        var code = e.which;
        if (code == 39) {
            e.preventDefault();
            $('.next').trigger('click');
        } else if (code == 37) {
            e.preventDefault();
            $('.prev').trigger('click');
        }
    });


});


function animateNumbers() {
    if (isScrolledIntoView($(".numbers2")) && !viewed) {
        viewed = true;
        $('.number_item_number h1 .count').each(function () {
            var size = $(this).text().split(".")[1] ? $(this).text().split(".")[1].length : 0;
            $(this).prop('Counter',0).animate({
                Counter: $(this).text()
            }, {
                duration: 1800,
                easing: 'swing',
                step: function (now) {
                    $(this).text(parseFloat(now).toFixed(size));
                }
            });
        });
    }
}

// Helper function to check if element is in view
function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    if($(elem).height()){
        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();
        return ((elemBottom/2 <= docViewBottom) && (elemTop >= docViewTop));
        // return (elemBottom <= docViewBottom);
    }
    return;
}

function openModal() {
    document.getElementById("imagesModal").style.display = "block";
}

function closeModal() {
    document.getElementById("imagesModal").style.display = "none";
}

// var slideIndex = 1;
// showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slides");
    // var dots = document.getElementsByClassName("demo");
    // var captionText = document.getElementById("caption");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    // for (i = 0; i < dots.length; i++) {
    //     dots[i].className = dots[i].className.replace(" active", "");
    // }
    slides[slideIndex-1].style.display = "block";
    // dots[slideIndex-1].className += " active";
    // captionText.innerHTML = dots[slideIndex-1].alt;
}





function handlePilotsSVGMapMouseMove(event) {
    var title = $(event.target).parent().attr('title');
    var tooltip = document.getElementById("tooltip");

    switch (title) {
        case 'Güímar Valley':
        case 'Guadalquivir Productive Plains':
        case 'Baden-Württemberg Living Lab':
        case 'Southern Małopolska Upland & the Vistula River Valley Living Lab':
        case 'South-Limburg, Geuldal Valley Living Lab':
        case 'Kent Apple Orchard Living Lab':
        case 'South Scania':
        case 'TODO':
            break;
        default:
            return tooltip.classList.remove("active");
    }

    var x = event.clientX;
    var y = event.clientY;

    tooltip.style.left = (x + 20) + "px";
    tooltip.style.top = (y - 20) + "px";

    tooltip.innerHTML = title;
    tooltip.classList.add("active");

}

function onPilots(pTitle) {
    // $("path").removeClass('active_path');
    var tooltip = document.getElementById("tooltip");
    tooltip.classList.remove("active");
    // $("g[title='"+pTitle+"']").addClass('active_path');

    $('.pilots .accordion-border').each(function(){
        var title = $(this).find(".accordion-toggle .title_container").text();
        var toggler = $(this).find(".accordion-toggle");
        toggler.next(".accordion-content").hide();


        if(title.indexOf(pTitle) >= 0 && !toggler.next(".accordion-content").is(':visible')){
            toggler.trigger( "click" );
            $("html, body").animate({ scrollTop: toggler.offset().top - 190 }, 500);
        }
    });
}


function openParentTab() {
    locationHash = location.hash.substring( 1 );
    // Check if we have an location Hash
    if (locationHash) {
        // Check if the location hash exsist.
        var hash = jQuery('#'+locationHash);
        if (hash.length) {
            // Check of the location Hash is inside a tab.
            if (hash.closest(".tabContent").length) {
                // Grab the index number of the parent tab so we can activate it
                var tabNumber = hash.closest(".tabContent").index();
                jQuery(".tabs.fix").tabs({ active: tabNumber });
                // Not need but this puts the focus on the selected hash
                hash.get(0).scrollIntoView();
                setTimeout(function() {
                    hash.get(0).scrollIntoView();
                }, 1000);
            }
        }
    }
}

function onHashChange(){
	$("path").removeClass('active_path');
	$(".accordion-content").hide();
	var caseStudiesHashTitle = location.hash;

	if(caseStudiesHashTitle){
		var caseStudiesTitle = caseStudiesHashTitle.substring(1, caseStudiesHashTitle.length);
		$("path[title='"+caseStudiesTitle.toUpperCase()+"']").addClass('active_path');


	}
}

function encodeURIObject(data){
    return Object.keys(data).map(function (i) {
        return encodeURIComponent(i) + '=' + encodeURIComponent(data[i])
    }).join('&');
}

function appendProfile() {
    $(document).on('profile', function (e) {
        var headerNavbarNav = $('#headerNavbarNav');
        var li = '<li class="nav-item"><a href="/profile" target = "_self">Profile</a></li >';
        headerNavbarNav.find('>ul').append(li);
    });
}
function appendSignIn(){
    $(document).on('signin', function (e) {
        var headerNavbarLogin = $('#headerNavbarNav');
        var li = '<li class="nav-item sign-in"><a href="/login" target = "_self">Log in</a></li >';
		headerNavbarLogin.find('>ul').append(li);
		var menu = $('#menuToggle');
		menu.find('>ul').append(li);
    });
}

function appendSignOut() {
    $(document).on('signout', function (e) {
        var headerNavbarNav = $('#headerNavbarNav');
        var li = '<li class="nav-item  sign-in"><a data-request="onLogout" data-request-data="redirect: \'/\'">Log out</a></li >';
        headerNavbarNav.find('>ul').append(li);
		var menu = $('#menuToggle');
		menu.find('>ul').append(li);
    });
}


function redirectAndRefresh(url){
	$(".tabs a").each(function() {
		this.href = window.location.hash;
	});
	window.open(url, '_blank');
	location.reload();
}

function isBreakpointLarge() {
    return window.innerWidth <= 991;
}

function showSearchForm(){
	$('#layout-header').toggleClass('full-width');
	$('#search').toggle();
	$('.navbar a.p-search').css('visibility', 'hidden');
	// $('#menu li').hide();
	// $('nav a:not(.navbar-brand)').hide();
}

function hideSearchForm(){
	$('#layout-header').toggleClass('full-width');
	$('#search').hide();
    $('.navbar a.p-search').css('visibility', 'visible');
	// $('#menu li').show();
    // $('nav a').show();
}

function requestFormLibrary() {
	$('#mylibraryForm').on('click', 'a', function () {
		var $form = $(this).closest('form');
		$form.request();
	})
}

function requestFormPartners() {
	$('#myPartnersForm').on('click', 'a', function () {
		var $form = $(this).closest('form');
		$form.request();
	})
}



function scrollDown(){
	var element = $('#layout-content');
	$("html, body").animate({ scrollTop: element.offset().top - 190 }, 500);
}


function hideMe(elem){
    $(elem).parent().hide();
}

function fetchMails(i, searchStr){
    // $('.group_mailing_list').hide();
    if($('.group_mailing_list_'+i).is(":visible")){
        $('.group_mailing_list_'+i).hide();
    }else{
        //groups
        $.request('onFetchMailingList', {
            update: { 'mailing_list': '#mailing_list_tooltip_content_'+i,
            },
            data: {
                search_str: searchStr
            },
        }).then(response => {
            $('.group_mailing_list_'+i).html('<a class="close-btn" onclick="hideMe(this)">X</a>' + response.mailing_list);
        });
        $('.group_mailing_list').hide();
        $('.group_mailing_list_'+i).show();
    }

}


function fetchSingleMail(i, searchStr){
    if($('.single_mailing_list_'+i).is(":visible")){
        $('.single_mailing_list_'+i).hide();
    }else{
        //groups
        $.request('onFetchSingleMail', {
            update: { 'individual_email': '#individual_tooltip_content_'+i,
            },
            data: {
                search_str: searchStr
            },
        }).then(response => {
            $('.single_mailing_list_'+i).html('<a class="close-btn" onclick="hideMe(this)">X</a>' + response.individual_email);
        });
        $('.single_mailing_list').hide();
        $('.single_mailing_list_'+i).show();
    }
}

function initMailingTooltip(){
    var searchStr = '';
    $('.group-holder').eq(0).find('.inputWithTooltip span').each(function(i, obj) {
        searchStr = $.trim($(obj).text());
        $(this).parent().css('display', 'inline-grid');
        $('<img src="/storage/app/media/CMS_icons_groups.svg" style="max-width: 16px; margin-left: 5px;" class="icon mailing_list_tooltip_'+i+'" onclick="fetchMails('+i+', \'' + searchStr + '\')" />').insertAfter($(this).parent());
        $('<div class="group_mailing_list group_mailing_list_' + i + '" style="display: none;"></div>').insertAfter($(this).parent());


    });
    $('.group-holder').eq(1).find('.inputWithTooltip span').each(function(i, obj) {
        searchStr = $.trim($(obj).text());
        $('<img src="/storage/app/media/CMS_icons_individuals.svg" style="max-width: 16px; margin-left: 5px;" class="icon mailing_list_tooltip_individuals_'+i+'" onclick="fetchSingleMail('+i+', \'' + searchStr + '\')" />').insertAfter($(this).parent());
        $(this).parent().css('display', 'inline-grid');
        $('<div class="single_mailing_list single_mailing_list_' + i + '" style="display: none;"></div>').insertAfter($(this).parent());
    });

    $('.group-holder').eq(0).prepend( "<p style='margin-left: 10px; width: 100%;'>Prior to sending group emails, please make sure that all individuals you want to contact have been included in the respective group by clicking on the group icon.</p><p></p>" );
    $('.group-holder').eq(1).prepend( "<p style='margin-left: 10px; width: 100%;'>To see each person’s email, click on the account icon.</p><p></p>" );

}


function getScreenSize() {
    var myHeight = 0;
    var myWidth = 0;
    if (window.innerWidth && window.innerHeight) {
        // Netscape & Mozilla
        myHeight = window.innerHeight;
        myWidth = window.innerWidth;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        // IE > 6
        myHeight = document.documentElement.clientHeight;
        myWidth = document.documentElement.clientWidth;
    } else if (document.body.offsetWidth && document.body.offsetHeight) {
        // IE = 6
        myHeight = document.body.offsetHeight;
        myWidth = document.body.offsetWidth;
    } else if (document.body.clientWidth && document.body.clientHeight) {
        // IE < 6
        myHeight = document.body.clientHeight;
        myWidth = document.body.clientWidth;
    }

    return {'width': myWidth, 'height': myHeight};
}

function init() {
    window.addEventListener('resize', function () {
        if (isBreakpointLarge()) {
            $('#card-carousel').slick('unslick');
        } else {
            if (typeof cardCarousel === 'function') {
                cardCarousel({
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    prevArrow: '<i class="slick-prev"/>',
                    nextArrow: '<i class="slick-next"/>',
                });
             }
        }
        // keepFooter(documentHasScroll());

    });
    document.addEventListener('DOMContentLoaded', function () {
        if (!isBreakpointLarge()) {
            if (typeof cardCarousel === 'function') {
                cardCarousel({
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    prevArrow: '<i class="slick-prev"/>',
                    nextArrow: '<i class="slick-next"/>',
                });
            }
        }
		// appendSearchAndSocialMedia()
		requestFormLibrary()
		// requestFormPartners()
        // keepFooter(documentHasScroll());

    });
    // appendProfile()
    appendSignIn()
    appendSignOut()
}

init()
