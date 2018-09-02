<?php
$format = 'D, j M Y H:i:s';
$_3DaysFromNow = date($format, strtotime('+3 days'));
$_30SecFromNow = date($format, strtotime('+30 seconds'));

header('Set-Cookie: my-long-duration-cookie=value1; expires=' . $_3DaysFromNow);
header('Set-Cookie: my-short-duration-cookie=value2; expires=' . $_30SecFromNow, false);
