angular.module('underscore', [])
.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

angular.module('tickitup', [
  'ionic',
  'underscore',
  'angularMoment',
  'ngIOS9UIWebViewPatch'
])


// Enable native scrolls for Android platform only,
// as you see, we're disabling jsScrolling to achieve this.
.config(function ($ionicConfigProvider) {
  if (ionic.Platform.isAndroid()) {
    $ionicConfigProvider.scrolling.jsScrolling(false);
  }
})

.run(function($ionicPlatform, $rootScope, $ionicHistory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  //SIDE MENU ROUTES
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "views/app/side-menu.html",
    controller: 'AppCtrl'
  })
      
      .state('app.misCompras', {
        url:"/mis-compras",
        views: {
          'menuContent': {
            templateUrl: "views/app/mis-compras.html",
            controller: 'misComprasController'
          }
        }
      })

      .state('app.qr', {
        url: "/qr/:ticketId",
        views: {
          'menuContent': {
            templateUrl: "views/app/qr-code.html",
            controller: 'qrCodeController'
          }
        }
      })


  .state('app.settings', {
    url: "/settings",
    views: {
      'menuContent': {
        templateUrl: "views/app/profile/settings.html",
        controller: 'SettingsCtrl'
      }
    }
  })

  .state('app.shop', {
    url: "/shop",
    abstract: true,
    views:{
      'menuContent':{
        templateUrl: "views/app/shop/shop.html"
      }
    }
  })

  .state('app.shop.home', {
    url: "/",
    views: {
      'shop-home': {
        templateUrl: "views/app/shop/shop-home.html",
        controller: 'shopController'
      }
    }
  })

  .state('app.shop.diversion', {
    url: "/diversion",
    views: {
      'shop-diversion': {
        templateUrl: "views/app/shop/shop-diversion.html",
        controller: 'shopDiversionController'
      }
    }
  })

  .state('app.shop.mercado', {
    url: "/mercado",
    views: {
      'shop-mercado': {
        templateUrl: "views/app/shop/shop-mercado.html",
        controller: 'shopMercadoController'
      }
    }
  })

      .state('app.shop.electrodomesticos', {
        url: "/electrodomesticos",
        views: {
          'shop-electrodomesticos': {
            templateUrl: "views/app/shop/shop-electrodomesticos.html",
            controller: 'shopElectrodomesticosController'
          }
        }
      })

      .state('app.shop.restaurante', {
        url: "/restaurante",
        views: {
          'shop-restaurante': {
            templateUrl: "views/app/shop/shop-restaurante.html",
            controller: 'shopRestaurantesController'
          }
        }
      })

      .state('app.shop.salud', {
        url: "/salud",
        views: {
          'shop-salud': {
            templateUrl: "views/app/shop/shop-salud.html",
            controller: 'shopSaludController'
          }
        }
      })

  .state('app.cart', {
    url: "/cart",
    views: {
      'menuContent': {
        templateUrl: "views/app/shop/cart.html",
        controller: 'shoppingCartController'
      }
    }
  })

  .state('app.shipping-address', {
    url: "/shipping-address",
    views: {
      'menuContent': {
        templateUrl: "views/app/shop/shipping-address.html",
        controller: "CheckoutCtrl"
      }
    }
  })

  .state('app.checkout', {
    url: "/checkout",
    views: {
      'menuContent': {
        templateUrl: "views/app/shop/checkout.html",
        controller: "CheckoutCtrl"
      }
    }
  })

  .state('app.product-detail', {
    url: "/product/:productId",
    views: {
      'menuContent': {
        templateUrl: "views/app/shop/product-detail.html",
        controller: 'productController'
      }
    }
  })
      
  .state('main', {
    url: "/main",
    templateUrl: "views/auth/main.html",
    controller: 'mainController'
  })

  .state('create-account', {
    url: "/create-account",
    templateUrl: "views/auth/create-account.html",
    controller: 'createAccountController'
  })

  .state('login', {
    url: "/login",
    templateUrl: "views/auth/login.html",
    controller: 'loginController'
  })
;
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/main');
  // $urlRouterProvider.otherwise('/app/feed');
})

;
