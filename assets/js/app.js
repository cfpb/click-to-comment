var app = angular.module('CTC', []);

app.controller('MainCtrl', function ($scope, $rootScope, config) {
    var ct = 0;
    $scope.images = config.images;
    $scope.maxComments = config.maxComments;
    

    $scope.comments = [];

    $scope.addComment = function ($event) {
        window.e = $event;
        var target = $event.target, left, top, parent, imgParent, imgRect;
        $event.preventDefault();
        if ($scope.comments.length >= $scope.maxComments) {
            window.alert("There is a limit of " + $scope.maxComments + " notes.");
        } else {
            parent = $(target).parents('.img-wrap');
            rect = parent[0] ? parent[0].getBoundingClientRect() : {};
            if ($event.clientX) {
                left = $event.clientX - rect.left;
                top = $event.clientY - rect.top;
                if (left > $(parent).width()) {
                    left = $(parent).width() - 20;
                }
            } else {
                coords = target.coords.split(",", 2);
                left = parseInt(coords[0]) + rect.left + (ct*30);
                top = parseInt(coords[1]) + rect.top + (ct*30);
                ct += 1;

            }
            $scope.comments.push({left: (left/$(parent).width()) * 100, top: (top/$(parent).height()) * 100, title: target.title});
        }
    }

    $scope.removeComment = function (ind) {
        $scope.comments.splice(ind, 1);
    }

    $scope.submit = function () {
        console.log($scope.comments);
    }
});

app.service('config', function () {
   var config = {}, defaultArea = [{height: '100%', width: '100%', top: "0px", left: "0px"}];
   
   config.maxComments = 4;
   
   config.images = [
        {
            src: "assets/img/le_page1.png", 
            areas: []
        },
        {
            src: "assets/img/le_page1.png",
            areas: [
                {height:"50%", width:"50%", top: "0px", left:"0px", title: "Settlement and transaction information"}
            ]
        }
   ];
   
   angular.forEach(config.images, function (img) {
       if (!img.areas || (angular.isArray(img.areas) && !img.areas.length)) {
           img.areas = defaultArea;
       }
   });
   
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

