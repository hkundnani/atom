"use strict"

angular.module('atomApp')
.factory('atomSvc', function($rootScope) {
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
            timeStamp: timeStamp,
            listKey: listKey
          });
          this.listArray.push(listValues);
          localStorage[listKey] = JSON.stringify(listValues);
          $rootScope.$broadcast('listArray: updated', this.listArray);
        }
    },

    createList: function(options) {
      return angular.extend({
        listName: null,
        timeStamp: 0,
        listKey: null,
        cards: []
      }, options);
    },

    getList: function() {
      var _this = this,
        unsortedArray = [];

      _this.listArray = [];
      if(localStorage.length > 0) {
        angular.forEach(localStorage, function(list) {
          if (_this.isJSON(list) && JSON.parse(list) !== null) {
            unsortedArray.push(JSON.parse(list));
          }
        });

        _this.listArray = _.sortBy(unsortedArray, 'timeStamp');
        return this.listArray;
      }
    },

    isJSON: function(list) {
      var flag = true;
      try {
        JSON.parse(list);
      }catch(e) {
        flag = false;
      }
      return flag;
    },

    saveCard: function(cardValue, listKey) {
      var _this = this,
        cardDetails, cardKey, timeStamp;

      if(listKey !== null) {
        angular.forEach(_this.listArray, function(list) {
          if(list.listKey === listKey) {
            timeStamp =  Date.now();
            cardKey = 'Card' +  timeStamp;
            cardDetails = _this.createCard({
              cardValue: cardValue,
              cardKey: cardKey,
              timeStamp: timeStamp
            });
            list.cards.push(cardDetails);
            localStorage[listKey] = JSON.stringify(list);
          }
        });
      }
    },

    createCard: function(options) {
      return angular.extend({
        cardValue: '',
        cardKey: null,
        timeStamp: 0,
        cardDescription: 'Click here to enter the description'
      }, options);
    },

    updateList: function(listName, listKey) {
      var _this = this;

      if(listKey !== null) {
        angular.forEach(_this.listArray, function(list) {
          if(list.listKey === listKey) {
            list.listName = listName;
            localStorage[listKey] = JSON.stringify(list);
          }
        });
        $rootScope.$broadcast('listArray: updated', this.listArray);
      }
    },

    removeList: function(listKey) {
      var _this = this,
        index;

      if(listKey !== null) {
        angular.forEach(_this.listArray, function(list, key) {
          if(list.listKey === listKey) {
            index = key;
          }
        });
      }
      if(index > -1) {
        _this.listArray.splice(index, 1);
        localStorage.removeItem(listKey);
      }
    },

    updateCardValue: function(cardValue, listKey, cardKey) {
      var _this = this;

      if(listKey !== null) {
        angular.forEach(_this.listArray, function(list) {
          if(list.listKey === listKey) {
            angular.forEach(list.cards, function(card) {
              if(card.cardKey === cardKey) {
                card.cardValue = cardValue;
              }
            });
            localStorage[listKey] = JSON.stringify(list);
          }
        });
        $rootScope.$broadcast('listArray: updated', this.listArray);
      }
    },

    deleteCard: function(cardDetails) {
      var _this = this,
        index;

      if(angular.isDefined(cardDetails)) {
        angular.forEach(_this.listArray, function(list, id) {
          if(list.listKey === cardDetails.listKey) {
            angular.forEach(list.cards, function(card, key) {
              if(card.cardKey === cardDetails.cardKey) {
                index = key;
              }
            });
            if(index > -1) {
              _this.listArray[id].cards.splice(index, 1);
              localStorage[cardDetails.listKey] = JSON.stringify(list);
            }
          }
        });
      }
    },

    updateCardDescription: function(cardDesc, listKey, cardKey) {
      var _this = this;

      if(listKey !== null) {
        angular.forEach(_this.listArray, function(list) {
          if(list.listKey === listKey) {
            angular.forEach(list.cards, function(card) {
              if(card.cardKey === cardKey) {
                card.cardDescription = cardDesc;
              }
            });
            localStorage[listKey] = JSON.stringify(list);
          }
        });
        $rootScope.$broadcast('listArray: updated', this.listArray);
      }
    }
  };
});
