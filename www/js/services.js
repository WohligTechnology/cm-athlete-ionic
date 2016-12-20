// var adminurl = "http://coachmentor.wohlig.com/api/";
var adminurl = "http://wohlig.io/api/";
var imgurl = adminurl + "upload/";

var imgpath = imgurl + "readFile";
var uploadurl = imgurl;
var user = {};
angular.module('starter.services', [])
  .factory('MyServices', function ($http, $filter) {
    var userProfile = $.jStorage.get("userProfile");
    if (!userProfile) {
      userProfile = {};
    } else {
      requestCredentials = {
        accessToken: $.jStorage.get("userProfile").accessToken[0],
        accessType: "Athlete"
      };
    }

    var returnval = {};

    return {
      getCountries: function (callback) {
        $http({
          url: "json/countries.json",
          method: 'GET',
        }).success(callback);
      },

      setUser: function (data) {
        _.assignIn(userProfile, data);
        $.jStorage.set("userProfile", userProfile);
        requestCredentials = {
          accessToken: $.jStorage.get("userProfile").accessToken[0],
          accessType: "Athlete"
        };
      },

      getUser: function () {
        return userProfile;
      },

      register: function (formData, callback) {
        $http({
          url: adminurl + 'Athlete/registerAthlete',
          method: 'POST',
          data: formData
        }).success(callback);
      },

      getStatic: function (formData, callback) {
        $http({
          url: adminurl + 'ConfigTwo/getOne',
          method: 'POST',
          data: formData
        }).success(callback);
      },

      login: function (formData, callback) {
        $http({
          url: adminurl + 'Athlete/athleteLogin',
          method: 'POST',
          data: formData
        }).success(callback);
      },

      editProfile: function (formData, callback) {
        $http({
          url: adminurl + 'Athlete/updateAthleteProfile',
          method: 'POST',
          data: formData
        }).success(callback);
      },

      getProfile: function (formData, callback) {
        $http({
          url: adminurl + 'Athlete/getAthleteProfile',
          method: 'POST',
          data: formData
        }).success(callback);
      },

      changePassword: function (formData, callback) {
        $http({
          url: adminurl + 'Athlete/resetPasswordAthlete',
          method: 'POST',
          data: formData
        }).success(callback);
      },
      getAthleteMyPlans: function (formData, callback) {
        formData = _.merge(formData, requestCredentials);
        console.log(formData);
        $http({
          url: adminurl + 'Athlete/getAthleteMyPlans',
          method: 'POST',
          data: formData
        }).success(callback);
      },
      saveAnswer: function (formData, callback) {
        formData = _.merge(formData, requestCredentials);
        $http.post(adminurl + 'trainingPlan/saveAnswer', formData).success(function (data) {
          callback(data);
        });
      },

      saveInjury: function (formData, callback) {
        formData = _.merge(formData, requestCredentials);
        $http({
          url: adminurl + 'AthleteInjury/save',
          method: 'POST',
          data: formData
        }).success(callback);
      },
      updateInjury: function (formData, callback) {
        formData = _.merge(formData, requestCredentials);
        $http({
          url: adminurl + 'AthleteInjury/updateAthleteInjury',
          method: 'POST',
          data: formData
        }).success(callback);
      },
      deleteInjury: function (formData, callback) {
        formData = _.merge(formData, requestCredentials);
        $http({
          url: adminurl + 'AthleteInjury/delete',
          method: 'POST',
          data: formData
        }).success(callback);
      },
      getOneInjury: function (formData, callback) {
        formData = _.merge(formData, requestCredentials);
        $http({
          url: adminurl + 'AthleteInjury/findOne',
          method: 'POST',
          data: formData
        }).success(callback);
      },
      searchInjury: function (formData, i, callback) {
        formData = _.merge(formData, requestCredentials);
        $http({
          url: adminurl + 'AthleteInjury/search',
          method: 'POST',
          data: formData
        }).success(function (data) {
          callback(data, i);
        });
      },

    };
  });
