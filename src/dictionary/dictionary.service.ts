import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class DictionaryService {
  constructor(private httpService: HttpService) {}

  getMeaning(word: string): Observable<string> {
    console.log('Word:', word);
    const API_KEY = 'c23b746d074135dc9500c0a61300a3cb7647e53ec2b9b658e';
    const BASE_URL = 'https://api.wordnik.com/v4/word.json/';

    const cleanWord = word.toLowerCase();

    return this.httpService
      .get(
        `${BASE_URL}${cleanWord}/definitions?limit=6&includeRelated=false&useCanonical=false&includeTags=false&api_key=${API_KEY}`,
        {
          headers: {
            accept: 'application/json',
            'accept-language': 'en-IN,en-US;q=0.9,en;q=0.8',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
          },
        },
      )
      .pipe(map(response => response.data.map(res => res.text)));
  }
}
