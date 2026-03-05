import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { HeroSearchComponent } from '../hero-search/hero-search.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [
    RouterLink,
    NgFor,
    HeroSearchComponent
  ]
})
export class DashboardComponent {
heroes: Hero[] = [];
constructor(private heroService: HeroService) {}

ngOnInit(): void {
  this.getHeroes();
}

getHeroes(): void {
 this.heroService.getHeroes()
 .subscribe(heroes => {
  this.heroes = heroes.slice(0, 4)
});
}
}
