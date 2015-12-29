angular.module('chat.controllers', [])
    .controller("chatCtrl", function ($scope, $stateParams, chatService, userConfigService) {
        var myUID =  userConfigService.getCurrUserUID();
        var friendUID = $stateParams.friendId;
        $scope.historyChatList = {};
        $scope.my = {headerImageUrl: "http://img.woyaogexing.com/2015/12/28/cafbd40f7ebb91f9!200x200.jpg", nickname: "sakura", uid: myUID};
        $scope.friend = {headerImageUrl: "http://img.woyaogexing.com/2015/12/28/cac5148933fd2d1a!200x200.jpg", nickname: "llj", uid: friendUID};
        $scope.sendMessage = function (message) {
            $scope.message = "";
            chatService.sendMessage(message, myUID, friendUID);
        };
        //监听对方及自己发送的聊天记录
        chatService.receiveMessage(myUID, friendUID, function (data) {
            $scope.$emit("newChatMessage",data.val());
        });
        $scope.$on("newChatMessage",function(data,e,d){
            console.log(data);
            console.log(e);
            console.log(d);
            $scope.historyChatList = e;
        });
    });
