import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { TarotService } from '../../service/tarot.service';
import { TAROT_DECK, TarotCard } from '../../data/tarot-deck';
import { FirebaseLogService } from '../../services/firebase-log.service';

@Component({
  selector: 'app-tarot-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tarot-page.component.html',
  styleUrl: './tarot-page.component.css',
})
export class TarotPageComponent {
  categories = ['การเรียน', 'การงาน', 'การเงิน', 'ความรัก', 'สุขภาพ', 'ดวงทั่วไป'];

  selectedCategory = '';
  question = '';
  deck: TarotCard[] = [];
  selectedCards: TarotCard[] = [];
  Math = Math;
  loading = false;
  result = '';
  error = '';
  stats: any; 
  visitCount = 0;
  readingCount = 0;
  dailyCard: TarotCard | null = null;
  dailyMessage = '';
  todayKey = '';
  showDailyTarot = false;

  constructor(private tarotService: TarotService , private firebaseLogService: FirebaseLogService) {
    this.shuffleDeck();
    
  }

  ngOnInit(): void {

    this.firebaseLogService.trackVisit();
  
    this.firebaseLogService
      .getVisitCount()
      .subscribe(res => {
        this.visitCount = res;
      });
  
    this.firebaseLogService
      .getReadingCount()
      .subscribe(res => {
        this.readingCount = res;
      });

      this.loadDailyTarot();
  
  }

  shuffleDeck(): void {
    this.result = '';
    this.error = '';
    this.selectedCards = [];

    this.deck = [...TAROT_DECK]
      .map(card => ({ ...card, selected: false }))
      .sort(() => Math.random() - 0.5);
  }

  selectCard(card: TarotCard): void {
    if (!this.selectedCategory || !this.question.trim()) {
      this.error = 'กรุณาเลือกหมวดและกรอกคำถามก่อน';
      return;
    }

    if (card.selected || this.selectedCards.length >= 3) {
      return;
    }

    card.selected = true;
    this.selectedCards.push(card);

    if (this.selectedCards.length === 3) {
      this.predict();
    }
  }

  predict(): void {
    this.loading = true;
    this.result = '';
    this.error = '';
  
    this.tarotService.countTarot().subscribe();
  
    this.tarotService.predict({
      category: this.selectedCategory,
      question: this.question,
      cards: this.selectedCards.map(card => card.name),
    })
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: res => {
          this.result = res.result;
          this.firebaseLogService.trackReading(this.selectedCategory, 'NORMAL');
        },
        error: err => {
          console.error(err);
          this.error = 'ทำนายไม่สำเร็จ กรุณาลองใหม่อีกครั้ง';
        },
      });
  }

  saveHistory(): void {
    const history = JSON.parse(localStorage.getItem('tarot-history') || '[]');

    history.unshift({
      category: this.selectedCategory,
      question: this.question,
      cards: this.selectedCards,
      result: this.result,
      createdAt: new Date().toISOString(),
    });

    localStorage.setItem('tarot-history', JSON.stringify(history.slice(0, 20)));
  }

  drawRandomCard(): void {
    if (!this.selectedCategory || !this.question.trim()) {
      this.error = 'กรุณาเลือกหมวดและกรอกคำถามก่อน';
      return;
    }
  
    if (this.selectedCards.length >= 3) {
      return;
    }
  
    const availableCards = this.deck.filter(card => !card.selected);
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const selectedCard = availableCards[randomIndex];
  
    selectedCard.selected = true;
    this.selectedCards.push(selectedCard);
  
    if (this.selectedCards.length === 3) {
      this.predict();
    }
  }

  loadDailyTarot(): void {
    const today = new Date().toISOString().slice(0, 10);
    this.todayKey = today;
  
    const randomIndex = Math.floor(Math.random() * this.deck.length);
    const card = this.deck[randomIndex];
  
    this.dailyCard = card;
    this.dailyMessage = 'กำลังเปิดพลังงานประจำวัน...';
  
    this.tarotService.daily({
      cardName: card.name,
      keyword: card.keyword,
      element: card.element,
    }).subscribe({
      next: res => {
        this.dailyMessage = res.result;
  
        this.firebaseLogService
          .trackReading('Daily Tarot', 'DAILY')
          .then(() => console.log('daily tracked'));
      },
      error: err => {
        console.error(err);
  
        this.dailyMessage =
          `วันนี้พลังงานของคุณคือ "${card.name}" ไพ่ใบนี้สื่อถึง ${card.keyword} ควรใช้วันนี้อย่างมีสติและไม่รีบร้อนตัดสินใจ`;
      },
    });
  }

  openDailyTarot(): void {
    this.showDailyTarot = true;
    this.loadDailyTarot();
  }

}