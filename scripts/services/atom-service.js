"use strict"

angular.module('atomApp')
.factory('atomSvc', function() {
  return {
    listArray: [],

    saveList: function(listName) {
      var listKey, listValues, timeStamp;
        if(angular.isDefined(localStorage[listName])){
        } else {
          timeStamp = Date.now();
          listKey = listName + timeStamp;
          listValues = this.createList({
            listName: listName,
            timeStamp: timeStamp
          });
          localStorage[listKey] = JSON.stringify(listValues);
        }
    },

    createList: function(options) {
      return angular.extend({
        listName: null,
        timeStamp: 0
      }, options);
    },

    getList: function() {
      if(localStorage.length > 0) {
        angular.forEach(localStorage, function(list) {
          this.listArray.push(list);
        });
      }
    },

    getListArray: function() {
      return this.listArray;
    }
  };
});
