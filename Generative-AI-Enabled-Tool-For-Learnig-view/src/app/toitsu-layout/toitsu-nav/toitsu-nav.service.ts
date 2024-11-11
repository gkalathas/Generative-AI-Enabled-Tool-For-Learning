import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {AppComponent} from '../../app.component';
import {TranslateService} from '@ngx-translate/core';
import {ToitsuNavitemComponent} from './toitsu-navitem.component';

@Injectable({providedIn: 'root'})
export class ToitsuNavService {

  constructor(private router: Router, private translate: TranslateService) {
  }

  model: any[];
  layoutModel: any[];

  private menuSource = new Subject<string>();
  private resetSource = new Subject();

  menuSource$ = this.menuSource.asObservable();
  resetSource$ = this.resetSource.asObservable();

  navItems: ToitsuNavitemComponent[] = [];

  onMenuStateChange(key: string) {
    this.menuSource.next(key);
  }
  
  reset() {
    this.resetSource.next(undefined);
  }
  
  initializeModel() {
    this.model = [
      {
        label: this.translate.instant('group.training'), icon: 'fa fa-rocket',
        needPermission: false,
        items: [
          {
            label: this.translate.instant('training.demo'), icon: 'fa fa-list', routerLink: ['/training/demo/list'],
          }
        ]
      },
    ];
    
    this.model.push(...this.layoutModel);
  }

  initializeLayoutModel(app: AppComponent) {
    this.layoutModel = [
      {
        label: this.translate.instant('global.display'), icon: 'fa fa-paint-brush',
        items: [
          {
            label: 'Themes', icon: 'fa fa-paint-brush',
            items: [
              {
                label: 'Solid',
                icon: 'fa fa-paint-brush',
                items: [
                  {
                    label: 'Blue', icon: 'fa fa-paint-brush',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-square-o',
                        command: (event) => app.changeTheme('blue', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('blue', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('blue', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Cyan', icon: 'fa fa-paint-brush',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-square-o',
                        command: (event) => app.changeTheme('cyan', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('cyan', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('cyan', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Green', icon: 'fa fa-paint-brush',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-square-o',
                        command: (event) => app.changeTheme('green', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('green', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('green', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Yellow', icon: 'fa fa-paint-brush',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-square-o',
                        command: (event) => app.changeTheme('yellow', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('yellow', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('yellow', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Purple', icon: 'fa fa-paint-brush',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-square-o',
                        command: (event) => app.changeTheme('purple', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('purple', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('purple', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Pink', icon: 'fa fa-paint-brush',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-square-o',
                        command: (event) => app.changeTheme('pink', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('pink', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('pink', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Blue Grey', icon: 'fa fa-paint-brush',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-square-o',
                        command: (event) => app.changeTheme('bluegrey', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('bluegrey', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('bluegrey', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Teal', icon: 'fa fa-paint-brush',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-square-o',
                        command: (event) => app.changeTheme('teal', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('teal', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('teal', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Orange', icon: 'fa fa-paint-brush',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-square-o',
                        command: (event) => app.changeTheme('orange', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('orange', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('orange', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Grey', icon: 'fa fa-paint-brush',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-square-o',
                        command: (event) => app.changeTheme('grey', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('grey', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('grey', 'gradient')
                      }
                    ]
                  }
                ]
              },
              {
                label: 'Special',
                icon: 'fa fa-paint-brush',
                items: [
                  {
                    label: 'Cappuccino', icon: 'fa fa-picture-o',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-square-o',
                        command: (event) => app.changeTheme('cappuccino', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('cappuccino', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('cappuccino', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Montreal', icon: 'fa fa-picture-o',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-square-o',
                        command: (event) => app.changeTheme('montreal', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('montreal', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('montreal', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Hollywood', icon: 'fa fa-picture-o',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-square-o',
                        command: (event) => app.changeTheme('hollywood', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('hollywood', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('hollywood', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Peak', icon: 'fa fa-picture-o',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-square-o',
                        command: (event) => app.changeTheme('peak', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('peak', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('peak', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Alive', icon: 'fa fa-certificate',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-square-o',
                        command: (event) => app.changeTheme('alive', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('alive', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('alive', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Emerald', icon: 'fa fa-certificate',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-square-o',
                        command: (event) => app.changeTheme('emerald', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('emerald', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('emerald', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Ash', icon: 'fa fa-certificate',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-square-o',
                        command: (event) => app.changeTheme('ash', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('ash', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('ash', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Noir', icon: 'fa fa-certificate',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-square-o',
                        command: (event) => app.changeTheme('noir', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('noir', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('noir', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Mantle', icon: 'fa fa-certificate',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-square-o',
                        command: (event) => app.changeTheme('mantle', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('mantle', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('mantle', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Predawn', icon: 'fa fa-certificate',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-square-o',
                        command: (event) => app.changeTheme('predawn', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('predawn', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-square',
                        command: (event) => app.changeTheme('predawn', 'gradient')
                      }
                    ]
                  },
                ]
              }
            ]
          },
          {
            label: 'Menu Modes', icon: 'fa fa-bars',
            items: [
              {
                label: 'Static Menu',
                icon: 'fa fa-bars',
                command: () => app.changeLayoutMode('static')
              },
              {
                label: 'Overlay Menu',
                icon: 'fa fa-bars',
                command: () => app.changeLayoutMode('overlay')
              },
              {label: 'Slim Menu', icon: 'fa fa-bars', command: () => app.changeLayoutMode('slim')},
              {
                label: 'Horizontal Menu',
                icon: 'fa fa-bars',
                command: () => app.changeLayoutMode('horizontal')
              }
            ]
          }
        ]
      }
    ];
  }

  setActiveMenu() {
    for (let navItem of this.navItems) {
      if (navItem.item.routerLink) {
        navItem.updateActiveStateFromRoute();
      } else {
        navItem.updateActiveStateForNonFinalItem();
      }
    }
  }
}
