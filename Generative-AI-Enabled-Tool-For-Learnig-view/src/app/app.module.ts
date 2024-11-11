import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule, JsonPipe} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {BlockUIModule} from 'primeng/blockui';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ToastModule} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {DividerModule} from 'primeng/divider';
import {OrderListModule} from 'primeng/orderlist';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {TooltipModule} from 'primeng/tooltip';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {appRoutes} from './app-routing.module';
import {toitsuTranslateLoader} from './toitsu-shared/toitsu-translate/toitsu-translate-loader';
import {toitsuTranslateInitializer} from './toitsu-shared/toitsu-translate/toitsu-translate-initializer';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {AppComponent} from './app.component';
import {ToitsuNavComponent} from './toitsu-layout/toitsu-nav/toitsu-nav.component';
import {ToitsuNavitemComponent} from './toitsu-layout/toitsu-nav/toitsu-navitem.component';
import {ToitsuHeaderComponent} from './toitsu-layout/toitsu-header/toitsu-header.component';
import {ToitsuFooterComponent} from './toitsu-layout/toitsu-footer/toitsu-footer.component';
import {ToitsuBreadcrumbComponent} from './toitsu-layout/toitsu-breadcrumb/toitsu-breadcrumb.component';
import {IndexComponent} from './toitsu-layout/index/index.component';
import {ToitsuGoToTopComponent} from './toitsu-shared/toitsu-go-to-top/toitsu-go-to-top.component';
import {RippleModule} from 'primeng/ripple';

@NgModule({
    declarations: [
        AppComponent,
        ToitsuNavComponent,
        ToitsuNavitemComponent,
        ToitsuHeaderComponent,
        ToitsuFooterComponent,
        ToitsuBreadcrumbComponent,
        IndexComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (toitsuTranslateLoader),
        deps: [HttpClient]
      }
    }),
    KeycloakAngularModule,

    CommonModule,
    BlockUIModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    ToastModule,
    DividerModule,
    OrderListModule,
    OverlayPanelModule,
    TooltipModule,
    ToitsuGoToTopComponent,
    RippleModule
  ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: toitsuTranslateInitializer,
            deps: [TranslateService, Injector],
            multi: true
        },
        MessageService,
        ConfirmationService,
        DialogService,
        JsonPipe
    ],
    exports: [
        ToitsuNavitemComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
