import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readingTime',
  standalone: true,
})
export class ReadingTimePipe implements PipeTransform {
  transform(content: string): string {
    if (!content) return '0 min read';
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  }
}
