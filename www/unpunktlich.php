<?php

 file_put_contents ("receive.log",strftime("%Y. %B %d. %A. %X %Z").' -> '.print_r($_REQUEST,1)."\r\n",FILE_APPEND);

 echo '1';
?>