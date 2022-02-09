import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse } from 'src/app/models/api-response';
import { Game } from 'src/app/models/game';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  public sort: string
  public games: Array<Game>
  private routerSub: Subscription
  private gameSub: Subscription

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.routerSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGame('metacritic', params['game-search'])
      } else {
        this.searchGame('metacritic')
      }
    });
  }

  searchGame(sort: string, search?: string): void {
  this.gameSub=this.httpService.getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results
        console.log(gameList);

      });
  }

  openGameDetailes(gameId: string): void {
    this.router.navigate(['details', gameId])
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe()
    this.gameSub.unsubscribe()
  }

}
