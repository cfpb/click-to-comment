var app = angular.module('CTC', []);

app.controller('MainCtrl', function ($scope, $rootScope) {
    $scope.maxComments = 4;

    $scope.comments = [];

    $scope.addComment = function ($event) {
        $event.preventDefault();
        if ($scope.comments.length < $scope.maxComments) {
            var target = $event.target,
                rect = target.getBoundingClientRect();
                rect = target.parentElement.getBoundingClientRect();
                //if parent === map, parentElement.getBoundingClientRect
            if (target.coords) {
                //use coordinates?
            }
            $scope.comments.push({left: $event.clientX - rect.left -5, top: $event.clientY - rect.top - 20, title: target.title});
        }
    }

    $scope.removeComment = function (ind) {
        $scope.comments.splice(ind, 1);
    }

    $scope.submit = function () {
        console.log($scope.comments);
    }
});

app.directive("scroll", function ($window) {
  return function(scope, element, attrs) {
    angular.element($window).bind("scroll", function() {
       if (this.pageYOffset >= 100) {
        scope.boolChangeClass = true;
        console.log('Scrolled below header.');
       } else {
        scope.boolChangeClass = false;
        console.log('Header is in view.');
       }
      scope.$apply();
    });
  };
});

