import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface TarotPredictRequest {
  category: string;
  question: string;
  cards: string[];
}

export interface TarotPredictResponse {
  result: string;
}

export interface DailyTarotRequest {
  cardName: string;
  keyword: string;
  element: string;
}

export interface DailyTarotResponse {
  result: string;
}
@Injectable({
  providedIn: 'root',
})
export class TarotService {
  private http = inject(HttpClient);

  private readonly apiUrl ='https://tarot-api-i6c0.onrender.com/api/tarot/predict';

  predict(payload: TarotPredictRequest): Observable<TarotPredictResponse> {
    return this.http.post<TarotPredictResponse>(this.apiUrl, payload);
  }

  countTarot() {
    return this.http.post(
      'https://tarot-api-i6c0.onrender.com/api/stats/tarot',
      {}
    );
  }

  daily(payload: DailyTarotRequest): Observable<DailyTarotResponse> {
    return this.http.post<DailyTarotResponse>(
      'https://tarot-api-i6c0.onrender.com/api/tarot/daily',
      payload
    );
  }
  
  
}