import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'boldText',
  standalone: true,
})
export class BoldTextPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return '';
    const boldedText = value.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
    return this.sanitizer.bypassSecurityTrustHtml(boldedText);
  }
}
