<?php
    header("Content-Type: application/json; charset=UTF-8");

    $date = @$_POST['date'];
    $depositAmount = @$_POST['depositAmount'];
    $depositTerm = @$_POST['depositTerm'];
    $receiving = @$_POST['receiving'];
    $replenishment = @$_POST['replenishment'];
    $result = 0;
    $days_in_month = cal_days_in_month(CAL_GREGORIAN,  explode('.', $date)[1], explode('.', $date)[2] );
    $days_in_year = 0;

    for ($i=1; $i <= 12; $i++) { 
        $days_in_year += cal_days_in_month(CAL_GREGORIAN,  $i, explode('.', $date)[2] );
    }

    if( $receiving == 'yes' ){
        $result = $depositAmount + ( $depositAmount + $replenishment ) * $days_in_month * ( 0.1 / $days_in_year);
    }else{
        $result = $depositAmount + ( $depositAmount  ) * $days_in_month * ( 0.1 / $days_in_year);
    }

    http_response_code(200);
    echo round($result, 2);