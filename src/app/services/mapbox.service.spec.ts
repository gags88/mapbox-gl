import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { MapboxService } from './mapbox.service';

describe('MapboxService', () => {
  let spectator: SpectatorHttp<MapboxService>;
  const createHttp = createHttpFactory(MapboxService);

  beforeEach(() => (spectator = createHttp()));

  it('can test HttpClient.get', () => {
    spectator.service.fetchUSStateCapitals().subscribe();
    spectator.expectOne(spectator.service.url, HttpMethod.GET);
  });
});
