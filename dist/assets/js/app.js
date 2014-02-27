var app = angular.module('CTC', []);

app.controller('MainCtrl', function ($scope, $rootScope, config, $http, $timeout) {
    var ct = 0;
    $scope.images = config.images;
    $scope.maxComments = config.maxComments;
    $scope.submitted = false;

    $scope.comments = [];

    $scope.addComment = function ($event) {
        window.e = $event;
        var target = $event.target, left, top, parent;
        $event.preventDefault();
        if ($scope.comments.length < $scope.maxComments) {
            parent = $(target).parents('.img-wrap');
            rect = parent[0] ? parent[0].getBoundingClientRect() : {};
            if ($event.clientX) {
                left = $event.clientX - rect.left - 20;
                top = $event.clientY - rect.top - 10;
                if (left > $(parent).width()) {
                    left = $(parent).width() - 20;
                }
            } else {
                coords = target.coords.split(",", 2);
                left = parseInt(coords[0]) + rect.left + (ct*35);
                top = parseInt(coords[1]) + rect.top + (ct*35);
                ct += 1;
            }
            $scope.comments.push({x: parseInt((left/$(parent).width()) * 100), y: parseInt((top/$(parent).height()) * 100), title: target.title, text: ''});
        }
    }

    $scope.removeComment = function (ind) {
        $scope.comments.splice(ind, 1);
    }

    $scope.submit = function () {
        $http.post('/save', $scope.comments).success(function () {
            console.log('success');
            $timeout(function () {
                $scope.submitted = true;
            });
        });
    }
});

app.service('config', function () {
   var config = {};
   
   config.maxComments = 4;
   
   return config; 
});

app.directive("scroll", function ($window) {
  return function(scope, element, attrs) {
    angular.element($window).bind("scroll", function() {
       if (this.pageYOffset >= 100) {
        scope.boolChangeClass = true;
       } else {
        scope.boolChangeClass = false;
       }
      scope.$apply();
    });
  };
});

