angular.module('main.controllers', [])
    .controller('appCtrl', function ($scope,$ionicSideMenuDelegate) {
        $scope.title = "消息";
        //设置不可拖拽展开左侧菜单
        $ionicSideMenuDelegate.canDragContent(false);
    })
    .controller('DashCtrl', function ($scope) {
    })
    .controller('ChatsCtrl', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
    })
    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    })
    //home
    .controller("mainHomeCtrl", function ($scope) {
        $scope.friends = [
            {id: 1, name: "LiaoLingjia", headPic: "img/adam.jpg"},
            {id: 2, name: "sakura", headPic: "img/ben.png"},
            {id: 3, name: "订阅号", headPic: "img/mike.png"},
            {id: 4, name: "腾讯新闻", headPic: "img/perry.png"},
            {id: 5, name: "附近", headPic: "img/adam.jpg"}
        ];
        $scope.deleteFriend = function(friendId){
            alert("delete "+friendId);
        };
    })
    //展示popver
    .controller("mainPopverCtrl", function ($scope, $ionicPopover) {
        $ionicPopover.fromTemplateUrl('templates/main/main-popver-top-right.html', {
            scope: $scope
        }).then(function (popover) {
            $scope.popover = popover;
        });
        $scope.showMainPopver = function ($event) {
            $scope.popover.show($event);
        };
    })
    //在popver上点击 扫一扫等
    .controller("mainPopverClickCtrl", function ($scope) {
        //扫一扫
        $scope.scan = function () {
            alert("扫一扫");
        };
        //加好友
        $scope.addFriend = function () {
            alert("加好友");
        };
        //创建讨论组
        $scope.createDiscussonGroup = function () {
            alert("创建讨论组");
        };
        //发送到电脑
        $scope.sendToComputer = function () {
            alert("发送到电脑");
        };
        //面对面快传
        $scope.sendFaceToFace = function () {
            alert("面对面快传");
        };
        //收钱
        $scope.collectMoney = function () {
            alert("收钱");
        };
    });
