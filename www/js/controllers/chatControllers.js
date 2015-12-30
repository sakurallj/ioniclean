angular.module('chat.controllers', [])
    .controller("chatCtrl", function ($scope, $stateParams,$ionicScrollDelegate, chatService, userConfigService) {
        var myUID =  userConfigService.getCurrUserUID()||'d8aaba72-64aa-423d-a383-4ff2b9f319ca';
        var friendUID = $stateParams.friendId;
        $scope.historyChatList = {};
        $scope.my = {headerImageUrl: "http://img.woyaogexing.com/2015/12/28/cafbd40f7ebb91f9!200x200.jpg", nickname: "sakura", uid: myUID};
        $scope.friend = {headerImageUrl: "http://img.woyaogexing.com/2015/12/28/cac5148933fd2d1a!200x200.jpg", nickname: "llj", uid: friendUID};
        $scope.sendMessage = function (message) {
            $scope.message = "";
            chatService.sendMessage(message, myUID, friendUID);
        };
        //获得历史message
        chatService.getChatHistory(myUID, friendUID).then(
            function(data){
                $scope.historyChatList = data;
            },
            function(error){

            }
        );
        //监听对方及自己发送的聊天记录
        chatService.receiveMessage(myUID, friendUID, function (data) {
            $scope.$emit("newChatMessage",data.val());
        });
        $scope.$on("newChatMessage",function($scope,data,d){
            $scope.currentScope.historyChatList[data.time] = data;
            $ionicScrollDelegate.scrollBottom(true);
        });


    });
