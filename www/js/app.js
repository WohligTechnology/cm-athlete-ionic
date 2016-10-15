// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleBlackTranslucent();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('registration', {
    url: '/registration',
    templateUrl: 'templates/registration.html',
    controller: 'RegistrationCtrl'
  })

  .state('forgot-password', {
    url: '/forgot-password',
    templateUrl: 'templates/forgot-password.html',
    controller: 'ForgotPasswordCtrl'
  })

  .state('app.edit-profile', {
    url: '/edit-profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile-edit.html',
        controller: 'EditProfileCtrl'
      }
    }
  })

  .state('app.blog', {
    url: '/blog',
    views: {
      'menuContent': {
        templateUrl: 'templates/blog.html',
        controller: 'BlogCtrl'
      }
    }
  })

  .state('app.blogdetail', {
    url: '/blog/detail',
    views: {
      'menuContent': {
        templateUrl: 'templates/blog-detail.html',
        controller: 'BlogDetailCtrl'
      }
    }
  })

  .state('app.chat', {
    url: '/chat',
    views: {
      'menuContent': {
        templateUrl: 'templates/chat.html',
        controller: 'ChatCtrl'
      }
    }
  })

  .state('app.chatdetail', {
    url: '/chat/detail',
    views: {
      'menuContent': {
        templateUrl: 'templates/chat-detail.html',
        controller: 'ChatDetailCtrl'
      }
    }
  })

  .state('app.chat-group', {
    url: '/chat-group',
    views: {
      'menuContent': {
        templateUrl: 'templates/chat-group.html',
        controller: 'ChatGroupCtrl'
      }
    }
  })

  .state('app.mentees', {
    url: '/mentees',
    views: {
      'menuContent': {
        templateUrl: 'templates/mentees.html',
        controller: 'MenteesCtrl'
      }
    }
  })

  .state('app.mentees-detail', {
    url: '/mentees/detail',
    views: {
      'menuContent': {
        templateUrl: 'templates/mentees-detail.html',
        controller: 'MenteesDetailCtrl'
      }
    }
  })

  .state('app.competition', {
    url: '/competition',
    views: {
      'menuContent': {
        templateUrl: 'templates/competition.html',
        controller: 'CompetitionCtrl'
      }
    }
  })

  .state('app.charts', {
    url: '/charts',
    views: {
      'menuContent': {
        templateUrl: 'templates/charts.html',
        controller: 'ChartsCtrl'
      }
    }
  })

  .state('app.competition-create', {
    url: '/competition-create',
    views: {
      'menuContent': {
        templateUrl: 'templates/competition-create.html',
        controller: 'CompetitionCreateCtrl'
      }
    }
  })

  .state('app.competition-detail', {
    url: '/competition-detail',
    views: {
      'menuContent': {
        templateUrl: 'templates/competition-create.html',
        controller: 'CompetitionDetailCtrl'
      }
    }
  })

  .state('app.injuries', {
    url: '/injuries',
    views: {
      'menuContent': {
        templateUrl: 'templates/injuries.html',
        controller: 'InjuriesCtrl'
      }
    }
  })


  .state('app.injuries-create', {
    url: '/injuries-create',
    views: {
      'menuContent': {
        templateUrl: 'templates/injuries-create.html',
        controller: 'InjuriesCreateCtrl'
      }
    }
  })

  .state('app.injuries-detail', {
    url: '/injuries/detail',
    views: {
      'menuContent': {
        templateUrl: 'templates/injuries-create.html',
        controller: 'InjuriesDetailCtrl'
      }
    }
  })


  .state('app.search-coaches', {
    url: '/search-coaches',
    views: {
      'menuContent': {
        templateUrl: 'templates/search-coaches.html',
        controller: 'SearchCoachesCtrl'
      }
    }
  })

  .state('app.search-coaches-detail', {
    url: '/search-coaches/detail',
    views: {
      'menuContent': {
        templateUrl: 'templates/search-coaches-detail.html',
        controller: 'SearchCoachesDetailCtrl'
      }
    }
  })

  .state('app.training-diary', {
    url: '/training-diary',
    views: {
      'menuContent': {
        templateUrl: 'templates/training-diary.html',
        controller: 'TrainingDiaryCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
})

.filter('ageConvert', function () {
  function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  function monthDiff(d1, d2) {
    if (d1 < d2) {
      var months = d2.getMonth() - d1.getMonth();
      return months <= 0 ? 0 : months;
    }
    return 0;
  }
  return function (birthdate) {
    var age = calculateAge(birthdate);
    if (age === 0)
      return monthDiff(birthdate, new Date()) + ' months';
    return age + ' years';
  };
})

;