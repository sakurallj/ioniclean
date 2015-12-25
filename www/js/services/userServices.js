/**
 * Created by sakurallj on 15-12-25.
 */
angular.module("userServices",[])
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
    });