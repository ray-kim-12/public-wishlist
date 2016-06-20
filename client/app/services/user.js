'use strict';

angular
  .module('App')
  .factory('UserSvc', UserSvc)

UserSvc.$inject = ['$http']

function UserSvc ($http) {
  return {
    getProfile: () => {
      return $http.get('/api/me');
    },
    friendProfile: (friendId) => {
      console.log(friendId, 'Friend')
      return $http.post('/api/friend', {params: {fid: friendId}});
    },
    add_new: (item) => {
      var item;
      console.log(item, "Here is the new item in our service.");
      return $http.post('/api/me/items', item);
    },
    delete_item: (item, $index) => {
      console.log(item, "Item Id for deletion.");
      return $http.put('/api/me/items/delete', item);
    },
    save_changes: (item) => {
      var item;
      console.log(item, "Item for editting.");
      return $http.put('/api/me/items/edit', item);
    },
    starPerson: (user) => {
      console.log('starring this user', user)
      // var starred_friend_id = user.facebook;
      // console.log(starred_friend_id, 'facebook')
      return $http.put('/api/me/star', user)
    },
    saveOrder: (newOrder) => {
      console.log('new order in service', newOrder);
      return $http.put('/api/me/items/order', newOrder);
    },
    likeItem: (item) => {
      console.log('like this item', item);
      return $http.put('/api/items/liked', item);
    }
  };
};
