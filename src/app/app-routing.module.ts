import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'gown',
    loadChildren: () => import('./gown/gown.module').then( m => m.GownPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'womenbag',
    loadChildren: () => import('./womenbag/womenbag.module').then( m => m.WomenbagPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'shirt',
    loadChildren: () => import('./shirt/shirt.module').then( m => m.ShirtPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'jewellery',
    loadChildren: () => import('./jewellery/jewellery.module').then( m => m.JewelleryPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'details',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'wishlist',
    loadChildren: () => import('./wishlist/wishlist.module').then( m => m.WishlistPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then( m => m.OrderPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'order-cancel',
    loadChildren: () => import('./order-cancel/order-cancel.module').then( m => m.OrderCancelPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'address',
    loadChildren: () => import('./address/address.module').then( m => m.AddressPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'newaddress',
    loadChildren: () => import('./newaddress/newaddress.module').then( m => m.NewaddressPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'womencat',
    loadChildren: () => import('./womencat/womencat.module').then( m => m.WomencatPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'payment-confirm',
    loadChildren: () => import('./payment-confirm/payment-confirm.module').then( m => m.PaymentConfirmPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'bagdetail',
    loadChildren: () => import('./bagdetail/bagdetail.module').then( m => m.BagdetailPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'continue-shop',
    loadChildren: () => import('./continue-shop/continue-shop.module').then( m => m.ContinueShopPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'women',
    loadChildren: () => import('./women/women.module').then( m => m.WomenPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'shirtdetail',
    loadChildren: () => import('./shirtdetail/shirtdetail.module').then( m => m.ShirtdetailPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'verification',
    loadChildren: () => import('./verification/verification.module').then( m => m.VerificationPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'contactus',
    loadChildren: () => import('./contactus/contactus.module').then( m => m.ContactusPageModule),
    canActivate: [AuthGuard]

  },  {
    path: 'dealer',
    loadChildren: () => import('./dealer/dealer.module').then( m => m.DealerPageModule)
  },
  {
    path: 'visit',
    loadChildren: () => import('./visit/visit.module').then( m => m.VisitPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
