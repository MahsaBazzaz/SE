$(document).ready(function () {
    $('#tel').keyup(function(){
        if($('#tel').val().length == 10) {
            $('#code').removeClass('disabled')
        }
        else{
            $('#code').addClass('disabled')
        }
    });
    $('#verif').keyup(function() {
        if ($('#verif').val().length == 5) {
            $('#but1').removeClass('disabled')
        } else {
            $('#but1').addClass('disabled')
        }
    });
});


$('#code').on('click',function () {
    if(!($('#code').hasClass('disabled'))){
        $('.first').addClass('d-none');
        $('.second').removeClass('d-none');

        var x = setInterval(function() {
            var now = $('#but2').text();
            if (now > 0) {
                now --;
                $('#but2').html(now);
            }
            else{
                $("#but2").html("ارسال مجدد");
                $('#but2').removeClass('disabled');
                clearInterval(x);
            }
        }, 1000);
    }

});


