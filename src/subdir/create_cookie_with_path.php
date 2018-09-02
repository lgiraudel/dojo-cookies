<?php
header('Set-Cookie: my-cookie-without-path=value1');
header('Set-Cookie: my-cookie-with-path=value2; path=/src', false);