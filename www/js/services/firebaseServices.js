/**
 * Created by LiaoLingjia on 15-12-24.
 * app services
 */
angular.module("firebase.services",[])
    .factory("firebaseService",function($q,appConfigService){
        var baseDB = new Firebase(appConfigService.getValue("firebaseUrl"));
        var userDB = new Firebase(appConfigService.getValue("firebaseUsersUrl"));
        var chatDB = new Firebase(appConfigService.getValue("firebaseChatsUrl"));
        return {
            login:function(user){
                var defer = $q.defer();
                baseDB.authWithPassword(user,function(error, authData) {
                    if(error){
                        defer.reject(error);
                    }
                    else{
                        defer.resolve(authData);
                    }
                });
                return defer.promise;
            },
            createUser:function(user){
                var defer = $q.defer();
                baseDB.createUser(user, function (error,data) {
                    if(error){
                        defer.reject(error);
                    }
                    else{
                        defer.resolve(data);
                    }
                });
                return defer.promise;
            },
            getChatHistory:function(chatRoomKey){
                var defer = $q.defer();
                chatDB.child(chatRoomKey).orderByKey().on("value",function(snapshot){
                    if(snapshot){
                        defer.resolve(snapshot.val());
                    }
                    else{
                        defer.reject('error');
                    }
                });
                return defer.promise;
            },
            sendMessage:function(message,chatRoomKey,uid){
                var roomDB = new Firebase(appConfigService.getValue("firebaseChatsUrl")+"/"+chatRoomKey);
                var nowTime = new Date().getTime();
                roomDB.child(nowTime).set({time:nowTime,message:message,uid:uid});
            },
            receiveMessage:function(chatRoomKey,callback){
                var roomDB = new Firebase(appConfigService.getValue("firebaseChatsUrl")+"/"+chatRoomKey);
                roomDB.on('child_added', callback);
            }
        };
    });