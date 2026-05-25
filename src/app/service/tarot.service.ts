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

  meaning?: string;
  upright?: string;
  reversed?: string;
  love?: string;
  career?: string;
  advice?: string;
}

export interface DailyTarotResponse {
  result: string;
}

export interface TarotCard {
  id: number;

  name: string;

  symbol: string;
  keyword: string;
  element: string;
  color: string;

  meaning: string;

  upright: string;

  reversed: string;

  love: string;

  career: string;

  advice: string;

  selected?: boolean;
}
export interface DailyTarotPayload {

  cardName: string;

  keyword: string;

  element: string;

  meaning?: string;

  upright?: string;

  reversed?: string;

  love?: string;

  career?: string;

  advice?: string;

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

    const body = {
      cardName: payload.cardName,
      keyword: payload.keyword,
      element: payload.element,
  
      meaning:
        payload.meaning ??
        `${payload.cardName} สื่อถึง ${payload.keyword}`,
  
      upright:
        payload.upright ??
        `พลังงานด้านบวกของ ${payload.cardName}`,
  
      reversed:
        payload.reversed ??
        `ด้านที่ต้องระวังของ ${payload.cardName}`,
  
      love:
        payload.love ??
        `ความสัมพันธ์เกี่ยวข้องกับ ${payload.keyword}`,
  
      career:
        payload.career ??
        `ด้านการงานเกี่ยวข้องกับ ${payload.keyword}`,
  
      advice:
        payload.advice ??
        'ใช้สติและมองสถานการณ์ตามความจริง',
    };
  
    return this.http.post<DailyTarotResponse>(
      'https://tarot-api-i6c0.onrender.com/api/tarot/daily',
      body
    );
  }
  
  
}