import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-commission-add',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './commission-add.component.html',
  styleUrl: './commission-add.component.css',
})
export class CommissionAddComponent implements OnInit {
  _label: string = 'Save';

  constructor() {}

  ngOnInit(): void {}
}
