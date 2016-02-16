(function() {
    angular.module('ionic.contrib.frostedGlass', ['ionic'])

        .factory('$ionicFrostedDelegate', ['$rootScope', function($rootScope) {
            return {
                update: function() {
                    $rootScope.$emit('ionicFrosted.update');
                }
            }
        }]);
})();