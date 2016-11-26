var adminurl = "http://coachmentor.wohlig.com/api/";
// var adminurl = "http://192.168.2.78/api/";
var imgurl = adminurl + "upload/";

var imgpath = imgurl + "readFile";
var uploadurl = imgurl;
var user = {};
angular.module('starter.services', [])
  .factory('MyServices', function ($http, $filter) {
    var userProfile = $.jStorage.get("userProfile");
    if (!userProfile) {
      userProfile = {};
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
          url: adminurl + 'Coach/getAthleteProfile',
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
    };
  });
