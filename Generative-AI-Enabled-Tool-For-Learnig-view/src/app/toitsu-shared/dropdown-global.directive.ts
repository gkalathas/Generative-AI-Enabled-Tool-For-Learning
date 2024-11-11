import {Attribute, Directive} from '@angular/core';
import {Dropdown} from 'primeng/dropdown';

/**
 * Directive που εφαρμόζεται αυτόματα σε όλα τα p-dropdown
 */
@Directive({
  selector: 'p-dropdown'
})
export class DropdownGlobalDirective {
  
  hasAdd = false;
  
  constructor(
    private dropdown: Dropdown,
    @Attribute('data-customMinHeightClass') private customMinHeightClass
  ) {
    setTimeout(() => {
      // Μόνο αν έχει δηλωθεί virtual scroll
      if (dropdown.virtualScroll) {
        
        // Αν το empty filter template έχει τιμή, σημαίνει πως υπάρχει το κουμπί 'Προσθήκη'.
        this.hasAdd = !!dropdown.emptyFilterTemplate;
        
        // Εφαρμογή διορθώσεων κατά το άνοιγμα του dropdown και κατά το φιλτράρισμα
        dropdown.onShow.subscribe(event => this.fixHeightOnOpen());
        dropdown.onFilter.subscribe(event => this.setMinHeight());
        
        // Το customMinHeightClass είναι προαιρετικό custom attribute που δηλώνεται πάνω στο p-dropdown.
        // Μπορεί να χρησιμοποιηθεί για να καθορίσουμε διαφορετικό ελάχιστο ύψος σε συγκεκριμένα dropdown που μπορεί να έχουν μεγαλύτερα options.
      }
    });
    
    // Με το παρακάτω απενεργοποιούμε το άνοιγμα του dropdown στο πάτημα του Enter
    dropdown.el.nativeElement.addEventListener(
      'keydown',
      (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          event.stopPropagation();
        }
      },
      {capture: true}
    );
  }
  
  fixHeightOnOpen() {
    // Διόρθωση του ύψους του περιεχομένου των options κατά το άνοιγμα του dropdown με τον ίδιο τρόπο που γίνεται κατά το φιλτράρισμα.
    // (Συμβαίνει όταν υπάρχει virtual scroll και θα έπρεπε να γίνεται αυτόματα από το PrimeNG.)
    this.dropdown.scroller.calculateAutoSize();
    this.setMinHeight();
  }
  
  setMinHeight() {
    // Προσαρμογή του ύψους των options με βάση το αν το φιλτράρισμα επιστρέφει ή όχι αποτελέσματα.
    // (Χρειάζεται όταν υπάρχει virtual scroll και θα έπρεπε να γίνεται αυτόματα από το PrimeNG.)
    // Λειτουργεί προσθέτοντας και αφαιρώντας την κλάση που ορίζει το min-height.
    // Αν έχει οριστεί custom κλάση για ελάχιστο ύψος, προσθαφαιρείται κι αυτή ανάλογα.
    
    let standardMinHeightClass = 'min-height-44';
    
    if (this.hasAdd) {
      // Αν υπάρχει το κουμπί 'Προσθήκη', το ελάχιστο ύψος είναι μεγαλύτερο.
      standardMinHeightClass = 'min-height-80';
    }
    
    let pScrollerElements = document.getElementsByClassName('p-scroller-viewport');
    
    if (this.dropdown.visibleOptions().length === 0) {
      pScrollerElements[0].children[0].classList.remove(this.customMinHeightClass);
      pScrollerElements[0].children[0].classList.add(standardMinHeightClass);
    }
    else {
      pScrollerElements[0].children[0].classList.remove(standardMinHeightClass);
      pScrollerElements[0].children[0].classList.add(this.customMinHeightClass);
    }
  }
}
