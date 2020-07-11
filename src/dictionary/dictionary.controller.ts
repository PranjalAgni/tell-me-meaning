import { Controller, Get, Query } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { Observable } from 'rxjs';

@Controller('dict')
export class DictionaryController {
  constructor(private readonly dictService: DictionaryService) {}

  @Get()
  getMeaning(@Query('word') word: string): Observable<string> {
    return this.dictService.getMeaning(word);
  }
}
