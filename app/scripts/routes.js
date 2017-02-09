'use strict';
/**
 * @ngdoc overview
 * @name reviewSystemApp:routes
 * @description
 * # routes.js
 *
 * Configure routes for use with Angular, and apply authentication security
 * Add new routes using `yo angularfire-express:route` with the optional --auth-required flag.
 *
 * Any controller can be secured so that it will only load if user is logged in by
 * using `whenAuthenticated()` in place of `when()`. This requires the user to
 * be logged in to view this route, and adds the current user into the dependencies
 * which can be injected into the controller. If user is not logged in, the promise is
 * rejected, which is handled below by $routeChangeError
 *
 * Any controller can be forced to wait for authentication to resolve, without necessarily
 * requiring the user to be logged in, by adding a `resolve` block similar to the one below.
 * It would then inject `user` as a dependency. This could also be done in the controller,
 * but abstracting it makes things cleaner (controllers don't need to worry about auth state
 * or timing of displaying its UI components; it can assume it is taken care of when it runs)
 *
 *   resolve: {
 *     user: ['Auth', function($firebaseAuth) {
 *       return Auth.$getAuth();
 *     }]
 *   }
 *
 */
angular.module('reviewSystemApp')

/**
 * Adds a special `whenAuthenticated` method onto $routeProvider. This special method,
 * when called, invokes Auth.$requireAuth() service (see Auth.js).
 *
 * The promise either resolves to the authenticated user object and makes it available to
 * dependency injection (see AccountCtrl), or rejects the promise if user is not logged in,
 * forcing a redirect to the /login page
 */

/*
 * Commented due to issues with the new SDK
 *
 .config(['$routeProvider', 'SECURED_ROUTES', function ($routeProvider, SECURED_ROUTES) {

 // credits for this idea: https://groups.google.com/forum/#!msg/angular/dPr9BpIZID0/MgWVluo_Tg8J
 // unfortunately, a decorator cannot be use here because they are not applied until after
 // the .config calls resolve, so they can't be used during route configuration, so we have
 // to hack it directly onto the $routeProvider object
 /*
 $routeProvider.whenAuthenticated = function (path, route) {
 route.resolve = route.resolve || {};
 route.resolve.user = ['auth', function (auth) {
 return auth.$requireSignIn();
 }];
 $routeProvider.when(path, route);
 SECURED_ROUTES[path] = true;
 return $routeProvider;
 };
 }])
 */

// configure views; whenAuthenticated adds a resolve method to ensure users authenticate
// before trying to access that route
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/404');

    $stateProvider.state('main', {
      url: '/',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    });

    $stateProvider.state('software', {
      url: '/software/:softwareName/:reviewId',
      templateUrl: 'views/software.html',
      controller: 'SoftwareController'
    });

    $stateProvider.state('review', {
      url: '/software/:softwareName/:reviewId',
      templateUrl: 'views/review.html',
      controller: 'ReviewController'
    });

    $stateProvider.state('add', {
      url: '/add/:softwareName',
      templateUrl: 'views/add.html',
      controller: 'AddReviewController'
    });

    $stateProvider.state('search', {
      url: '/search/:query',
      templateUrl: 'views/search.html',
      controller: 'SearchController'
    });
    
    $stateProvider.state('404', {
      url: '/404',
      templateUrl: '/404.html'
    });

    $stateProvider.state('add-software', {
      url: '/add-software',
      templateUrl: 'views/add-software.html',
      controller: 'AddSoftwareController'
    });
  }])

  /**
   * Apply some route security. Any route's resolve method can reject the promise with
   * 'AUTH_REQUIRED' to force a redirect. This method enforces that and also watches
   * for changes in auth status which might require us to navigate away from a path
   * that we can no longer view.
   */
  .run(['$rootScope', '$location', /*'loginRedirectPath',*/ '$state',
    function ($rootScope, $location, /*loginRedirectPath,*/ event, next, previous, error, $state) {
      // watch for login status changes and redirect if appropriate
      // auth.$onAuthStateChanged(check);

      // some of our routes may reject resolve promises with the special {authRequired: true} error
      // this redirects to the login page whenever that is encountered
      // $rootScope.$on('$routeChangeError', function (event, next, previous, error) {
      //   if (error === 'AUTH_REQUIRED') {
      //     $location.path(loginRedirectPath);
      //   }
      // });
    }
  ]);
