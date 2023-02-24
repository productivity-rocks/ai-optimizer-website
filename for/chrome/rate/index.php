<?php
function isMobileDevice() {
          return preg_match('/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i', $_SERVER['HTTP_USER_AGENT']);
}

if(isMobileDevice()){
          header('Location: ../../../../');
} else {
          header('Location: https://chrome.google.com/webstore/detail/chatgpt-optimizer-superch/fmnbpdmndaabkihejhgdpdpjihokbhlb/reviews/');
}