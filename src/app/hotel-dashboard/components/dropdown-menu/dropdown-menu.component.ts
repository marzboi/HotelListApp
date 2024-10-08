import { CommonModule } from '@angular/common';
import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  inject,
  OnDestroy,
} from '@angular/core';
import { createPopper } from '@popperjs/core';
import { HotelsService } from '../../../services/hotels.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dropdown-menu.component.html',
})
export class DropdownMenuComponent implements AfterViewInit, OnDestroy {
  public hotelsService = inject(HotelsService);

  dropdownPopoverShow = false;

  @ViewChild('btnDropdownRef', { static: false }) btnDropdownRef!: ElementRef;
  @ViewChild('popoverDropdownRef', { static: false })
  popoverDropdownRef!: ElementRef;

  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: 'auto-end',
      }
    );
    document.addEventListener(
      'click',
      this.closeDropdownFromOutside.bind(this),
      true
    );
  }

  ngOnDestroy() {
    document.removeEventListener(
      'click',
      this.closeDropdownFromOutside.bind(this),
      true
    );
  }
  closeDropdownFromOutside(event: MouseEvent) {
    const clickedInsideButton = this.btnDropdownRef.nativeElement.contains(
      event.target
    );
    const clickedInsidePopover = this.popoverDropdownRef.nativeElement.contains(
      event.target
    );
    if (!clickedInsideButton && !clickedInsidePopover) {
      this.dropdownPopoverShow = false;
    }
  }
  toggleDropdown(event: any) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }

  applyFilter(
    type: string,
    value: string | number | null | boolean,
    index?: number
  ) {
    this.hotelsService.filterBy(type, value, index);
  }

  onFilterChange(type: string, event: Event, index?: number) {
    const input = event.target as HTMLInputElement;
    if (type === 'stars') {
      const starIndex = Number(input.value) - 1;
      const starSelected = input.checked;
      this.applyFilter(type, starSelected, starIndex);
      return;
    }

    const value = input.value
      ? type === 'rate' || type === 'price'
        ? Number(input.value)
        : input.value
      : null;
    this.applyFilter(type, value);
  }

  clear() {
    this.hotelsService.clearFilters();
  }
}
