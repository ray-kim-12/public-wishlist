'use strict';

angular
  .module('app.routes', [])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$authProvider', AppRoutes]);

function AppRoutes($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {
  // $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');
  // $urlRouterProvider.otherwise(function($injector, $location){
  //   // to work on mobile, make sure cookies are NOT blocked;
  //   var state = $injector.get('$state');
  //   var path = $location.url();
  //   if (state.current.abstract){
  //     if (path.indexOf('access_token') == -1){
  //       state.go('login');
  //     }
  //   }
  // })
  $stateProvider
    .state('faq', {
      url: '/faq',
      templateUrl: 'app/components/faq/faq.html',
      controller: 'faqCtrl'
    })
    .state('home', {
      url: '/',
      templateUrl: 'app/components/home/home.html',
      controller: 'HomeCtrl'
    })
    .state('my-wishlist', {
      url: '/my-wishlist/:id',
      templateUrl: 'app/components/my-wishlist/my-wishlist.html',
      controller: 'WishlistCtrl',
      resolve: {
        getUser: function(UserSvc){
          return UserSvc.getProfile();
        }
      }
    })
    .state('friend-wishlist', {
      url: '/my-wishlist/:id/friends/:fid',
      templateUrl: 'app/components/friend-wishlist/friend-wishlist.html',
      controller: 'FriendlistCtrl',
      resolve: {
        getUser: function(UserSvc) {
          return UserSvc.getProfile();
        },
        getFriend: function(UserSvc, $stateParams){
          return UserSvc.friendProfile($stateParams.fid);
        }
      }
    })

  $authProvider.facebook({
    clientId: '247255738962232',
    requiredUrlParams: ['scope', 'display'],
    scope: ['user_friends', 'email', 'user_birthday']
  });
}
