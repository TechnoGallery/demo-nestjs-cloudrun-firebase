import { Module } from '@nestjs/common';
import { ArtworksModule } from './artworks/artworks.module';
import { ArtistsModule } from './artists/artists.module';
import { ExhibitionsModule } from './exhibitions/exhibitions.module';
import { VisitorsModule } from './visitors/visitors.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    ArtworksModule,
    ArtistsModule,
    ExhibitionsModule,
    VisitorsModule,
    ReviewsModule,
  ],
})
export class AppModule {
}
