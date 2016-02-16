/**
 * Created by LiaoLingjia on 15-12-24.
 * app services
 */
angular.module("wilddog.services",[])
    .factory("wilddogService",function($q,appConfigService){
        var baseDB = new Wilddog(appConfigService.getValue("wilddogUrl"));
        var userDB = new Wilddog(appConfigService.getValue("wilddogUsersUrl"));
        var chatDB = new Wilddog(appConfigService.getValue("wilddogChatsUrl"));
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
                chatDB.child(chatRoomKey).limitToLast(5).orderByKey().on("value",function(snapshot){
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
                var roomDB = new Wilddog(appConfigService.getValue("wilddogChatsUrl")+"/"+chatRoomKey);
                var nowTime = new Date().getTime();
                roomDB.child(nowTime).set({time:nowTime,message:message,uid:uid});
            },
            receiveMessage:function(chatRoomKey,callback){
                var roomDB = new Wilddog(appConfigService.getValue("wilddogChatsUrl")+"/"+chatRoomKey);
                roomDB.on('child_added', callback);
            }
        };
    });