'use strict';

angular
  .module('App')
  .controller('StarredCtrl', ['$scope', '$state', '$auth', '$http', '$window', 'UserSvc', 'StarSvc', '$stateParams', 'getUser', '$rootScope', StarredCtrl])

function StarredCtrl($scope, $state, $auth, $http, $window, UserSvc, StarSvc, $stateParams, getUser, $rootScope){

  if(!$auth.isAuthenticated()){
    return $state.go('home');
  }

  $scope.star = () => {
    console.log('star in starred list')
  }

  $rootScope.display_name = getUser.data.displayName
  $rootScope.email = getUser.data.email
  $rootScope.birthday = getUser.data.birthday;

  $scope.friendsContainer = true;

  // $scope.search = () => {
  //   // var facebookId = .facebook;
  //   // console.log('facebookId', facebookId)
  //   StarSvc.get_friends()
  //     .then(function(res){
  //       console.log(res.data, "here are the friends we would get back");
  //     })
  //     .catch(function(err) {
  //       console.error(err, 'have no friends');
  //     });
  // }
  // 

  $scope.

  $scope.show_user_info = () => {
    $scope.clicked_card ? $scope.clicked_card = false : $scope.clicked_card = true;
  }
}
