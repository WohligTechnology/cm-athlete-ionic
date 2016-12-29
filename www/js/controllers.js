angular.module('starter.controllers', ['starter.services', 'checklist-model', 'chart.js', 'ui.calendar', 'ngCordova'])

.controller('LoadingCtrl', function ($scope, $ionicModal, $timeout, $state, $rootScope, MyServices, $ionicHistory) {
  $scope.loadingData = MyServices.getUser();
  if ($scope.loadingData.accessToken) {
    $state.go('app.profile');
  } else {
    $state.go('login');
  }
})

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, MyServices, $state) {
  $scope.profileData = MyServices.getUser();

  // Log out
  $scope.logout = function () {
    $.jStorage.flush();
    $state.go('login');
  };
})

.controller('RegistrationCtrl', function ($scope, $state, $ionicPopup, MyServices, $ionicLoading, $filter, $ionicModal) {

  $scope.formData = {};

  $scope.gender = ['Male', 'Female'];

  $scope.maxDate = $filter('date')(new Date(), 'yyyy-MM-dd');

  $scope.onlyAplha = /^[a-zA-Z_]+$/;
  $scope.validEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };

  //Password Validator
  $scope.valid1 = false;
  $scope.valid2 = false;
  $scope.passwordValidator = function (password) {
    $scope.passwordInvalid = true;
    if (password && password.length >= 8 && password.length <= 15) {
      $scope.valid1 = true;
    } else {
      $scope.valid1 = false;
    }
    if (/([a-zA-Z])/.test(password) && /([0-9])/.test(password)) {
      $scope.valid2 = true;
    } else {
      $scope.valid2 = false;
    }
    if ($scope.valid1 && $scope.valid2) {
      $scope.passwordInvalid = false;
    } else {
      $scope.passwordInvalid = true;
    }
  };

  //Submit Form
  $scope.submitData = function (formData) {
    $scope.showLoading('Please wait...', 15000);
    MyServices.register(formData, function (data) {
      if (data.value === true) {
        $scope.formData = {};
        $scope.hideLoading();
        $scope.showLoading('Registration Successful!', 2000);
        $state.go('login');
      } else {
        $scope.hideLoading();
        $scope.showLoading('Registration Failed!', 2000);
      }
    });
  };

  //Terms Popup
  $scope.termsID = {
    _id: "580cc6877f2ec11727460f1f"
  };
  $scope.privacyID = {
    _id: "580cc67b7f2ec11727460f1c"
  };
  $scope.termsPopup = function (data) {
    $scope.myPopup = $ionicPopup.show({
      template: '<p>Do you agree to the Coach Mentor <span class="link" ng-click="staticModal(termsID)">Terms of Service</span> and <span class="link" ng-click="staticModal(privacyID)">Privacy Policy</span>?</p>',
      title: 'Terms & Conditions',
      scope: $scope,
      buttons: [{
        text: 'No'
      }, {
        text: '<b>Yes</b>',
        type: 'button-positive',
        onTap: function (e) {
          $scope.submitData(data);
        }
      }]
    });
  };

  //Terms Modal
  $ionicModal.fromTemplateUrl('templates/modal/static-page.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.staticModal = function (id) {
    $scope.staticData = '';
    $scope.myPopup.close();
    $scope.showLoading('Loading...', 15000);
    MyServices.getStatic(id, function (data) {
      if (data.value === true) {
        $scope.staticData = data.data;
        $scope.hideLoading();
      } else {
        $scope.hideLoading();
        $scope.showLoading('Loading Failed!', 2000);
      }
    });
    $scope.modal.show();
  };
  $scope.closeModal = function () {
    $scope.modal.hide();
  };

})

.controller('LoginCtrl', function ($scope, $state, $ionicPopup, MyServices, $ionicLoading, $ionicModal, $ionicHistory) {
  $ionicHistory.clearCache();
  $ionicHistory.clearHistory();
  $ionicHistory.removeBackView();
  $ionicModal.fromTemplateUrl('templates/modal/forgot-password.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function () {
    $scope.modal.show();
  };
  $scope.closeModal = function () {
    $scope.modal.hide();
  };

  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };

  //Submit Form
  $scope.submitData = function (formData) {
    $scope.showLoading('Please wait...', 15000);
    MyServices.login(formData, function (data) {
      if (data.value === true) {
        $scope.formData = {};
        $scope.hideLoading();
        $scope.showLoading('Login Successful!', 2000);
        MyServices.setUser(data.data);
        $state.go('app.profile');
      } else {
        $scope.hideLoading();
        $scope.showLoading(data.error.message, 2000);
      }
    });
  };
})

.controller('PersonalGoalsCtrl', function ($scope, $state, $ionicPopup, MyServices, $ionicLoading, $ionicModal, $ionicHistory) {
  $scope.personalgoals = [];
  $scope.getPersonalGoals = function () {
    $scope.personalgoals = undefined;
    MyServices.getKeyAthleteCompetitions(function (data) {
      if (data.value) {
        $scope.personalgoals = data.data;
      } else {
        $scope.personalgoals = [];
      }
    });
  };
  $scope.getPersonalGoals();
})


.controller('ForgotPasswordCtrl', function ($scope, $ionicModal, $timeout) {

})

.controller('ProfileCtrl', function ($scope, $ionicScrollDelegate, $ionicHistory, $rootScope, MyServices, $ionicLoading) {
  $ionicHistory.clearCache();
  $ionicHistory.clearHistory();
  $ionicHistory.removeBackView();
  $scope.profileData = MyServices.getUser();

  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };

  //Reload Profile
  $scope.reloadProfile = function () {
    MyServices.getProfile($scope.profileData, function (data) {
      if (data.value === true) {
        MyServices.setUser(data.data);
        $scope.$broadcast('scroll.refreshComplete');
      } else {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.showLoading('Error Updating Profile!', 1000);
      }
    });
  };
  $scope.reloadProfile();

  //Profile Incomplete Check
  $scope.profileIncomplete = function () {
    if (!$scope.profileData.country || !$scope.profileData.mobile || !$scope.profileData.sports || !$scope.profileData.about || !$scope.profileData.events || !$scope.profileData.achievements || !$scope.profileData.previousSeasonReview) {
      return true;
    } else {
      return false;
    }
  };
})

.controller('EditProfileCtrl', function ($scope, $state, MyServices, $ionicModal, $filter, $ionicLoading, $cordovaCamera, $cordovaFileTransfer) {
  $scope.formData = MyServices.getUser();
  $scope.formData.dob = new Date($scope.formData.dob);
  $scope.dummyPassword = '12345678';

  $scope.maxDate = $filter('date')(new Date(), 'yyyy-MM-dd');

  $scope.gender = ['Male', 'Female'];

  $scope.onlyAplha = /^[a-zA-Z_]+$/;
  $scope.validEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  MyServices.getCountries(function (data) {
    $scope.countries = data;
  });

  //Profile Incomplete Check
  $scope.profileIncomplete = function () {
    if (!$scope.formData.country || !$scope.formData.mobile || !$scope.profileData.sports || !$scope.formData.about || !$scope.formData.events || !$scope.formData.achievements || !$scope.formData.previousSeasonReview) {
      return true;
    } else {
      return false;
    }
  };

  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };

  //Password Validator
  $scope.passwordData = {};
  $scope.valid1 = false;
  $scope.valid2 = false;
  $scope.passwordValidator = function (password) {
    $scope.passwordInvalid = true;
    if (password && password.length >= 8 && password.length <= 15) {
      $scope.valid1 = true;
    } else {
      $scope.valid1 = false;
    }
    if (/([a-zA-Z])/.test(password) && /([0-9])/.test(password)) {
      $scope.valid2 = true;
    } else {
      $scope.valid2 = false;
    }
    if ($scope.valid1 && $scope.valid2) {
      $scope.passwordInvalid = false;
    } else {
      $scope.passwordInvalid = true;
    }
  };

  //Submit Form
  $scope.submitData = function (formData) {
    $scope.showLoading('Please wait...', 15000);
    MyServices.editProfile(formData, function (data) {
      if (data.value === true) {
        $scope.hideLoading();
        MyServices.setUser(data.data);
        $scope.showLoading('Profile Updated!', 2000);
        $state.go('app.profile');
      } else {
        $scope.hideLoading();
        $scope.showLoading('Please Try Again!', 2000);
      }
    });
  };

  MyServices.getCountries(function (data) {
    $scope.countries = data;
  });


  // Update Password
  $ionicModal.fromTemplateUrl('templates/modal/password.html', {
    id: 1,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modalPassword = modal;
  });

  $scope.passwordData = {};
  $scope.changePassword = function () {
    $scope.passwordData.accessToken = $scope.formData.accessToken;
    $scope.modalPassword.show();
  };
  $scope.submitPassword = function (formData) {
    $scope.showLoading('Please wait...', 15000);
    MyServices.changePassword(formData, function (data) {
      if (data.value === true) {
        $scope.passwordData = {};
        $scope.hideLoading();
        $scope.showLoading('Password Updated!', 2000);
        $state.go('app.profile');
        $scope.closeModal();
      } else {
        $scope.hideLoading();
        $scope.showLoading(data.data.message, 2000);
      }
    });
  };

  $scope.closeModal = function () {
    $scope.modalPassword.hide();
  };

  //Password Validator
  $scope.passwordData = {};
  $scope.valid1 = false;
  $scope.valid2 = false;
  $scope.passwordValidator = function (password) {
    $scope.passwordInvalid = true;
    if (password && password.length >= 8 && password.length <= 15) {
      $scope.valid1 = true;
    } else {
      $scope.valid1 = false;
    }
    if (/([a-zA-Z])/.test(password) && /([0-9])/.test(password)) {
      $scope.valid2 = true;
    } else {
      $scope.valid2 = false;
    }
    if ($scope.valid1 && $scope.valid2) {
      $scope.passwordInvalid = false;
    } else {
      $scope.passwordInvalid = true;
    }
  };


  // Upload Profile Pic
  $scope.selectImage = function () {
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    $cordovaCamera.getPicture(options).then(function (imageURI) {
      $scope.profileImage = imageURI;
      $scope.uploadImage($scope.profileImage);
    }, function (err) {
      // error
    });
  };

  //Upload Image
  $scope.uploadImage = function (imageURI) {
    $scope.showLoading('Uploading Image...', 10000);
    $cordovaFileTransfer.upload(adminurl + 'upload', imageURI)
      .then(function (result) {
        // Success!
        console.log(result.response);
        result.response = JSON.parse(result.response);
        $scope.formData.profilePic = result.response.data[0];
        $scope.submitData($scope.formData);
      }, function (err) {
        // Error
        $scope.hideLoading();
        $scope.showLoading('Error!', 2000);
      }, function (progress) {
        // constant progress updates
      });
  };
})


.controller('BlogCtrl', function ($scope, $ionicModal, MyServices, $ionicLoading, $ionicPopup) {
  $scope.currentPage = 1;
  var i = 0;
  $scope.allBlog = [];
  $scope.search = {
    keyword: ""
  };
  $scope.more = {
    Data: true
  };

  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };

  //On Change Search Function
  $scope.searchChange = function (keywordChange) {
    if (keywordChange === '') {
      $scope.allBlog = [];
      $scope.showAllBlog(keywordChange);
    } else {
      $scope.showAllBlog(keywordChange);
    }
  };

  //Get All blog
  $scope.showAllBlog = function (keywordChange) {
    if (keywordChange) {
      $scope.currentPage = 1;
      $scope.allBlog = [];
    }
    MyServices.searchBlogForAthlete({
      page: $scope.currentPage,
      keyword: $scope.search.keyword
    }, ++i, function (data, ini) {
      if (ini == i) {
        if (data.value) {
          console.log(data.data.results.reactions);
          _.forEach(data.data.results, function (value) {
            console.log(value);
            $scope.allBlog.push(value);
          });
          $scope.totalItems = data.data.total;
          if ($scope.totalItems > $scope.allBlog.length) {
            $scope.currentPage++;
            $scope.$broadcast('scroll.infiniteScrollComplete');
          } else {
            $scope.more.Data = false;
          }
        } else {
          $scope.showLoading('Error Loading Blogs', 2000);
        }
      }
    });
  };

  //Load More
  $scope.loadMore = function () {
    $scope.showAllBlog();
  };
  $scope.toggle = function () {
    $scope.searchBlog = !$scope.searchBlog;
  };
})

.controller('BlogDetailCtrl', function ($scope, $ionicModal, $ionicLoading, MyServices, $ionicPopup, $stateParams, $filter, $state) {
  $scope.formData = {};
  $scope.blogId = $stateParams.id;

  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };

  //get one edit
  if ($stateParams.id) {
    MyServices.getOneBlogForAthlete({
      _id: $stateParams.id
    }, function (response) {
      if (response.data) {
        $scope.formData = response.data;
      } else {
        $scope.formData = {};
      }
    });
  }

  //Reactions
  $scope.athlete = MyServices.getUser();
  $scope.goLike = function (val) {
    if (val) {
      MyServices.reactToBlog({
        type: val,
        _id: $stateParams.id
      }, function (response) {
        if (response.value) {
          $scope.formData = response.data;
        } else {}
      });
    } else {
      MyServices.removeReaction({
        _id: $stateParams.id
      }, function (response) {
        if (response.value) {
          $scope.formData = response.data;
        } else {}
      });
    }
  };

})

.controller('ChatCtrl', function ($scope, $ionicModal, $state) {
  $ionicModal.fromTemplateUrl('templates/modal/chat.html', {
    id: 1,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modalChat = modal;
  });
  $scope.newChat = function () {
    $scope.modalChat.show();
  };

  $scope.startChat = function () {
    $state.go('app.chatdetail');
    $scope.modalChat.hide();
  };
})

.controller('ChatDetailCtrl', function ($scope, $ionicScrollDelegate, $timeout) {

  $scope.hideTime = true;

  $scope.timeStamp = function () {
    var d = new Date();
    d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
    return d;
  };

  $scope.sendMessage = function () {

    if ($scope.data.message !== '' && $scope.data.message) {
      console.log($scope.data.message);
      $scope.messages.push({
        userId: 'me',
        text: $scope.data.message,
        time: $scope.timeStamp()
      });

      delete $scope.data.message;
      $ionicScrollDelegate.scrollBottom(true);
    }

  };

  $scope.chatTap = function (m) {
    m.showTime = true;
    $timeout(function () {
      m.showTime = false;
    }, 4000);
  };
  $scope.openKb = function () {
    cordova.plugins.Keyboard.open();
  };

  $scope.data = {};
  $scope.messages = [{
    userId: 'he',
    text: 'Hi Matt, how did you find the session?',
    time: $scope.timeStamp()
  }, {
    userId: 'me',
    text: 'Good, I managed to hit my target times, legs are feeling quite tired now.',
    time: $scope.timeStamp()
  }, {
    userId: 'he',
    text: 'Good, I suggest you rehab today ready for tomorrow’s session.',
    time: $scope.timeStamp()
  }, {
    userId: 'he',
    text: 'Stretch, foam roll etc, please refer to rehab programme attached with your Training Plan',
    time: $scope.timeStamp()
  }, {
    userId: 'me',
    text: 'Will do, thanks.',
    time: $scope.timeStamp()
  }, {
    userId: 'me',
    text: 'James, a question regarding the session on the 27th November, you have set three sets however still struggling with the legs from last week, shall I drop a set or take the reps slower and get it finished?',
    time: $scope.timeStamp()
  }, {
    userId: 'he',
    text: 'Stick with the two sets, get it done in flats. I will adapt your training plan for you.',
    time: $scope.timeStamp()
  }, {
    userId: 'me',
    text: 'Thanks James',
    time: $scope.timeStamp()
  }, {
    userId: 'me',
    text: 'Session complete, have submitted my times in session feedback',
    time: $scope.timeStamp()
  }];

})

.controller('ChatGroupCtrl', function ($scope, $ionicScrollDelegate, $timeout) {

  $scope.hideTime = true;

  $scope.timeStamp = function () {
    var d = new Date();
    d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
    return d;
  };

  $scope.sendMessage = function () {

    if ($scope.data.message !== '' && $scope.data.message) {
      console.log($scope.data.message);
      $scope.messages.push({
        userId: 'me',
        text: $scope.data.message,
        time: $scope.timeStamp()
      });

      delete $scope.data.message;
      $ionicScrollDelegate.scrollBottom(true);
    }

  };

  $scope.chatTap = function (m) {
    m.showTime = true;
    $timeout(function () {
      m.showTime = false;
    }, 4000);
  };
  $scope.openKb = function () {
    cordova.plugins.Keyboard.open();
  };

  $scope.data = {};
  $scope.messages = [{
    userId: 'he',
    name: 'Usain',
    surname: 'Usain',
    text: 'Hello! Welcome to Coach Mentor!',
    time: $scope.timeStamp()
  }];

})

.controller('AnalyticsCtrl', function ($scope, $ionicModal) {
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
})

.controller('InjuryCtrl', function ($scope, $ionicModal, MyServices, $ionicLoading, $ionicPopup) {
  $scope.currentPage = 1;
  var i = 0;
  $scope.allInjury = [];
  $scope.search = {
    keyword: ""
  };
  $scope.more = {
    Data: true
  };

  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };


  //On Change Search Function
  $scope.searchChange = function (keywordChange) {
    if (keywordChange === '') {
      $scope.allInjury = [];
      $scope.showAllInjury(keywordChange);
    } else {
      $scope.showAllInjury(keywordChange);
    }
  };

  //Get All Competiton
  $scope.showAllInjury = function (keywordChange) {
    if (keywordChange) {
      $scope.currentPage = 1;
      $scope.allInjury = [];
    }
    MyServices.searchInjury({
      page: $scope.currentPage,
      keyword: $scope.search.keyword
    }, ++i, function (data, ini) {
      if (ini == i) {
        if (data.value) {
          _.forEach(data.data.results, function (value) {
            $scope.allInjury.push(value);
          });
          $scope.totalItems = data.data.total;
          if ($scope.totalItems > $scope.allInjury.length) {
            $scope.currentPage++;
            $scope.$broadcast('scroll.infiniteScrollComplete');
          } else {
            $scope.more.Data = false;
          }
        } else {
          $scope.showLoading('Error Loading Injurys', 2000);
        }
      }
    });
  };

  //Load More
  $scope.loadMore = function () {
    $scope.showAllInjury();
  };

  //Delete Popup
  $scope.deletePop = function (id) {
    $scope.myPopup = $ionicPopup.show({
      template: '<p>Are you sure want to delete the injury?</p>',
      title: 'Confirmation Message',
      scope: $scope,
      buttons: [{
        text: 'No'
      }, {
        text: '<b>Yes</b>',
        type: 'button-positive',
        onTap: function (e) {
          $scope.deleteInjury(id);
        }
      }]
    });
  };
  $scope.deleteInjury = function (id) {
    $scope.showLoading("Loading...", 10000);
    if (id) {
      MyServices.deleteInjury({
        _id: id
      }, function (data) {
        if (data.value) {
          $scope.allInjury = [];
          $scope.showAllInjury();
          $scope.hideLoading();
          $scope.showLoading("Injury Deleted", 2000);
        } else {
          $scope.hideLoading();
          $scope.showLoading("Error Deleting Injury", 2000);
        }
      });
    }
  };
})

.controller('InjuryCreateCtrl', function ($scope, $ionicModal, $ionicLoading, MyServices, $ionicPopup, $stateParams, $filter, $state) {
  $scope.title = 'Add';
  $scope.selectAthlete = {};
  $scope.formData = {};
  $scope.today = $filter('date')(new Date(), 'yyyy-MM-dd');
  $scope.severity = ['Minor', 'Moderate', 'Severe'];

  //Match start date & end date
  $scope.matchDate = function () {
    $scope.formData.resumeTrainingDate = $scope.formData.injuryDate;
  };

  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };

  //Submit Form
  $scope.submitData = function (formData) {
    $scope.showLoading('Please wait...', 15000);
    MyServices.saveInjury(formData, function (data) {
      if (data.value === true) {
        $scope.hideLoading();
        $scope.showLoading('Injury Created', 2000);
        $state.go('app.injuries');
      } else {
        $scope.hideLoading();
        $scope.showLoading(data.data.message, 2000);
      }
    });
  };
})

.controller('InjuryDetailCtrl', function ($scope, $ionicModal, $ionicLoading, MyServices, $ionicPopup, $stateParams, $filter, $state) {
  $scope.title = 'Edit';
  $scope.formData = {};
  $scope.selectAthlete = {};
  $scope.injuryId = $stateParams.id;
  $scope.today = $filter('date')(new Date(), 'yyyy-MM-dd');
  $scope.severity = ['Minor', 'Moderate', 'Severe'];

  //Match start date & end date
  $scope.matchDate = function () {
    $scope.formData.resumeTrainingDate = $scope.formData.injuryDate;
  };

  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };

  //Submit Form
  $scope.submitData = function (formData) {
    $scope.showLoading('Please wait...', 15000);
    MyServices.updateInjury(formData, function (data) {
      if (data.value === true) {
        $scope.hideLoading();
        $scope.showLoading('Injury Edited', 2000);
        $state.go('app.injuries');
      } else {
        $scope.hideLoading();
        $scope.showLoading('Error Editing Injury', 2000);
      }
    });
  };

  //get one edit
  if ($stateParams.id) {
    MyServices.getOneInjury({
      _id: $stateParams.id
    }, function (response) {
      if (response.data) {
        $scope.formData = response.data;
        $scope.selectAthlete.array = $scope.formData.athlete = response.data.athlete;
        if ($scope.formData.resumeTrainingDate) {
          $scope.formData.injuryDate = new Date($scope.formData.injuryDate);
          $scope.formData.resumeTrainingDate = new Date($scope.formData.resumeTrainingDate);
        }
      } else {
        $scope.formData = {};
      }
    });
  }

  //Delete Popup
  $scope.deletePop = function (id) {
    $scope.myPopup = $ionicPopup.show({
      template: '<p>Are you sure want to delete the injury?</p>',
      title: 'Confirmation Message',
      scope: $scope,
      buttons: [{
        text: 'No'
      }, {
        text: '<b>Yes</b>',
        type: 'button-positive',
        onTap: function (e) {
          $scope.deleteInjury(id);
        }
      }]
    });
  };
  $scope.deleteInjury = function (id) {
    $scope.showLoading("Loading...", 10000);
    if (id) {
      MyServices.deleteInjury({
        _id: id
      }, function (data) {
        if (data.value) {
          $scope.hideLoading();
          $scope.showLoading("Injury Deleted", 2000);
          $state.go('app.injuries');

        } else {
          $scope.hideLoading();
          $scope.showLoading("Error Deleting Injury", 2000);
        }
      });
    }
  };

})

.controller('SearchCoachesCtrl', function ($scope, $ionicModal, MyServices, $ionicLoading, $ionicPopup) {
  $scope.currentPage = 1;
  var i = 0;
  $scope.allCoaches = [];
  $scope.search = {
    keyword: ""
  };
  $scope.more = {
    Data: true
  };
  $ionicModal.fromTemplateUrl('templates/modal/coach-filter.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.closeModal = function () {
    $scope.modal.hide();
  };
  $scope.openFilter = function () {
    $scope.modal.show();
  };

  $scope.filterData = [{
    name: 'Age',
    value: ['Less than 20 years', '21 - 25 years', '26 - 30 years', '31 - 35 years', '36 - 40 years', 'More than 40 years']
  }, {
    name: 'Coaching Focus',
    value: ['Sprinting', 'Middle Distance', 'Endurance', 'Throws', 'Jumps', 'Hurdles', 'Hill/Fell Running', 'Cross Country']
  }, {
    name: 'Gender',
    value: ['Male', 'Female']
  }, {
    name: 'Credentials',
    value: ['Level 1', 'Level 2', 'Level 3', 'Level 4']
  }, {
    name: 'Coaching Experience ',
    value: ['0 - 5 years', '6 - 10 years', '11 - 15 years', '16 - 20 years', 'More than 20 years']
  }];

  $scope.filterActive = 0;
  $scope.selectedFilters = {};

  $scope.changeFilter = function (data) {
    $scope.filterActive = data;
  };

  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };


  //On Change Search Function
  $scope.searchChange = function (keywordChange) {
    if (keywordChange === '') {
      $scope.allCoaches = [];
      $scope.showAllCoaches(keywordChange);
    } else {
      $scope.showAllCoaches(keywordChange);
    }
  };

  //Get All Competiton
  $scope.showAllCoaches = function (keywordChange) {
    if (keywordChange) {
      $scope.currentPage = 1;
      $scope.allCoaches = [];
    }
    MyServices.searchAllCoaches({
      page: $scope.currentPage,
      keyword: $scope.search.keyword
    }, ++i, function (data, ini) {
      if (ini == i) {
        if (data.value) {
          _.forEach(data.data.results, function (value) {
            $scope.allCoaches.push(value);
          });
          $scope.totalItems = data.data.total;
          if ($scope.totalItems > $scope.allCoaches.length) {
            $scope.currentPage++;
            $scope.$broadcast('scroll.infiniteScrollComplete');
          } else {
            $scope.more.Data = false;
          }
        } else {
          $scope.showLoading('Error Loading Injurys', 2000);
        }
      }
    });
  };

  //Load More
  $scope.loadMore = function () {
    $scope.showAllCoaches();
  };

})

.controller('SearchCoachesDetailCtrl', function ($scope, $ionicModal, $ionicLoading, $stateParams, MyServices, $ionicScrollDelegate, $ionicPopup) {
  $scope.coaches = {};

  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };
  $scope.showLoading('Please Wait...', 15000);
  //get one edit
  if ($stateParams.id) {
    MyServices.getOneCoaches({
      _id: $stateParams.id
    }, function (response) {
      if (response.data) {
        $scope.coaches = response.data;
        $scope.hideLoading();
      } else {
        $scope.showLoading('Error Loading Data!', 1000);
        $scope.coaches = {};
      }
    });
  }

  $scope.subscribeNow = function () {
    $scope.data = {};
    var myPopup = $ionicPopup.show({
      template: '<textarea auto-grow type="password" ng-model="data.message"><textarea>',
      title: '<h4>Request Subscription</h4>',
      subTitle: 'Please enter some message!',
      scope: $scope,
      buttons: [{
        text: 'Cancel'
      }, {
        text: '<b>Send</b>',
        type: 'button-positive',
        onTap: function (e) {
          console.log($scope.data.message);
        }
      }, ]
    });
  };

})

.controller('CoachCtrl', function ($scope, $ionicModal) {
  $scope.coach = [{
    name: 'Matt',
    surname: 'Smith',
    image: 'img/img-placeholder.png',
    acceptedDate: new Date('13 May, 2016'),
    renewalDate: new Date('12 June, 2016'),
    subscriptionType: 'Monthly'
  }, {
    name: 'John',
    surname: 'Damon',
    image: 'img/img-placeholder.png',
    acceptedDate: new Date('17 August, 2016'),
    renewalDate: new Date('16 August, 2017'),
    subscriptionType: 'Annual'
  }];
})

.controller('CoachDetailCtrl', function ($scope, $ionicModal, $ionicScrollDelegate) {
  $scope.coach = {
    name: 'James',
    surname: 'Coney',
    subscriptionFee: '30',
    image: 'james-coney',
    acceptedDate: new Date('13 November, 2016'),
    renewalDate: new Date('14 December, 2016'),
    subscriptionType: 'Monthly',
    yearsCoaching: '2',
    gender: 'Male',
    dob: new Date('24 April, 1973'),
    country: 'United Kingdom',
    credentials: 'Level 4',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod, turpis at auctor interdum, enim neque placerat diam, ac faucibus sem elit in sapien. Vivamus sodales et libero ac consectetur. Curabitur hendrerit lacus nisi, eget euismod felis gravida vitae. Nullam faucibus maximus eros, non facilisis magna tincidunt quis. Ut suscipit fringilla quam eu scelerisque. Proin orci lacus, condimentum eget urna at, aliquam pellentesque mauris. Aenean rutrum diam tortor, sed finibus nibh condimentum ac. Sed et blandit arcu.',
    coachingFocus: ['Sprinting', 'Hurdles'],
    specialisations: ['Children in Athletics', 'First aid'],
    experience: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    expertise: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    coachingAchievements: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  };
})

.controller('NotificationsCtrl', function ($scope, $ionicModal, $ionicScrollDelegate, $ionicPopup) {
  $scope.notifications = [{
    name: 'Loughborough International',
    type: 'Competition',
    startDate: '22nd May, 2017',
    endDate: '22nd May, 2017',
    keyCompetition: true
  }, {
    name: 'James',
    surname: 'Coney',
    type: 'coachAssign'
  }, {
    name: 'Use of Resistance Bands',
    type: 'blog'
  }, ];

  $scope.reason = function () {
    $scope.data = {};
    var myPopup = $ionicPopup.show({
      template: '<textarea auto-grow type="password" ng-model="data.message"><textarea>',
      title: '<h4>Reject Competition!</h4>',
      subTitle: 'Please enter some reason',
      scope: $scope,
      buttons: [{
        text: 'Cancel'
      }, {
        text: '<b>Reject</b>',
        type: 'button-assertive',
        onTap: function (e) {
          console.log($scope.data.message);
        }
      }, ]
    });
  };
})

.controller('TrainingDiaryCtrl', function ($scope, $ionicModal, $ionicLoading, uiCalendarConfig, MyServices) {

  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };

  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };

  //Feedback Modal
  $ionicModal.fromTemplateUrl('templates/modal/feedback.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function () {
    $scope.modal.show();
  };

  $scope.closeModal = function () {
    $scope.modal.hide();
  };

  $scope.getAthletePlan = function () {
    $scope.athleteData = [];
    MyServices.getAthleteMyPlans({}, function (data) {
      if (_.isArray(data.data)) {
        $scope.athleteData = data.data;
        parsePlanToCalender(data.data);
        $scope.hideLoading();
      } else {
        $scope.athleteData = [];
        $scope.showLoading('Loading...', 10000);
        $scope.hideLoading();
      }

    });
  };
  $scope.showLoading('Loading...', 10000);

  $scope.getAthletePlan();
  $scope.athleteData = [];
  $scope.trainingDiary = [];

  function parsePlanToCalender(Plans) {
    $scope.trainingDiary = [];
    $scope.downloads = Plans;
    _.each(Plans, function (plan) {
      var startDays = 0;
      _.each(plan.trainingForms, function (form) {
        form.trainingPlan = plan._id;
        var obj = {
          color: form.form.colorCode,
          events: [{
            title: "• " + form.form.name + " - " + plan.name,
            start: moment(plan.startDate).add(startDays, "days").toDate(),
            end: moment(plan.startDate).add(startDays, "days").add(form.duration, 'days').toDate(),
            allDay: true,
            planForm: form,
            colorCode: form.form.colorCode
          }],
        };
        startDays += form.duration;
        if (!_.isEmpty(form.comment)) {
          var obj2 = _.cloneDeep(obj);
          obj2.color = "#444";
          obj2.events[0].title = "Comment: " + form.comment;
          $scope.trainingDiary.push(obj2);
        }
        $scope.trainingDiary.push(obj);
      });
    });
    changePendingForm();
  }

  /* alert on eventClick */
  $scope.dairyClick = function (obj) {
    $scope.dayInfo = obj;
    $scope.formInfo = obj.planForm;

    if (obj.planForm.answer && obj.planForm.answer.length > 0) {
      $scope.feedback = obj.planForm.answer;
      $scope.makeDisable = true;
    } else {
      $scope.feedback = obj.planForm.form.formFields;
      $scope.makeDisable = false;
    }

    var m = moment(obj.end._d);
    if (moment().isSameOrAfter(m)) {
      $scope.openModal();
    }
  };

  $scope.dayClick = function (date, jsEvent, view) {
    console.log(date);
  };

  var changePendingForm = function () {
    console.log($scope.trainingDiary);
    $scope.pendingForm = [];
    _.each($scope.trainingDiary, function (events) {
      _.each(events.events, function (obj) {
        var m = moment(obj.end);
        if (!(obj.planForm.answer && obj.planForm.answer.length > 0) && moment().isSameOrAfter(m)) {
          $scope.pendingForm.push(obj);
        }
      });
    });
    console.log($scope.pendingForm);
  };

  $scope.submitFeedback = function () {
    var obj = {};
    obj.trainingPlan = $scope.formInfo.trainingPlan;
    obj.trainingForm = $scope.formInfo._id;
    obj.trainingFormStart = "";
    obj.trainingFormEnd = "";
    obj.answer = $scope.formInfo.form.formFields;
    MyServices.saveAnswer(obj, function (data) {
      $scope.showLoading('Feedback Submitted Successfully', 2000);
      $scope.getAthletePlan();
    });
  };

  /* Change View */
  $scope.activeView = 'month';
  $scope.changeView = function (view) {
    uiCalendarConfig.calendars.athleteDiary.fullCalendar('changeView', view);
    $scope.activeView = view;
  };

  //Navigate Buttons
  $scope.navigate = function (val) {
    uiCalendarConfig.calendars.athleteDiary.fullCalendar(val);
  };

  $scope.uiConfig = {
    calendar: {
      firstDay: 1,
      height: 450,
      editable: false,
      eventClick: $scope.dairyClick,
      viewRender: function (view) {
        $scope.viewTitle = view.title;
      }
    }
  };
})

;
