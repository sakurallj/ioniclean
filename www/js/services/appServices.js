/**
 * Created by LiaoLingjia on 15-12-24.
 * app services
 */
angular.module("app.services",[])
    .factory("appConfigService",function(){
        var config = {
            firebaseUrl:'https://cqq.firebaseio.com/',
            firebaseChatsUrl:'https://cqq.firebaseio.com/chats',
            firebaseUsersUrl:'https://cqq.firebaseio.com/users'
        };
        return {
            getValue:function(key){
                return config[key]?config[key]:key;
            }
        };
    })
    .factory("utilService",function(){
        return {
            mergeUID:function(arr){
                if(arr){
                    arr.sort();
                    return jQuery.md5(arr.join('_'));
                }
            }
        };
    })
;
