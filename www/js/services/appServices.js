/**
 * Created by LiaoLingjia on 15-12-24.
 * app services
 */
angular.module("appServices",[])
    .factory("appConfigService",function(){
        var config = {
            firebaseUrl:'https://cqq.firebaseio.com/',
            firebaseUsersUrl:'https://cqq.firebaseio.com/users'
        };
        return {
            getValue:function(key){
                return config[key]?config[key]:key;
            }
        };
    })
    .factory("firebaseService",function($q,appConfigService){

        var userDB = new Firebase(appConfigService.getValue("firebaseUsersUrl"));
        return {
            login:function(user){
                var defer = $q.defer();
                userDB.authWithPassword(user,function(error, authData) {
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
                userDB.createUser(user, function (error,data) {
                    if(error){
                        defer.reject(error);
                    }
                    else{
                        defer.resolve(data);
                    }
                });
                return defer.promise;
            }
        };
    });