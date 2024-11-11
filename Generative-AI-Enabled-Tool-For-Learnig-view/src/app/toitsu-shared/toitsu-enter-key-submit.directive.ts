import {Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Directive({
  selector: '[appToitsuEnterKeySubmit]'
})
export class ToitsuEnterKeySubmitDirective implements OnInit {
  @Output() enterKeyPressed: EventEmitter<void> = new EventEmitter<void>();

  @Input() shouldFocus: boolean = true;
  @Input() shouldEmit: boolean = true;

  constructor(private el: ElementRef) {
  }


  @HostListener('keyup.enter', ['$event'])
  onEnter(event: Event): void {
    if (this.shouldEmit) {
      const dropdown = this.findDropdownParent(event.target as HTMLElement);
      if (dropdown) {
        const isOpen = dropdown.classList.contains('p-dropdown-open');
        const inputElement = dropdown.querySelector('input');

        if (isOpen || (inputElement instanceof HTMLInputElement && inputElement.value)) {
          this.enterKeyPressed.emit();  
        } else {
          this.enterKeyPressed.emit();
          if (inputElement instanceof HTMLInputElement && inputElement.tabIndex > -1) {
            inputElement.focus();
          }
        }
      } else {
        this.enterKeyPressed.emit();
      }
    }
  }

  private findDropdownParent(element: HTMLElement): HTMLElement | null {
    while (element) {
      if (element.classList.contains('p-dropdown')) {
        return element;
      }
      element = element.parentElement as HTMLElement;
    }
    return null;
  }

  ngOnInit(): void {
    if (this.shouldFocus) {
      setTimeout(() => {
        const inputElement = this.el.nativeElement.querySelector('.p-inputtext');
        if (inputElement) {
          inputElement.focus();
        }
      });
    }
  }
}

