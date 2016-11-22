angular.module('starter.controllers', ['starter.services', 'checklist-model', 'chart.js', 'ui.rCalendar'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

})

.controller('RegistrationCtrl', function ($scope, $state, $ionicPopup, MyServices) {

  $scope.formData = {};

  $scope.gender = ['Male', 'Female'];

  MyServices.getCountries(function (data) {
    $scope.countries = data;
  });

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

  //Terms Popup
  $scope.submit = function (data) {
    var myPopup = $ionicPopup.show({
      template: '<p>Do you agree to the Coach Mentor Terms of Service and Privacy Policy?</p>',
      title: 'Terms & Conditions',
      scope: $scope,
      buttons: [{
        text: 'No'
      }, {
        text: '<b>Yes</b>',
        type: 'button-positive',
        onTap: function (e) {
          console.log(data);
          $state.go('app.profile');
        }
      }]
    });
  };

})

.controller('LoginCtrl', function ($scope, $ionicModal, $timeout) {
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
})

.controller('ForgotPasswordCtrl', function ($scope, $ionicModal, $timeout) {

})

.controller('ProfileCtrl', function ($scope, $ionicScrollDelegate) {
  $scope.profileData = {
    name: 'Usain',
    surname: 'Bolt',
    image: 'img/profile-pic.png',
    email: 'sachin@gmail.com',
    gender: 'Male',
    contact: '+919098765324',
    dob: new Date("September 7, 1989"),
    country: 'United Kingdom',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod, turpis at auctor interdum, enim neque placerat diam, ac faucibus sem elit in sapien. Vivamus sodales et libero ac consectetur. Curabitur hendrerit lacus nisi, eget euismod felis gravida vitae. Nullam faucibus maximus eros, non facilisis magna tincidunt quis. Ut suscipit fringilla quam eu scelerisque. Proin orci lacus, condimentum eget urna at, aliquam pellentesque mauris. Aenean rutrum diam tortor, sed finibus nibh condimentum ac. Sed et blandit arcu.',
    sport: 'Running',
    events: '400m Relay, 32KM Marathon',
    achievements: '-',
    previousSeasonReview: '-',
    personalGoals: '-'
  };

})

.controller('BlogCtrl', function ($scope) {
  $scope.data = [{
    title: 'The Strongest Woman I’ve Ever Known',
    author: 'Matt Damon',
    image: 'http://d2gd8qsu8uml9u.cloudfront.net/uploads/AP_4657469935821-680x384.jpg',
    date: '4th October 2015'
  }, {
    title: 'What You Dont Know About: Being a GM',
    author: 'Matt Damon',
    image: 'http://d2gd8qsu8uml9u.cloudfront.net/uploads/AP_234024109023-680x340.jpg',
    date: '3rd November 2015'
  }];

  $scope.like = 0;
  $scope.goLike = function (val) {
    $scope.like = val;
  };
  $scope.toggle = function () {
    $scope.searchBlog = !$scope.searchBlog;
  };
})

.controller('BlogDetailCtrl', function ($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('templates/modal/add-athlete.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });

  $scope.closeModal = function () {
    $scope.modal.hide();
  };

  $scope.shareAthlete = function () {
    $scope.modal.show();
  };
  $scope.like = 0;
  $scope.goLike = function (val) {
    $scope.like = val;
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

  $ionicModal.fromTemplateUrl('templates/modal/group-chat.html', {
    id: 2,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modalGroup = modal;
  });
  $scope.newGroupChat = function () {
    $scope.modalGroup.show();
  };

  $scope.closeModal = function () {
    $scope.modalGroup.hide();
    $scope.modalChat.hide();
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
    text: 'Hello! Welcome to Coach Mentor!',
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

.controller('CompetitionDetailCtrl', function ($scope, $ionicModal) {

  $ionicModal.fromTemplateUrl('templates/modal/add-athlete.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });

  $scope.closeModal = function () {
    $scope.modal.hide();
  };

  $scope.addAthlete = function () {
    $scope.modal.show();
  };

  $scope.data = {
    name: 'Nike Marathon London',
    startDate: new Date("January 14, 2017 11:13:00"),
    endDate: new Date("January 15, 2017 11:13:00"),
    keyCompetition: true,
    assignedAthletes: [{
      name: 'Van Gough',
      img: 'img/img-placeholder.png'
    }, {
      name: 'Samuel Trump',
      img: 'img/img-placeholder.png'
    }],
  };

  $scope.isDisabled = true;

})

.controller('AnalyticsCtrl', function ($scope, $ionicModal) {
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
})

.controller('TrainingDiaryCtrl', function ($scope, $ionicModal) {

  $scope.calendar = {};
  $scope.changeMode = function (mode) {
    $scope.calendar.mode = mode;
  };

  $scope.calendar.eventSource = [{
    id: 1,
    type: 'competition',
    title: 'Run Happy Marathon',
    startTime: new Date("October 14, 2016 11:00:00"),
    endTime: new Date("October 14, 2016 23:15:00"),
    allDay: false
  }, {
    id: 1,
    type: 'Injuries',
    title: 'London Cycling Tour',
    startTime: new Date("October 16, 2016 11:13:00"),
    endTime: new Date("October 16, 2016 14:13:00"),
    allDay: false
  }];

  $scope.onEventSelected = function (event) {
    // console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    console.log(event);
  };

  $scope.onViewTitleChanged = function (title) {
    $scope.viewTitle = title;
  };

  $scope.today = function () {
    $scope.calendar.currentDate = new Date();
  };

  $scope.isToday = function () {
    var today = new Date(),
      currentCalendarDate = new Date($scope.calendar.currentDate);

    today.setHours(0, 0, 0, 0);
    currentCalendarDate.setHours(0, 0, 0, 0);
    return today.getTime() === currentCalendarDate.getTime();
  };

})

.controller('InjuriesCtrl', function ($scope, $ionicModal) {
  $scope.data = [{
    name: 'Leg Injury',
    injuryDate: new Date("January 14, 2017 11:13:00"),
    severity: 'Minor',
    resumeDate: new Date("January 15, 2017 11:13:00"),
    prescribingPractitioner: ''
  }, {
    name: 'Arm Injury',
    injuryDate: new Date("January 14, 2017 11:13:00"),
    severity: 'Minor',
    resumeDate: new Date("January 15, 2017 11:13:00"),
    prescribingPractitioner: ''
  }];

})

.controller('InjuriesCreateCtrl', function ($scope, $ionicModal) {
  $scope.data = {};
  $scope.title = 'Create';
  $scope.severity = ['Minor', 'Moderate', 'Severe'];

})

.controller('InjuriesDetailCtrl', function ($scope, $ionicModal) {
  $scope.data = {
    name: 'Leg Injury',
    injuryDate: new Date("January 14, 2017 11:13:00"),
    severity: 'Minor',
    resumeDate: new Date("January 15, 2017 11:13:00"),
    prescribingPractitioner: ''
  };
  $scope.title = 'Edit';
  $scope.severity = ['Minor', 'Moderate', 'Severe'];
})

.controller('EditProfileCtrl', function ($scope, $state, MyServices, $ionicModal, $filter) {
  $scope.formData = {
    name: 'Usain',
    surname: 'Bolt',
    image: 'img/profile-pic.png',
    email: 'sachin@gmail.com',
    gender: 'Male',
    contact: '+919098765324',
    dob: new Date("September 7, 1989"),
    country: 'United Kingdom',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod, turpis at auctor interdum, enim neque placerat diam, ac faucibus sem elit in sapien. Vivamus sodales et libero ac consectetur. Curabitur hendrerit lacus nisi, eget euismod felis gravida vitae. Nullam faucibus maximus eros, non facilisis magna tincidunt quis. Ut suscipit fringilla quam eu scelerisque. Proin orci lacus, condimentum eget urna at, aliquam pellentesque mauris. Aenean rutrum diam tortor, sed finibus nibh condimentum ac. Sed et blandit arcu.',
    sport: 'Running',
    events: '400m Relay, 32KM Marathon',
    achievements: '-',
    previousSeasonReview: '-',
    personalGoals: '-'
  };

  $scope.dummyPassword = '12345678';

  $scope.submit = function (data) {
    console.log(data);
    $state.go('app.profile');
  };

  $scope.gender = ['Male', 'Female'];

  MyServices.getCountries(function (data) {
    $scope.countries = data;
  });

  $ionicModal.fromTemplateUrl('templates/modal/password.html', {
    id: 1,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modalPassword = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modal/price.html', {
    id: 2,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modalPrice = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modal/coaching-limit.html', {
    id: 3,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modalLimit = modal;
  });
  $scope.changePassword = function () {
    $scope.modalPassword.show();
  };
  $scope.changePrice = function () {
    $scope.modalPrice.show();
  };
  $scope.changeLimit = function () {
    $scope.modalLimit.show();
  };
  $scope.closeModal = function () {
    $scope.modalPassword.hide();
    $scope.modalPrice.hide();
    $scope.modalLimit.hide();
  };

  $scope.rangePrice = function (val) {
    var intVal = parseInt(val);
    if (intVal >= 1 && intVal <= 500) {
      $scope.formData.askingPrice = intVal;
    }
  };

  $scope.rangeLimit = function (val) {
    var intVal = parseInt(val);
    if (intVal >= 1 && intVal <= 200) {
      $scope.formData.coachingLimit = intVal;
    }
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

})

.controller('SearchCoachesCtrl', function ($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('templates/modal/coach.html', {
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

  $scope.coaches = [{
    name: 'Matt',
    surname: 'Smith',
    image: 'img/img-placeholder.png',
    credentials: 'Level 2',
    full: false
  }, {
    name: 'John',
    surname: 'Damon',
    image: 'img/img-placeholder.png',
    credentials: 'Level 1',
    full: true
  }];

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

})

.controller('SearchCoachesDetailCtrl', function ($scope, $ionicModal, $ionicScrollDelegate, $ionicPopup) {

  $scope.coaches = {
    name: 'Matt',
    surname: 'Smith',
    image: 'img/img-placeholder.png',
    yearsCoaching: '2',
    gender: 'Male',
    dob: new Date('24 April, 1973'),
    country: 'United Kingdom',
    askingPrice: '100',
    credentials: 'Level 2',
    subscriptionFull: false,
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod, turpis at auctor interdum, enim neque placerat diam, ac faucibus sem elit in sapien. Vivamus sodales et libero ac consectetur. Curabitur hendrerit lacus nisi, eget euismod felis gravida vitae. Nullam faucibus maximus eros, non facilisis magna tincidunt quis. Ut suscipit fringilla quam eu scelerisque. Proin orci lacus, condimentum eget urna at, aliquam pellentesque mauris. Aenean rutrum diam tortor, sed finibus nibh condimentum ac. Sed et blandit arcu.',
    coachingFocus: ['Sprinting', 'Hurdles'],
    specialisations: ['Children in Athletics', 'First aid']
  };

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
    name: 'Matt',
    surname: 'Smith',
    subscriptionFee: '200',
    image: 'img/img-placeholder.png',
    acceptedDate: new Date('13 May, 2016'),
    renewalDate: new Date('12 June, 2016'),
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
    name: 'Nike Marathon London',
    type: 'Competition',
    startDate: '14 January, 2017',
    endDate: '15 January, 2017',
    keyCompetition: true
  }, {
    name: 'Mathew',
    surname: 'Dodge',
    type: 'coachAssign'
  }, {
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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

;
