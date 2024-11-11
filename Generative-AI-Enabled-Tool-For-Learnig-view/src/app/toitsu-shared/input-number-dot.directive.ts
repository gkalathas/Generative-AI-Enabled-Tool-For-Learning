import {Directive, HostListener} from '@angular/core';
import {InputNumber} from 'primeng/inputnumber';

/**
 * Directive για το p-inputNumber που έχει δηλωμένο το ελληνικό format (locale="de-DE").
 * Όταν ο κέρσορας είναι πριν την υποδιαστολή και πατηθεί η τελεία, ο κέρσορας μετακινείται μετά από αυτή.
 */
@Directive({
  selector: '[appInputNumberDot]'
})
export class InputNumberDotDirective {
  
  constructor(private inputNumber: InputNumber) {}
  
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    // Αν έχει πατηθεί η τελεία
    if (event.key === '.') {
      
      // Το input το παίρνουμε κάνοντας inject το InputNumber component του primeNG
      let input = this.inputNumber.input.nativeElement;
      
      // Από την τιμή που φαίνεται στο input βρίσκουμε τη θέση της υποδιαστολής
      let value = this.inputNumber.lastValue;
      let commaPosition = value.indexOf(',');
      
      // Η τρέχουσα θέση του κέρσορα
      let cursorPosition = input.selectionStart;
      
      // Αν ο κέρσορας βρίσκεται πριν την υποδιαστολή
      if (commaPosition === cursorPosition) {
        // Μετακίνηση του κέρσορα μετά την υποδιαστολή
        input.setSelectionRange(commaPosition + 1, commaPosition + 1);
      }
    }
  }
}
