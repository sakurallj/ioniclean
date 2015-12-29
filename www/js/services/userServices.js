/**
 * Created by sakurallj on 15-12-25.
 */
angular.module("user.services",[])
    .factory("userConfigService",function(){
        var config = {
            email:'',
            headerImageUrl:'img/header-30-30.png',
            uid:'',
            token:'',
            expires:0,
            provider:"password"
        };
        return {
            setCurrUserProfile:function(user){
                config = {
                    email:user.password.email,
                    headerImageUrl:user.password.profileImageURL,
                    uid:user.uid,
                    token:user.token,
                    expires:user.expires,
                    provider:user.provider
                }
            },
            getCurrUserEmail:function(){
                return config["email"];
            },
            getCurrUserUID:function(){
                return config["uid"];
            },
            getCurrUserToken:function(){
                return config["token"];
            },
            getCurrUserExpires:function(){
                return config["expires"];
            },
            getCurrUserHeaderImageUrl:function(){
                return config["headerImageUrl"];
            }
            ,
            getCurrUserProfile:function(){
                return config;
            }
        };
    })
    .factory("chatService", function (firebaseService,utilService) {
        return {
            getChatHistory:function(myUID,friendUID){
                //获得UID的hash值
                var chatRoomKey = utilService.mergeUID([myUID,friendUID]);
                //查找聊天历史
                return firebaseService.getChatHistory(chatRoomKey);
            },
            sendMessage:function(message,myUID,friendUID){
                //获得UID的hash值
                var chatRoomKey = utilService.mergeUID([myUID,friendUID]);
                return firebaseService.sendMessage(message,chatRoomKey,myUID);
            },
            receiveMessage:function(myUID,friendUID,callback){
                //获得UID的hash值
                var chatRoomKey = utilService.mergeUID([myUID,friendUID]);
                firebaseService.receiveMessage(chatRoomKey,callback);
            }
        };
    })
;