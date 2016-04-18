'use strict';

angular
  .module('App')
  .controller('NavbarCtrl', ['$scope', '$state', 'NavSvc', NavbarCtrl]);

function NavbarCtrl($scope, $state, NavSvc){

  $scope.my_wishlist = function(){
    console.log('my wishlist')
    $state.go('my-wishlist')
  }

  $scope.starred_lists = function(){
    console.log('starred lists')
    $state.go('starred-lists')
  }

  $scope.logout = function(){
    console.log('logout')
    $state.go('home')
  }
}