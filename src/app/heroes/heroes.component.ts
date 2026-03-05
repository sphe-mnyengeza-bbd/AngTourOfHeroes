import { Component } from '@angular/core';
import { Hero } from '../hero';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  imports: [
    NgFor,
    FormsModule,
    NgIf,
    UpperCasePipe,
    HeroDetailComponent,
    RouterLink
],
})

export class HeroesComponent {

heroes: Hero[] = [];
name: string = '';

constructor(private heroService: HeroService) { }

getHeroes(): void {
  this.heroService.getHeroes()
  .subscribe(x => {
    this.heroes = x
  })
}

ngOnInit(): void {
  this.getHeroes();
}

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
