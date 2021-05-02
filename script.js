$(function(){
//Send
    $('#submit').click((e)=>{
        e.preventDefault();
        //console.log($("[name='receiving']:checked").val());
        if( $("#datepicker").val() != '' && $('#depositAmount').val() != '' ){
            if( $("[name='receiving']:checked").val() == 'yes' && $('#replenishment').val() == '' ){
                alert('Заполниете все поля!');
            }else{
                $.ajax({
                type: 'POST',
                url: 'calc.php',
                data: {
                    date: $("#datepicker").val(),
                    depositAmount: $("#depositAmount").val(),
                    depositTerm: $("#depositTerm").val(),
                    receiving: $("[name='receiving']:checked").val(),
                    replenishment: $('#replenishment').val(),
                },
                success: function(data){
                    $('#payment').html(new Intl.NumberFormat('ru-RU').format(data) + " руб.");
                    $('#payment').css({"text-align":"left"});
                },
            });
            }
            
        }else{
            alert('Заполниете все поля!');
        }
        
    })
//send

//Slider
    $( ".slider" ).slider({
        animate: true,
        range: "min",
        value: 1000,
        min: 1000,
        max: 3000000,
        step: 1,
        
    });

    $('#secondSlider').slider({
        slide: function( event, ui ) {
            $( "#slider-result2" ).html(ui.value + " руб.");
        },
        change: function(event, ui) {
            $('#znch').attr('value', ui.value);
            $('#replenishment').val(ui.value);
        }
    });

    $('#firstSlider').slider({
        slide: function( event, ui ) {
            $( "#slider-result1" ).html(ui.value + " руб.");
        },
        change: function(event, ui) {
            $('#depositAmount').val(ui.value);
            $('#znch').attr('value', ui.value);
            
        }
    });
//slider

//Date
    $.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: 'Предыдущий',
        nextText: 'Следующий',
        currentText: 'Сегодня',
        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
        dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
        dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
        dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        weekHeader: 'Не',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['ru']);
    $("#datepicker").datepicker();
//date

//Check
    $('#depositAmount').keypress( (e) =>{
        if( !(e.charCode > 46 && e.charCode < 58) ) {
            alert('Введите число!');
            return false;
        }
        else return true; 
    });
    $('#depositAmount').keyup( (e) =>{
         $('#depositAmount').val() >= 3000000 ? $('#depositAmount').val(3000000) : $('#depositAmount').val();
    });    
    $('#depositAmount').blur( (e) =>{
        $('#depositAmount').val() < 1000 ? $('#depositAmount').val(1000) : $('#depositAmount').val();
    });

    $('#replenishment').keypress( (e) =>{
        if( !(e.charCode > 46 && e.charCode < 58) ) {
            alert('Введите число!');
            return false;
        }
        else return true;
    });
    $('#replenishment').keyup( (e) =>{
        $('#replenishment').val() >= 3000000 ? $('#replenishment').val(3000000) : $('#replenishment').val();   
    });
    $('#replenishment').blur( (e) =>{
        $('#replenishment').val() < 1000 ? $('#replenishment').val(1000) : $('#replenishment').val();
    });

//check
});