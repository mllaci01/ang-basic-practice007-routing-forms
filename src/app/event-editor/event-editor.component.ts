import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../service/event.service';
import { Observable} from 'rxjs';
import { switchMap } from 'rxjs/Operators';
import { Event } from 'src/app/model/event';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  event$: Observable<Event> = this.activatedRoute.params.pipe(
    switchMap( params => this.eventService.get(params.id) )
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onUpdate(form: NgForm, event: Event): void {
    this.eventService.update(event).subscribe(
      ev => this.router.navigate([''])
    );
  }

}
