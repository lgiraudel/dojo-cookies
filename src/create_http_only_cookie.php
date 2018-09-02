<?php
header('Set-Cookie: my-normal-cookie=value1');
header('Set-Cookie: my-http-only-cookie=value2; HttpOnly', false);
?>
<!DOCTYPE html>
<html lang="en">
<body>
  <script>
    document.write(document.cookie);
  </script>  
</body>
</html>