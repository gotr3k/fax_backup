import { NgModule, AfterViewInit, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatListModule } from '@angular/material/list'
import { MatTabsModule } from '@angular/material/tabs'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AlbumComponent } from './album/album.component';
import { IstrazivanjaComponent } from './istrazivanja/istrazivanja.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { MasterStudijeComponent } from './master-studije/master-studije.component';
import { NaucniProjektiComponent } from './naucni-projekti/naucni-projekti.component';
import { ObavestenjaComponent } from './obavestenja/obavestenja.component';
import { OstaliComponent } from './ostali/ostali.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { ProjektiComponent } from './projekti/projekti.component';
import { RegisterComponent } from './register/register.component';
import { RtiComponent } from './rti/rti.component';
import { SiComponent } from './si/si.component';
import { ZaposleniComponent } from './zaposleni/zaposleni.component';
import { OpcijeComponent } from './opcije/opcije.component';
import { AdminStudentiComponent } from './admin-studenti/admin-studenti.component';
import { AdminPredmetiComponent } from './admin-predmeti/admin-predmeti.component';
import { AdminZaposleniComponent } from './admin-zaposleni/admin-zaposleni.component';
import { AdminDodajStudentaComponent } from './admin-dodaj-studenta/admin-dodaj-studenta.component';
import { AdminAzurirajStudentaComponent } from './admin-azuriraj-studenta/admin-azuriraj-studenta.component';
import { AdminAzurirajZaposlenogComponent } from './admin-azuriraj-zaposlenog/admin-azuriraj-zaposlenog.component';
import { AdminDodajZaposlenogComponent } from './admin-dodaj-zaposlenog/admin-dodaj-zaposlenog.component';
import { AdminAzurirajPredmetComponent } from './admin-azuriraj-predmet/admin-azuriraj-predmet.component';
import { AdminDodajPredmetComponent } from './admin-dodaj-predmet/admin-dodaj-predmet.component';
import { PlanAngazovanjaComponent } from './plan-angazovanja/plan-angazovanja.component';
import { PlanSlusanjaComponent } from './plan-slusanja/plan-slusanja.component';
import { OsobaComponent } from './osoba/osoba.component';
import { AzurirajObavestenjeComponent } from './azuriraj-obavestenje/azuriraj-obavestenje.component';
import { DodajObavestenjeComponent } from './dodaj-obavestenje/dodaj-obavestenje.component';
import { ZaposleniProfilComponent } from './zaposleni-profil/zaposleni-profil.component';
import { ZaposleniSpiskoviComponent } from './zaposleni-spiskovi/zaposleni-spiskovi.component';
import { ZaposleniPredmetiComponent } from './zaposleni-predmeti/zaposleni-predmeti.component';
import { ZaposleniPredmetComponent } from './zaposleni-predmet/zaposleni-predmet.component';
import { ZaposleniPredmetPitanjaComponent } from './zaposleni-predmet-pitanja/zaposleni-predmet-pitanja.component';
import { ZaposleniPredmetObavestenjaComponent } from './zaposleni-predmet-obavestenja/zaposleni-predmet-obavestenja.component';
import { ZaposleniPredmetVezbeComponent } from './zaposleni-predmet-vezbe/zaposleni-predmet-vezbe.component';
import { ZaposleniPredmetPredavanjaComponent } from './zaposleni-predmet-predavanja/zaposleni-predmet-predavanja.component';
import { ZaposleniPredmetOComponent } from './zaposleni-predmet-o/zaposleni-predmet-o.component';
import { ZaposleniPredmetLabComponent } from './zaposleni-predmet-lab/zaposleni-predmet-lab.component';
import { ZaposleniPredmetProjekatComponent } from './zaposleni-predmet-projekat/zaposleni-predmet-projekat.component';
import { ZaposleniAzurirajPredmetnoObavestenjeComponent } from './zaposleni-azuriraj-predmetno-obavestenje/zaposleni-azuriraj-predmetno-obavestenje.component';
import { ZaposleniDodajPredmetnoObavestenjeComponent } from './zaposleni-dodaj-predmetno-obavestenje/zaposleni-dodaj-predmetno-obavestenje.component';
import { PredmetObavestenjaComponent } from './predmet-obavestenja/predmet-obavestenja.component';
import { PredmetInformacijeComponent } from './predmet-informacije/predmet-informacije.component';
import { PredmetPredavanjaComponent } from './predmet-predavanja/predmet-predavanja.component';
import { PredmetVezbeComponent } from './predmet-vezbe/predmet-vezbe.component';
import { PredmetLabComponent } from './predmet-lab/predmet-lab.component';
import { PredmetPitanjaComponent } from './predmet-pitanja/predmet-pitanja.component';
import { PredmetProjekatComponent } from './predmet-projekat/predmet-projekat.component';
import { ZaposleniDodajSpisakComponent } from './zaposleni-dodaj-spisak/zaposleni-dodaj-spisak.component';
import { ZaposleniAzurirajSpisakComponent } from './zaposleni-azuriraj-spisak/zaposleni-azuriraj-spisak.component';
import { PredmetSpisakComponent } from './predmet-spisak/predmet-spisak.component';
import { OsnovneStudijeComponent } from './osnovne-studije/osnovne-studije.component';
import { NaukaComponent } from './nauka/nauka.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    AlbumComponent,
    IstrazivanjaComponent,
    KontaktComponent,
    MasterStudijeComponent,
    NaucniProjektiComponent,
    ObavestenjaComponent,
    OstaliComponent,
    PocetnaComponent,
    ProjektiComponent,
    RegisterComponent,
    RtiComponent,
    SiComponent,
    ZaposleniComponent,
    OpcijeComponent,
    AdminStudentiComponent,
    AdminPredmetiComponent,
    AdminZaposleniComponent,
    AdminDodajStudentaComponent,
    AdminAzurirajStudentaComponent,
    AdminAzurirajZaposlenogComponent,
    AdminDodajZaposlenogComponent,
    AdminAzurirajPredmetComponent,
    AdminDodajPredmetComponent,
    PlanAngazovanjaComponent,
    PlanSlusanjaComponent,
    OsobaComponent,
    AzurirajObavestenjeComponent,
    DodajObavestenjeComponent,
    ZaposleniProfilComponent,
    ZaposleniSpiskoviComponent,
    ZaposleniPredmetiComponent,
    ZaposleniPredmetComponent,
    ZaposleniPredmetOComponent,
    ZaposleniPredmetPredavanjaComponent,
    ZaposleniPredmetVezbeComponent,
    ZaposleniPredmetObavestenjaComponent,
    ZaposleniPredmetPitanjaComponent,
    ZaposleniPredmetLabComponent,
    ZaposleniPredmetProjekatComponent,
    ZaposleniAzurirajPredmetnoObavestenjeComponent,
    ZaposleniDodajPredmetnoObavestenjeComponent,
    PredmetObavestenjaComponent,
    PredmetInformacijeComponent,
    PredmetPredavanjaComponent,
    PredmetVezbeComponent,
    PredmetLabComponent,
    PredmetPitanjaComponent,
    PredmetProjekatComponent,
    ZaposleniDodajSpisakComponent,
    ZaposleniAzurirajSpisakComponent,
    PredmetSpisakComponent,
    OsnovneStudijeComponent,
    NaukaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatListModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatGridListModule,
    HttpClientModule,
    MatTabsModule,
    MatMenuModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}