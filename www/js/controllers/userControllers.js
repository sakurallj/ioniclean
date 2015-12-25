angular.module('user.controllers', [])
    .controller('loginCtrl', function ($scope, $ionicPopup,$state,firebaseService,userConfigService) {
        $scope.login = function(user){
            var loginTitle = '登录异常';
            if(!user){
                $ionicPopup.alert({
                    title: loginTitle,
                    template: '请输入用户名和密码'
                });
            }
            else if(!user.email){
                $ionicPopup.alert({
                    title: loginTitle,
                    template: '请输入邮箱'
                });
            }
            else if(!user.password){
                $ionicPopup.alert({
                    title: loginTitle,
                    template: '请输入密码'
                });
            }
            else{
                firebaseService.login(user).then(
                    function(data){
                        console.log(data);
                        userConfigService.setCurrUserProfile(data);
                        console.log(userConfigService.getCurrUserProfile());
                        $state.go("main.home");
                    },
                    function(error){
                        $ionicPopup.alert({
                            title: loginTitle,
                            template: error //'邮箱或密码错误'
                        });
                    }
                );
            }
        };
    })
    .controller('registerCtrl', function ($scope, $ionicPopup,$state,firebaseService) {
        $scope.register = function(user){
            var registerTitle = '注册异常';
            if(!user){
                $ionicPopup.alert({
                    title: registerTitle,
                    template: '请填写注册信息'
                });
            }
            else if(!user.username){
                $ionicPopup.alert({
                    title: registerTitle,
                    template: '请输入用户名'
                });
            }
            else if(!user.email){
                $ionicPopup.alert({
                    title: registerTitle,
                    template: '请输入邮箱'
                });
            }
            else if(!user.password){
                $ionicPopup.alert({
                    title: registerTitle,
                    template: '请输入密码'
                });
            }
            else if(!user.passwordA){
                $ionicPopup.alert({
                    title: registerTitle,
                    template: '请输入确认密码'
                });
            }
            else if(user.passwordA !== user.password){
                $ionicPopup.alert({
                    title: registerTitle,
                    template: '两次输入的密码不相同'
                });
            }
            else{
                firebaseService.createUser(user).then(
                    function(data){
                        console.log(data);
                        $state.go("login");
                    },
                    function(error){
                        $ionicPopup.alert({
                            title: registerTitle,
                            template: error //'注册失败，请稍后重试'
                        });
                    }
                );

            }
        };
    })
    .controller("userProfileCtrl",function($scope,userConfigService){
        $scope.headerImageUrl = userConfigService.getCurrUserHeaderImageUrl();
    });
