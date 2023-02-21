<?php

$str = '?utm_source=productivity.rocks&utm_campaign=productivityRocksStartPage';
if ($_GET) {
          foreach ($_GET as $key => $value) {
                    $str = $str . $key . '=' . $value . '&';
          }
}
if (substr($str, -1) === '&' || substr($str, -1) === '?') {
          $str = substr($str, 0, -1);
}
header('Location: https://chrome.google.com/webstore/detail/chatgpt-optimizer-superch/fmnbpdmndaabkihejhgdpdpjihokbhlb' . $str);