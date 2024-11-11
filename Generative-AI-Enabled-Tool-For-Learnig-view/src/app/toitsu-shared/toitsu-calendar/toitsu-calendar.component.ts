import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Optional, Output, Renderer2, SkipSelf, ViewChild} from '@angular/core';
import {ControlContainer} from '@angular/forms';
import {Calendar} from 'primeng/calendar';

@Component({
  selector: 'app-toitsu-calendar',
  templateUrl: './toitsu-calendar.component.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new Optional(), new SkipSelf(), ControlContainer]]
    }
  ]
})
export class ToitsuCalendarComponent implements OnInit, AfterViewInit {
  
  @Input() controlName: string;
  @Input() model: Date;
  @Output() modelChange = new EventEmitter<Date>();
  
  @Input() name: string;
  
  @Input() showTime = false;
  @Input() noIcon = false;
  @Input() inputId: string;
  @Input() disabled = false;
  
  localeEl: any;
  
  @ViewChild(Calendar) calendar: Calendar;
  
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}
  
  ngOnInit() {
  }
  
  ngAfterViewInit() {
    let button = this.elementRef.nativeElement.querySelector('button');
    if (button) {
      this.renderer.addClass(button, 'p-button-info');
    }
    // Να μη γίνεται focused το κουμπί για το άνοιγμα του date-picker, αν εμφανίζεται
    let icon = this.calendar.el.nativeElement.querySelector('.p-datepicker-trigger');
    if (icon) {
      icon.setAttribute('tabindex', '-1');
    }
  }
  
  onSelect() {
    this.modelChange.emit(this.model);
  }

  onBlur() {
    if (!this.calendar.overlayVisible) {
      this.modelChange.emit(this.model);
    }
  }

  onFocus(event) {
    // Κατά το focus να μην ανοίγει αυτόματα το date-picker
    if (event.type === 'focus') {
      this.calendar.overlayVisible = false;
    }
  }

  onKeyUpEnter() {
    // Ορισμός τρέχουσας ημερομηνίας στο πάτημα του enter
    if (!this.model) {
      this.calendar.onTodayButtonClick(new Event(''));
    }
    // Ορισμός model και στο πάτημα του enter εκτός από το blur
    if (!this.calendar.overlayVisible) {
      this.modelChange.emit(this.model);
    }
  }

  onKeyUpSpace() {
    // Εμφάνιση του date-picker με το πάτημα το space-button
    if (!this.calendar.overlayVisible) {
      this.calendar.overlayVisible = true;
    }
  }

  onClearClick() {
    // Καθαρισμός επιλεγμένης ημερομηνίας στο πάτημα του clear και ορισμός του model
    this.modelChange.emit(this.model);
  }

  clearDate() {
    // Καθαρισμός επιλεγμένης ημερομηνίας από το #customClearButton και ορισμός του model
    if (this.model) {
      this.calendar.onClearButtonClick(new Event(''));
    }
    this.onClearClick();
  }
  
  datepickerShown() {
    // Από μια έκδοση του primeNg και μετά, όταν έχουμε calendar μέσα σε πίνακα, χαλάει το datepicker popup.
    // Προσπαθεί να δώσει στο popup το πλάτος του πίνακα, δε χωράει και το τοποθετεί τέρμα αριστερά (ή πιο αριστερά αλλά όχι τέρμα) ορίζοντάς του style left.
    // Επιπλέον, αν φαίνεται και το κουμπί ανοίγματος του popup, (χωρίς το noIcon=true), εφαρμόζει style width σε όλα τα th και td μέσα στο popup.
    // Όλα αυτά συμβαίνουν μόνο αν υπάρχει το appendTo="body", αλλά δεν μπορούμε να μην το έχουμε, γιατί χωρίς αυτό το popup πέφτει πίσω από τον πίνακα.
    
    // Διόρθωση 1
    // Στο άνοιγμα του popup, βρίσκουμε τη x συντεταγμένη του native element και την ορίζουμε ως style left στο popup.
    let datepickerElements = document.getElementsByClassName('p-datepicker');
    
    let rect = this.elementRef.nativeElement.getBoundingClientRect();
    datepickerElements[0]['style'].left = rect.x + 'px';
    
    // Διόρθωση 2
    // Στο άνοιγμα του popup, αφαιρούμε το style width από όλα τα th και td του popup.
    let thElements = datepickerElements[0].getElementsByTagName('th');
    for (let i = 0; i < thElements.length; i++) {
      thElements[i]['style'].width = '';
    }
    let tdElements = datepickerElements[0].getElementsByTagName('td');
    for (let i = 0; i < tdElements.length; i++) {
      tdElements[i]['style'].width = '';
    }
  }
  
  datepickerClosed() {
    // Ως μέρος της διόρθωσης 1, είναι απαραίτητο στο κλείσιμο του popup να διαγράφουμε το element
    // γιατί διαφορετικά μπερδεύεται αν πατήσουμε για να ανοίξουμε δεύτερο popup όσο είναι ανοιχτό το πρώτο.
    let datepickerElements = document.getElementsByClassName('p-datepicker');
    while (datepickerElements.length > 0){
      datepickerElements[0].parentNode.removeChild(datepickerElements[0]);
    }
  }

}
