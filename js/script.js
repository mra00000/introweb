function addAnimate(e, anim) {
    anim = 'animated ' + anim;
    if (!$(e).hasClass(anim)) $(e).addClass(anim);
}

var e1, e2, e3, e4;

function selectMenu(index) {
    index -= 1;
    $('#info_nav > ul > li').removeClass('infoNav_selected');
    if (index != -1) $('#info_nav > ul > li').eq(index).addClass('infoNav_selected');
}

function removeAnumation(e, anim) {
    anim = 'animated ' + anim;
    setTimeout(function () {
        $(e).removeClass(anim);
    });
}

function scrollTo(index) {
    eval('index = e' + index);

    $('html, body').animate({
        scrollTop: index - 65
    },2000);
}


$(document).ready(function () {
    e1 = $('#wwa_div').position().top;
    e2 = $('#wwhd').position().top;
    e3 = $('#gallery').position().top;
    e4 = $('#contact').position().top;
    var screenMid, scrollBottom;

    $('#gallery_slider').carousel({
        interval: 2000,
    });

    var limitTop =  Math.floor($('#info_nav').position().top);
    $(this).scroll(function () {
        scrollBottom = $(document).scrollTop() + $(window).height();
        screenMid = scrollBottom - $(window).height() / 2;

        if ($(document).scrollTop() > limitTop) {
            $('#info_nav').addClass('fixed animated slideInDown');
        } else $('#info_nav').removeClass('fixed animated slideInDown');

        if (scrollBottom > Math.floor($('#intro2').offset().top))
            addAnimate($('#intro2'), 'slideInLeft');
        else removeAnumation($('#intro2'), 'slideInLeft');

        if (scrollBottom > Math.floor($('#pil > .row > div').offset().top))
            addAnimate($('#pil > .row > div'), 'zoomInUp');
        else removeAnumation($('#pil > .row > div'), 'zoomInUp');

        if ((screenMid > e1)&&(screenMid < e2)) selectMenu(1);
        if ((screenMid > e2)&&(screenMid < e3)) selectMenu(2);
        if ((screenMid > e3)&&(screenMid < e4)) selectMenu(3);
        if ((screenMid > e4)) selectMenu(4);
        if (screenMid < e1) selectMenu(0);
    });

    var chart = new CanvasJS.Chart("chart1",{
        title: {text: "Average rate of occupation on graduate", fontColor: "#ffffff", fontFamily: "Brix Slab Light"},
        backgroundColor: "#232f3e",
        animationEnabled: true,
        legend: {
            fontSize: 20,
            fontFamily: "Brix Slab Light",
            fontColor: "#ffffff",
        },
        theme: "theme2",
        data: [{
            showInLegend: false,
            type: "pie",
            indexLabelFontFamily: "Brix Slab Light",
            indexLabelFontColor: "#ffffff",
            indexLabel: "{label} ({y}%)",
            startAngle: -20,
            showInLegend: false,
            toolTipContent: "{legendText} {y}%",
            dataPoints: [
                {y: 83, label: "Local Company"},
                {y: 15, label: "Foreign Company"},
                {y: 2, label: "Other"}
            ]
        }]
    });
    chart.render();
    
    $('#info_nav > ul > li').click(function () {
        scrollTo($(this).index() + 1);
    });
});