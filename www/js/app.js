// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter',
    [
        'ionic'
        ,'main.controllers','user.controllers','chat.controllers','menu.controllers'
        ,'app.services','user.services','firebase.services','wilddog.services'
        ,'chat.directives'
        ,'ionic.contrib.frostedGlass'
    ])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
            // setup an abstract state for the tabs directive
            .state('main', {
                url: '/main',
                abstract: true,
                templateUrl: 'templates/main/main.html'
            })
            .state('main.home', {
                url: '/home',
                views: {
                    'main-home': {
                        templateUrl: 'templates/main/main-home.html',
                        controller: 'mainHomeCtrl'
                    }
                }
            })
            .state('main.about', {
                url: '/about',
                views: {
                    'main-about': {
                        templateUrl: 'templates/main/main-about.html'
                    }
                }
            })
            .state('main.dynamic', {
                url: '/dynamic',
                views: {
                    'main-dynamic': {
                        templateUrl: 'templates/main/main-dynamic.html'
                    }
                }
            })
            .state('main.contact', {
                url: '/contact',
                views: {
                    'main-contact': {
                        templateUrl: 'templates/main/main-contact.html'
                    }
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/user/login.html'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'templates/user/register.html'
            })
            .state('setting', {
                url: '/setting',
                templateUrl: 'templates/menu/menu-setting.html'
            })
            .state('chat', {
                url: '/chat/:friendId',
                templateUrl: 'templates/chat/chat.html'
            })
        ;

        $urlRouterProvider.otherwise('/main/home');

    });
