/**
 * Created by sakurallj on 15-12-25.
 */
angular.module("menu.controllers",[])
    .controller("menuLeftCtrl",function($scope,$ionicPopup){
        $scope.setNightOrNot = function(){
            $ionicPopup.alert({
                title: "系统错误",
                template: "夜间模式还在开发中..."
            });
        }
    });
