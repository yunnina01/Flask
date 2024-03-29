$('#btn_submit').click(function() {
    $('#btn_submit').attr('disabled', true)     // 2번 연속 사용자가 입력 못하도록 입력 버튼 비활성화
    send();
});
function send() {
    var userInput = $('#input1').val();     // 사용자 입력 가져오기
    $('#divbox').append('<div class="msg_box send"><span>'+ userInput +'</span></div>');    // 사용자 메시지 표시
    $("#divbox").scrollTop($("#divbox")[0].scrollHeight);       // 스크롤 아래로 이동

    $.ajax({
        url: '/predict',        // Flask 라우트 경로로 변경
        type: 'POST',
        contentType: 'application/json',        // 데이터 타입 JSON으로 설정
        dataType: 'json',
        data: JSON.stringify({user_input: userInput}),      // JSON 문자열로 변환
        success: function(data) {
            $('#divbox').append('<div class="msg_box receive"><span>'+ data.response +'</span></div>');     // 서버로부터 받은 응답 표시
            $("#divbox").scrollTop($("#divbox")[0].scrollHeight);       // 스크롤 아래로 이동
            $('#btn_submit').attr('disabled', false)        // 입력 버튼 활성화
        },
        error: function(xhr, status, error) {
            $('#btn_submit').attr('disabled', false)        // 입력 버튼 활성화
            console.error("Error: " + error);
            console.error("Status: " + status);
        }
    });
    $('#input1').val('');       // 입력 필드 초기화
}

$('#btn_voice').click(function() {
    $('#btn_voice').attr('disabled', true)      // 음성인식 중 음성 버튼 비활성화
    voice();
});
function voice() {
    $.ajax({
        url: '/voice',
        type: 'POST',
        success: function(data) {
            $('#input1').val(data.response);        // 입력란에 음성 인식 결과 출력
            $('#btn_voice').attr('disabled', false)     // 음성 버튼 활성화
        },
        error: function(xhr, status, error) {
            $('#btn_voice').attr('disabled', false)     // 음성 버튼 활성화
            console.error("Error: " + error);
            console.error("Status: " + status);
        }
    });
}

/*
$('#form').on('submit', function(e) {
   e.preventDefault();
   send();
});
*/

/*
$('#close_chat_btn').on('click', function() {
    $('.chat_wrap').hide();
});
*/