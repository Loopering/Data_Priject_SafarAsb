// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('app', ['ionic']);
app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
app.controller('starter',function($scope) {
  var reset = function (a) {

    a[0][0] = a[0][7] = a[7][0] = a[7][7] = 2;
    a[1][0] = a[0][1] = a[0][6] = a[1][7] = a[6][7] = a[7][6] = a[7][1] = a[6][0] = 3;
    a[2][0] = a[3][0] = a[4][0] = a[5][0] = a[6][1] = a[7][2] = a[7][3] = a[7][4] =
      a[7][5] = a[6][6] = a[5][7] = a[4][7] = a[3][7] = a[2][7] = a[1][6] = a[0][5] =
        a[0][5] = a[0][4] = a[0][3] = a[0][2] = a[1][1] = 4;
    a[1][2] = a[1][3] = a[1][4] = a[1][5] = a[2][1] = a[2][6] = a[3][1] = a[3][6] =
      a[4][1] = a[4][6] = a[5][1] = a[5][6] = a[6][2] = a[6][3] = a[6][4] = a[6][5] = 6;
    a[2][2] = a[2][3] = a[2][4] = a[2][5] = a[3][2] = a[3][3] = a[3][4] = a[3][5] =
      a[4][2] = a[4][3] = a[4][4] = a[4][5] = a[5][2] = a[5][3] = a[5][4] = a[5][5] = 8;

  }
  console.log("Hi");
  var stackk = new Array(2);
  stackk.push(1);
  stackk.push(2);
  stackk.push(3);
  console.log(stackk.pop());
  console.log(stackk.pop());
  console.log(stackk.pop());
  $scope.a = new Array(8);
  //$scope.a = new Array(8);
  for (var i = 0; i < 8; i++) {
    $scope.a[i] = new Array(8);
    for (var j = 0; j < 8; j++)
      $scope.a[i][j] = 0;
  }

  var olav = new Array(8);
  for (var i = 0; i < 8; i++)
    olav[i] = new Array(8);

  reset(olav);

  $scope.click = function ($r, $c) {
    console.log("Row = " + $r + "Col = " + $c);
    var dr = 0, dc = 0;
    var row = new Array(2);
    var col = new Array(2);

    var per_row = new Array(2);
    var per_col = new Array(2);

    var seen = new Array(8);
    for (var i = 0; i < 8; i++) {
      seen[i] = new Array(8);
      //col[i]=0;
      //row[i]=0;
    }


    for (var i = 0; i < 8; i++)
      for (var j = 0; j < 8; j++)
        seen[i][j] = 0;
    row.push($r);
    col.push($c);
    seen[$r][$c] = 1;
    check(per_row, per_col, $r, $c);
    var k = 1;

    for (; k > 0 && k < 64;) {
      console.log("K = " + k);
      if (k == 64)
        break;

      var roww = per_row.pop();
      var coll = per_col.pop();

      var r2 = roww.pop();
      var c2 = coll.pop();
      console.log("R2 = " + r2 + "c2 = " + c2);
      per_row.push(roww);
      per_col.push(coll);
      if (r2 != null && c2 != null && seen[r2][c2] == 0) {
        k += 1;
        row.push(r2);
        col.push(c2);
        seen[r2][c2] = 1;

        check(per_row, per_col, r2, c2);
        console.log("RRRRRRRRRR2 = " + r2 + "C2 = " + c2);
      }
      else if (r2 == null && c2 == null) {
        var rr = row.pop();
        var cc = col.pop();
        k -= 1;
        seen[rr][cc] = 0;
        per_col.pop();
        per_row.pop();
      }

    }
    var rowww = new Array(64);
    var colll = new Array(64);
    for (var i = 0; i < 64; i++) {
      rowww.push(row.pop());
      colll.push(col.pop())
    }
    for (var i = 0; i < 64; i++) {
      var r = rowww.pop();
      var c = colll.pop();
      {
        $scope.a[r][c] = i;
        console.log("(" + r + "," + c + ")" + " = " + i);
      }
    }
  }
  var k=0;
  $scope.show = new Array(8)
  for(var i=0;i<8;i++) {
    $scope.show[i] = new Array(8);
    for(var j=0;j<8;j++)
      $scope.show[i][j] = 0;
  }
  var reset_play = function () {
    for(var i=0;i<8;i++) {
      for(var j=0;j<8;j++)
        $scope.show[i][j] = 0;
    }
  }
  $scope.play = function()
  {
    for(var i=0;i<8;i++)
      for(var j=0;j<8;j++)
      {
        if($scope.a[i][j] == k)
        {
          //reset_play();
          console.log("rrr" + i + " " + j + k);
          $scope.show[i][j]=1;
          k+=1;
          return;
        }
      }
  }

  //------------------------------------------------

  var check = function (a, b, currentrow, currentcolumn) {
    var rows = new Array(8);
    var cols = new Array(8);

    var horizontal = new Array(8);
    var vertical = new Array(8);

    horizontal[0] = 1;
    horizontal[1] = 2;
    horizontal[2] = 2;
    horizontal[3] = 1;
    horizontal[4] = -1;
    horizontal[5] = -2;
    horizontal[6] = -2;
    horizontal[7] = -1;
    vertical[0] = -2;
    vertical[1] = -1;
    vertical[2] = 1;
    vertical[3] = 2;
    vertical[4] = 2;
    vertical[5] = 1;
    vertical[6] = -1;
    vertical[7] = -2;
    var i;
    for (var j = 8; j >= 0; j--)
      for (i = 0; i < 8; i++) {
        if (currentrow + vertical[i] >= 0
          && currentrow + vertical[i] <= 7
          && currentcolumn + horizontal[i] >= 0
          && currentcolumn + horizontal[i] <= 7
          && olav[currentrow + vertical[i]][currentcolumn + horizontal[i]] == j
        ) {
          console.log("Curentttttttttt ==>> (" + currentrow + vertical[i] + "," + currentcolumn + horizontal[i] + ")" + "j" + j)
          rows.push(currentrow + vertical[i]);
          cols.push(currentcolumn + horizontal[i]);
        }
      }

    a.push(rows);
    b.push(cols);
  }

  $scope.dis = new Array(8);
  for(var i=0;i<8;i++) {
    $scope.dis[i] = new Array(8)
    for (var j = 0; j < 8; j++)
      $scope.dis[i][j] = true;
  }
});
