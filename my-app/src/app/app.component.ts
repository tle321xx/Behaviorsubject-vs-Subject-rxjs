import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

interface UserInterface {
  id: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  users$ = new BehaviorSubject<UserInterface[]>([]); 
  subject$ = new Subject<UserInterface[]>(); // จะไม่แสดงเลยเพราะไม่มี default จะแสดงค่าอีกที่ก็ต่อเมื่อมีการ update

  ngOnInit(): void {
    this.users$.subscribe((users) => {
      console.log('users', users); // ลำดับที่ 1 แสดง [] หลังจากทำ setTimeout ก็จะมาอัพเดทค่าปัจจุบันอีกรอบ
    });

    this.subject$.subscribe((users) => {
      console.log('users from subject', users); // ตัวนี้ออกมาเป็นลำดับที่ 3
    });

    setTimeout(() => {
      this.users$.next([{ id: '1', name: 'Foo' }]);
      this.subject$.next([{ id: '1', name: 'Foo' }]);
      // synchronous way to get value
      console.log('setTimeout', this.users$.getValue()); // ตัวนี้ออกมาเป็นลำดับที่ 4
    }, 2000);
  }
}
