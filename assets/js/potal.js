var options = [
    {
        text: "yes"
    },
    {
        text: "no"
    },
    {
        text: "two times a week"
    },
    {
        text: "three times a week"
    },
    {
        text: "more than three times a week"
    },
    {
        text: "i have"
    },
    {
        text: "i have not"
    },
    {
        text: "male"
    },
    {
        text: "female"
    },
]
var questions = [
    {
        id: 4,
        isRequired: true,
        isMultiple: true,
        options: [options[0], options[1]],
    },
    {
        id: 5,
        isRequired: false,
        isMultiple: true,
        options: [options[2], options[3], options[4]],
    },
    {
        id: 6,
        isRequired: true,
        isMultiple: false,
        options: [options[5], options[6]],
    },
    {
        id: 7,
        isRequired: false,
        isMultiple: false,
        options: [options[7], options[8]],
    }
];
var surveys = [
    {
        id: 0,
        title: "تعیین تاریخ کلاس جبرانی",
        description: "کلاس جبرانی درس مهندسی نرم افزار در دو هفته آتی باید برگزار شود. لطفا تاریخ پیشنهادی خود را انتخاب کنید",
        questions: [questions[0], questions[1]],
    },
    {
        id: 1,
        title: "برنده ی بازی استقلال پرسپولیس",
        description: "به نظر شما کی می بره",
        questions: ["q1", "q2"],
    },
    {
        id: 2,
        title: "انتخاب مقاله نمونه دی ماه",
        description: "برترین مقاله از دیدگاه خود را انتخاب کنید",
        questions: ["q1", "q2"],
    },
];

var counter = 0;
var surveyCount = 3;
var i;
var t = "radio";
let whichTab = null;
var numQ =0;

$(function () {
    $('.nav-pills li:nth-child(2) a').tab('show');
    whichTab = 0;
});
$('.nav-pills a').on('shown.bs.tab', function (event) {
    var now = $(event.target).text();
    if (now === "نظرسنجی های من") {
        $('#listPane').html(generateSurveys(surveys));
    }
    if (now === "نظرسنجی های شرکت شده") {
        $('#listPane2').html(generateSurveys(surveys));
    }
    if (now === "نظرسنجی های ثبت نام شده") {
        $('#listPane3').html(generateSurveys(surveys));
    }
});

$('#newSurvey').on('click', '#newQ',function () {
    counter++;
    numQ++;
    if (numQ == 1) {
        $('#newSurvey').append('<button type="submit" class="submit btn btn-primary">ارسال</button> <br><br> ');
    }
    $('#qpane').append('' +
        '<div class="Q' + counter + ' container mr-5 mb-3 mt-2 d-block border border-dark pb-2">\n' +
        '    <button type="button" class="small float-right delQ d-inline-block m-3"><i class="fa fa-trash m-1"></i></button>' +
        '    <div class="float-left col-3 d-inline-block">' +
        '        <select class="type form-control mt-2">' +
        '            <option class="oneAns" selected>تک پاسخی</option>' +
        '            <option class="multipleAns">چند پاسخی</option>' +
        '        </select>' +
        '        <div class="custom-control custom-switch">' +
        '               <input id="r' + counter + '" type="checkbox" class="custom-control-input necessary">' +
        '               <label class="custom-control-label" for="r' + counter + '">' + 'الزامی' + '</label>' +
        '         </div>' +
        '    </div>' +
        '    <div class="container form-group">' +
        '        <input type="text" class="form-control text-right quest" placeholder="صورت سوال">' +
        '        <div class="checkbox text-right">' +
        '        </div>' +
        '    </div>' +
        '    <button type="button" class="small float-right newOption d-inline-block ml-1"><i class="fa fa-plus m-1"></i></button><br><br>' +
        '</div>');
    t = "radio";
});


$('#newSurvey').on('click', 'button.submit', function () {
    surveyCount++;
    let newSurvey = {
        id: surveyCount,
        title : $('#titleS').val(),
        description : $('#desS').val(),
        questions : [],
    };
    surveys[surveyCount-1] = newSurvey;
    $('input').val("");
    let HTML = "<div>" +
        "<h2 class=\"text-center p-2 mb-1\">ایجاد نظرسنجی جدید</h2>\n" +
        "        <div class=\"text-center col-12 d-block mb-4\">\n" +
        "            <input id=\"titleS\" type=\"text\" class=\"form-control text-right m-1\" placeholder=\"عنوان نظرسنجی\">\n" +
        "            <input id=\"desS\" type=\"text\" class=\"form-control text-right m-1\" placeholder=\"توضیحات\">\n" +
        "        </div>\n" +
        "        <button id=\"newQ\" type=\"button\" class=\"btn-outline-dark float-right mb-4\">افزودن سوال جدید</button>\n" +
        "        <div id=\"qpane\" class=\"container pt-5 pb-5\">\n" +
        "</div>"
    $('#newSurvey').html(HTML);
});


$('#qpane').on('click', 'button.newOption', function () {
    var p = this.previousElementSibling.id;
    p = p.split("optionsQ")[1];
    $(this.parentElement).append('<label class="d-block m-1 text-right o' + p + '">' +
        '<button class="removeOp"><i class="fa fa-remove float-left"></i></button>' +
        '<input type="text" class=" text-right m-1" style="border-radius:1%" placeholder="گزینه جدید">' +
        '<input type=' + t + ' disabled>' +
        '</label>');
}).on('click', 'button.removeOp', function () {
    $(this.parentElement).removeClass('d-block');
    $(this.parentElement).addClass('d-none');
}).on('change', '.type', function () {
    var id = $(this).find("option:selected").attr("class");
    switch (id) {
        case "oneAns":
            t = 'radio';
            break;
        case "multipleAns":
            t = 'checkbox';
            break;
    }
}).on('click', '.delQ', function () {
    numQ--;
    $(this.parentElement).removeClass('d-block');
    $(this.parentElement).addClass('d-none');
    if(numQ == 0){
        $(".submit").addClass('d-none');
    }

});


function generateSurveys(surveys) {
    var HTML = "<div class=\"list-group text-right\">";
    for (let i = 0; i < surveys.length; i++) {
        HTML += "<a href=\"#\" class=\"border-secondary list-group-item list-group-item-action\" data-toggle=\"collapse\" data-target=\"#tar" + surveys[i].id + "\">" + surveys[i].title + "</a>";
        HTML += "<div id='tar" + surveys[i].id + "' class=\"bg-secondary text-white collapse pr-2\"><br>" + surveys[i].description + "</div>";
    }
    HTML += "</div>";
    return HTML;
}

//SEARCH
$(document).ready(function () {
    $("#search").on("keyup", function () {
        let value = $(this).val().toLowerCase();
        $(".list-group a").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});