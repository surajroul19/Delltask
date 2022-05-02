
      var app = angular.module("app", []);
      app.controller("mycontroller", function ($scope, $http) {
        $scope.first;
        $scope.second;
        $scope.result;
        //Function to update the value in DB
        $scope.display = function (first, second) {
          $scope.result = first * second;
          $http
            .post(
              "http://localhost:3000/saveData",
              {
                first: $scope.first,
                second: $scope.second,
                result: $scope.result,
              },
              "Application/json",
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            )
            .then(
              function (res) {
                $scope.data = res.data;
              },
              function (err) {
                console.log(err);
              }
            );
        };
        //Function to get the last used value for multiplication
        $scope.updateLastValue = function () {
          $http
            .get("http://localhost:3000/getData", "Application/json", {
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
            })
            .then(
              function (res) {
                if (res && res.data && res.data.length > 0) {
                  $scope.first = res?.data[res.data.length - 1].first;
                  $scope.second = res?.data[res.data.length - 1].second;
                  $scope.result = res?.data[res.data.length - 1].result;
                }
              },
              function (err) {
                console.log(err);
              }
            );
        };
      });
    