<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css">
  <style>
    body {
      padding: 1em;
    }
  </style>
</head>
<body>
  <table class="table table-dark table-striped">
    <thead>
      <tr>
        <th scope="col">Cookie name</th>
        <th scope="col">Cookie value</th>
      </tr>
    </thead>
    <tbody>
      <?php
        array_walk($_COOKIE, function($value, $key) {
      ?>
      <tr>
          <td><?= $key ?></td>
          <td><?= $value ?></td>
      </tr>
      <?php
      });
      ?>
    </tbody>
  </table>
</body>
</html>
